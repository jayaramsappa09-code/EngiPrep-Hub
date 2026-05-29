import React from 'react';
import { createRoot } from 'react-dom/client';
import AutoCADTutor from './components/AutoCADTutor';

// Mount the React Application or expose global activation key
export function mountTutor(elementId = 'react-cad-tutor-root') {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<AutoCADTutor />);
    return root;
  }
  return null;
}

if (typeof window !== 'undefined') {
  (window as any).initAutoCADTutor = mountTutor;
  
  // Backwards compatibility auto-run
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('react-cad-tutor-root')) {
      mountTutor();
    }
  });
}
