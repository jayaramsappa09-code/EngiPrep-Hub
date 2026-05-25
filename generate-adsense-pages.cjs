const fs = require('fs');
const path = require('path');

const baseHtml = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | EngiPrep Hub</title>
    <meta name="description" content="EngiPrep Hub ${title} page. Comprehensive details regarding our academic policies, terms of service, and student data protection.">
    <link rel="stylesheet" href="/src/style.css">
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-12">${title}</h1>
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-8 leading-relaxed">
            ${content}
        </div>
    </main>

    <footer class="py-16 border-t px-4 text-center border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20">
        <div class="max-w-7xl mx-auto flex flex-col items-center gap-6">
            <div class="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <a href="/about.html" class="hover:text-amber-500 transition-colors">About Us</a>
                <a href="/contact.html" class="hover:text-amber-500 transition-colors">Contact Us</a>
                <a href="/privacy-policy.html" class="hover:text-amber-500 transition-colors">Privacy Policy</a>
                <a href="/terms-conditions.html" class="hover:text-amber-500 transition-colors">Terms of Service</a>
                <a href="/disclaimer.html" class="hover:text-amber-500 transition-colors">Disclaimer</a>
            </div>
            <p class="text-slate-500 text-sm">© 2026 EngiPrep Hub. All rights reserved.</p>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>
</body>
</html>`;

const privacyPolicy = `
    <p class="font-bold border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 dark:bg-slate-900 rounded-r">Last updated: May 18, 2026</p>
    
    <h2>1. Introduction to Privacy and Data Protection</h2>
    <p>Welcome to EngiPrep Hub ("we," "our," or "us"). We respect your privacy and are deeply committed to protecting your personal data while you use our academic preparation tools, syllabus trackers, and previous year question (PYQ) intelligence systems. This comprehensive privacy policy explains exactly how we collect, store, process, and safeguard your personal data when you visit our website (engiprephub.vercel.app), create an account, interact with our AI tutor, or engage with our educational materials.</p>
    <p>By registering for an account or merely browsing our public notes, you acknowledge and agree to the practices described in this Privacy Policy. Please read this document thoroughly to understand our views and practices regarding your personal data and how we will treat it. We adhere strictly to applicable data protection frameworks to ensure a safe learning environment.</p>

    <h2>2. Detailed Breakdown of Data We Collect</h2>
    <p>To provide a tailored, seamless, and intelligent learning experience, we may collect, use, store, and transfer various kinds of personal and non-personal data about you. We have grouped these into specific categories:</p>
    <ul>
        <li><strong>Identity Data:</strong> Includes your first name, last name, username, and profile picture (often obtained via Google OAuth if you choose social login).</li>
        <li><strong>Contact Data:</strong> Includes your email address. We do not require or collect phone numbers or physical addresses.</li>
        <li><strong>Academic Data:</strong> Includes your selected branch, semester, course subjects, study streaks, completed topics, Quiz scores, and bookmarked questions. This data is essential for our "Dashboard" features.</li>
        <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technical information regarding the devices you use to access this website.</li>
        <li><strong>Usage Data:</strong> Includes detailed analytics on how you use our website, which notes you read, how long you stay on a specific mechanism visualization, and which buttons you interact with.</li>
        <li><strong>Interaction Data:</strong> Includes transcripts of conversations you have with our AI Professor feature. We use this to improve the contextual accuracy of the AI.</li>
    </ul>

    <h2>3. How Is Your Personal Data Collected?</h2>
    <p>We use different methods to collect data from and about you, including:</p>
    <ul>
        <li><strong>Direct interactions:</strong> You may give us your Identity and Contact Data by creating an account, entering your academic branch, responding to a survey, or contacting support.</li>
        <li><strong>Automated technologies:</strong> As you interact with our website, we will automatically collect Technical and Usage Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar tracking technologies.</li>
        <li><strong>Third parties:</strong> We may receive technical data from analytics providers such as Google Analytics, and identity data from authentication providers (Supabase / Google OAuth).</li>
    </ul>

    <h2>4. How We Use Your Personal Data</h2>
    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
    <p>First and foremost, your data powers your personalized dashboard. When you mark a Unit as "Completed," we store that state in our Supabase backend so that when you log in tomorrow, your study progress is perfectly preserved. We also use aggregated Usage Data to understand which concepts are most difficult for students, allowing us to generate better notes and better PYQ predictions.</p>
    <p>We do not sell your personal data to third parties. We use your email solely for critical account notifications (like password resets) or occasional updates about major syllabus changes.</p>

    <h2>5. Disclosures of Your Personal Data & Third-Party Integration</h2>
    <p>We may share your personal data with the parties set out below for the purposes outlined in this document:</p>
    <p><strong>Service Providers:</strong> We use Supabase to securely store database records and manage authentication. Supabase follows strict security standards. We use Vercel for hosting our frontend. We use Google Gemini API for powering our AI Professor. While we send study prompts to Gemini, we ensure that no personally identifiable information (PII) is included in the AI context window.</p>
    <p><strong>Advertising Partners (Google AdSense):</strong> To keep our platform free for all students, we utilize Google AdSense to serve advertisements on public pages (like /notes). Google AdSense uses cookies to serve ads based on a user's prior visits to our website or other websites. We do NOT show advertisements on private dashboard routes or login screens to preserve the learning experience.</p>

    <h2>6. Cookie Policy and Google AdSense Details</h2>
    <p>Our website uses cookies (small text files placed on your device) to distinguish you from other users. This helps us provide you with a good experience when you browse our website and allows us to improve our site.</p>
    <p>Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to EngiPrep Hub and/or other sites on the Internet. You may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" class="text-blue-600 font-bold">Google Ads Settings</a> page. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.</p>

    <h2>7. Data Security and Retention</h2>
    <p>We have put in place appropriate technical and organizational security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is limited to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
    <p>We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. You may request the deletion of your account and all associated data at any time via the profile settings tab.</p>

    <h2>8. Your Legal Rights</h2>
    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
    <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of your personal data.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
    </ul>

    <h2>9. Contact Us</h2>
    <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>engiprephub@gmail.com</strong>.</p>
`;

const termsConditions = `
    <p class="font-bold border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 dark:bg-slate-900 rounded-r">Last updated: May 18, 2026</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using EngiPrep Hub (the "Platform," accessible at engiprephub.vercel.app), you accept and agree to be bound by the terms and provision of this agreement. Every time you access the website, you agree to these terms. If you do not agree to abide by these terms, please do not use or access this platform. These Terms of Service apply to all visitors, users, and others who access or use the Service.</p>

    <h2>2. Description of Service</h2>
    <p>EngiPrep Hub is an online educational operating system designed for engineering students, specifically targeting the JNTUK R23 curriculum. The Service includes but is not limited to: access to academic notes, syllabus trackers, previous year questions (PYQs) analyses, interactive calculators, gamified dashboards, and AI-assisted conversational interfaces. We reserve the right to modify, suspend, or discontinue the Service at any time, with or without notice.</p>

    <h2>3. User Accounts and Security</h2>
    <p>While basic notes and resources are accessible publicly via Google Search without login, certain advanced features (such as progress tracking, bookmarks, and detailed AI chat solutions) require you to create an account.</p>
    <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We utilize Supabase and Google OAuth for authentication to ensure high-grade security.</p>

    <h2>4. Intellectual Property Rights</h2>
    <p>The original content, features, functionalities, UI architecture, code summaries, and custom diagrams created and published by EngiPrep Hub are the exclusive property of EngiPrep Hub. The Service is protected by copyright, trademark, and other laws.</p>
    <p><strong>Note regarding university materials:</strong> Specific examination questions (PYQs), formulas, and broad syllabus topics are public domain academic facts and belong to the respective examining bodies (such as JNTUK). We merely aggregate, analyze, and provide step-by-step educational solutions to these questions to facilitate learning. We make no claim of ownership over the base questions themselves.</p>
    <p>You may not reproduce, distribute, or create derivative works of our original notes, graphics, or proprietary code without explicit permission.</p>

    <h2>5. Acceptable Use and AI Code of Conduct</h2>
    <p>By using EngiPrep Hub, you agree not to:</p>
    <ul>
        <li>Use the platform for any illegal purpose or in violation of any local, state, national, or international law.</li>
        <li>Attempt to scrape, crawl, or extract bulk data from our public or private pages without permission.</li>
        <li>Input malicious code, prompt injections, or abusive language into the AI Professor widget.</li>
        <li>Attempt to bypass our authentication mechanisms, access private databases, or disrupt the server infrastructure.</li>
        <li>Share your account credentials with multiple users to bypass our tracking systems.</li>
    </ul>

    <h2>6. Advertisements and Links To Other Web Sites</h2>
    <p>To support the continued free operation of the core platform, EngiPrep Hub utilizes Google AdSense. You acknowledge that we may place advertisements on public-facing pages (e.g., Notes, Pyqs, Blog). Our Service may also contain links to third-party web sites or services that are not owned or controlled by EngiPrep Hub.</p>
    <p>EngiPrep Hub has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that EngiPrep Hub shall not be responsible or liable, directly or indirectly, for any damage or loss caused by your use of any third-party content.</p>

    <h2>7. Disclaimer of Warranties</h2>
    <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The academic material provided on this platform is for educational and revision purposes only. While we employ rigorous processes to ensure accuracy (including mapping to the R23 syllabus), we do not warrant that the notes are entirely free of errors or that studying our material guarantees specific grades or passing marks in university examinations.</p>

    <h2>8. Limitation of Liability</h2>
    <p>In no event shall EngiPrep Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, academic standing, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.</p>

    <h2>9. Changes to Terms</h2>
    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
`;

const disclaimer = `
    <p class="font-bold border-l-4 border-amber-600 pl-4 py-2 bg-amber-50 dark:bg-slate-900 rounded-r">Last updated: May 18, 2026</p>
    
    <h2>1. General Educational Information</h2>
    <p>The information contained on EngiPrep Hub (engiprephub.vercel.app) is for general educational, academic, and informational purposes only. The platform acts as a supplementary study aid and interactive operating system designed to assist students enrolled in engineering programs, particularly those following the JNTUK R23 curriculum guidelines.</p>
    <p>EngiPrep Hub assumes no responsibility for errors or omissions in the contents of the Service. Academic syllabuses, technical constants, and examination patterns change over time. While we strive to keep our databases, PYQ frequencies, and notes updated, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.</p>

    <h2>2. Not an Official University Affiliate</h2>
    <p><strong>Crucial Notice:</strong> EngiPrep Hub is an independent, student-centric technological initiative. We are NOT officially affiliated with, endorsed by, or partnered with Jawaharlal Nehru Technological University (JNTUK), JNTUH, JNTUA, or any other official academic institution or government body. Any reference to university names, syllabuses, course codes, or examination patterns is made strictly under fair use for contextual identification and educational assistance.</p>
    <p>Students must always cross-reference their official university portals, textbooks, and professor instructions for definitive examination criteria, fee structures, and administrative regulations.</p>

    <h2>3. Academic Performance Disclaimer</h2>
    <p>While our platform provides 'Exam Predictors', 'PYQ Importance Trackers', 'Smart Memory Maps', and 'Score Priority Badges' (e.g., "99% Repeat"), these are statistical predictions based on past data and AI analysis. They are provided as study strategies, NOT guarantees. EngiPrep Hub will not be held liable for any student's examination results, academic standings, or failures. Relying exclusively on our "One Day Before Exam" summaries is done at the student's own risk.</p>

    <h2>4. AI Professor (Generative AI) Disclaimer</h2>
    <p>The "AI Professor" feature is powered by generative artificial intelligence models (such as Google Gemini). While highly advanced, generative AI can occasionally produce "hallucinations" — facts, formulas, or code that sound plausible but are technically incorrect.</p>
    <p>All AI-generated explanations, particularly those involving advanced mathematics, complex chemical reactions, or critical civil structures, must be independently verified. We do not accept liability for academic errors resulting from unverified AI chat outputs.</p>

    <h2>5. External Links Disclaimer</h2>
    <p>The EngiPrep Hub website may contain links to external websites that are not provided or maintained by or in any way affiliated with EngiPrep Hub. Please note that the EngiPrep Hub does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>

    <h2>6. AdSense and Monetization</h2>
    <p>This website utilizes advertising networks, specifically Google AdSense, to offset server costs and maintain free access to our core notes. Advertisements are clearly separated from academic content. We do not necessarily endorse the products or services advertised by third parties on our site.</p>
`;

const aboutUs = `
    <h2 class="text-3xl font-black text-amber-500 mb-6 italic">Empowering JNTUK Scholars with Data and Code.</h2>
    <p>EngiPrep Hub was born out of a simple observation: Engineering education is hard, but finding organized, accurate, and syllabus-aligned study material shouldn't be. Founded by a passionate collective of engineering graduates, competitive coders, and academic toppers, we realized that traditional notes websites were static and boring. We wanted to build an OS for studying.</p>
    
    <h2>Our Mission: The Educational OS</h2>
    <p>We are transitioning from a simple "Notes Website" to a fully interactive "Interactive Exam Operating System." What does that mean? It means we don't just dump PDFs on you. We provide:</p>
    <ul>
        <li><strong>Interactive Trackers:</strong> Real-time progress bars as you read down a page, saving your exact position to the cloud.</li>
        <li><strong>Smart Predictions:</strong> Analyzing five years of JNTUK previous year questions (PYQs) to algorithmically predict which derivations actually matter for tomorrow's exam.</li>
        <li><strong>Visual Learning:</strong> Interactive Sandboxes where you can calculate Nernst equations, trace C-program execution steps, and visualize molecular orbital structures in browser.</li>
        <li><strong>AI Integration:</strong> An integrated AI Professor that doesn't just give answers, but guides you through the Socratic method to understand the underlying engineering principles.</li>
    </ul>

    <h2>Built for the 1-Day Prep Reality</h2>
    <p>We understand the reality of engineering student life. Often, true studying happens 24 hours before the examination. That is why every subject page on our platform includes an "Exam Survival Sheet" — a brutally efficient, stripped-down summary of the absolute minimum required to pass the exam, complete with tactical advice on how to structure your answers for maximum marks.</p>

    <h2>Our Technical Infrastructure</h2>
    <p>We believe that an educational platform for engineers should be a masterclass in software engineering itself. EngiPrep Hub is built on a modern, blazing-fast web stack. Our frontend utilizes Vite, React, and TailwindCSS for a highly responsive, glassmorphic UI. Our backend relies on Supabase (PostgreSQL) for millisecond-fast synchronization of your study streaks and bookmarks across devices. Everything is deployed on Edge networks to ensure zero latency, even during peak exam season traffic spikes.</p>

    <h2>Join the Community</h2>
    <p>EngiPrep Hub is continuously evolving. We rely on student feedback to add new subjects, correct typos in complex math formulas, and refine our AI models. Join thousands of JNTUK R23 students who have already abandoned chaotic WhatsApp groups and scattered PDFs for a streamlined, intelligent study hub.</p>

    <div class="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
        <h3 class="text-xl font-bold mb-4">Support The Project</h3>
        <p class="mb-0 text-sm">We provide this platform completely free of charge. If EngiPrep Hub has helped you pass a tough semester, you can support us by simply using the platform, sharing it with your juniors, and engaging with the materials provided.</p>
    </div>
`;

const contactUs = `
    <h2 class="text-3xl font-black text-emerald-500 mb-6 italic">We'd Love to Hear From You.</h2>
    <p>Whether you've found a typo in our Mathematics derivations, want to contribute your own topper notes for a new subject, or are experiencing technical difficulties with your dashboard progress, our team is always ready to assist.</p>
    
    <div class="grid md:grid-cols-2 gap-8 my-12">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                General Inquiries
            </h3>
            <p class="text-sm mb-4">For account issues, general questions, or feedback on our platform, drop us an email.</p>
            <p class="font-bold text-lg">engiprephub@gmail.com</p>
        </div>
        
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                Content Contribution
            </h3>
            <p class="text-sm mb-4">Rank achieved! If you want to contribute PYQ solutions or notes to a missing subject, subject the email as [CONTRIBUTION].</p>
            <p class="font-bold text-lg">Contribute via Email</p>
        </div>
    </div>

    <h2>Business and Advertising Inquiries</h2>
    <p>EngiPrep Hub attracts highly engaged engineering students daily. If you are representing an educational institute, coaching center, or technical product and wish to discuss direct advertising or sponsorships beyond standard AdSense, please contact us with the subject line <strong>[SPONSORSHIP INQUIRY]</strong>.</p>
    
    <h2>Report an Error</h2>
    <p>We pride ourselves on technical accuracy. However, in vast syllabi covering quantum mechanics, data structures, and advanced calculus, minor errors can slip through (even the AI makes mistakes!). If you detect a factual error in a derivation, formula, or C-program output:</p>
    <ol>
        <li>Copy the URL of the exact page.</li>
        <li>Take a screenshot of the step containing the error.</li>
        <li>Send it to us at our primary email address with your proposed correction.</li>
    </ol>
    <p>We review and push corrections within 24 hours to ensure the integrity of our platform for all scholars.</p>
`;

fs.writeFileSync(path.join(__dirname, 'privacy-policy.html'), baseHtml('Privacy Policy', privacyPolicy));
fs.writeFileSync(path.join(__dirname, 'terms-conditions.html'), baseHtml('Terms of Service', termsConditions));
fs.writeFileSync(path.join(__dirname, 'disclaimer.html'), baseHtml('Academic Disclaimer', disclaimer));
fs.writeFileSync(path.join(__dirname, 'about.html'), baseHtml('About Us', aboutUs));
fs.writeFileSync(path.join(__dirname, 'contact.html'), baseHtml('Contact Us', contactUs));

console.log('Successfully generated full-length AdSense compliance pages.');
