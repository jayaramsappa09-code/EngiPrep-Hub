import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Stripe lazily to avoid crash if key is missing
let stripeInstance: Stripe | null = null;
const getStripe = () => {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
};

app.use(express.json());

// API: Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { userId, userEmail } = req.body;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'EngiPrep Pro Access',
              description: 'Lifetime access to premium notes and expert verified content.',
            },
            unit_amount: 999, // $9.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/dashboard.html?payment=success`,
      cancel_url: `${req.headers.origin}/dashboard.html?payment=cancelled`,
      customer_email: userEmail,
      client_reference_id: userId,
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Vite Middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
