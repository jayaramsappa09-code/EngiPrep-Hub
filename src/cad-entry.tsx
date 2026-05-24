import React from 'react';
import { createRoot } from 'react-dom/client';
import AutoCADTutor from './components/AutoCADTutor';

// Mount the React Application
const rootElement = document.getElementById('react-cad-tutor-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<AutoCADTutor />);
} else {
    console.error("Critical: react-cad-tutor-root not found.");
}
