import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
const results = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // strip HTML tags to get raw text
  const text = content.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  
  // check for placeholders or broken notes patterns
  const hasErrorLoading = content.includes('Error loading') || content.includes('error loading');
  const hasAccessDenied = content.includes('Access Denied') || content.includes('access denied');
  const hasPlaceholder = content.includes('[insert') || content.includes('TODO') || content.includes('Lorem Ipsum') || content.includes('lorem ipsum') || content.includes('placeholder');
  
  results.push({
    file,
    wordCount: words.length,
    hasErrorLoading,
    hasAccessDenied,
    hasPlaceholder
  });
});

results.sort((a, b) => a.wordCount - b.wordCount);

results.slice(0, 30).forEach((res, i) => {
  console.log(`${i+1}. ${res.file} - ${res.wordCount} words - ErrorLoading: ${res.hasErrorLoading}, AccessDenied: ${res.hasAccessDenied}, Placeholder: ${res.hasPlaceholder}`);
});
