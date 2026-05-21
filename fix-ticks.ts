import fs from 'fs';

['./src/dsa-visualizer.ts', './src/ai-widget.ts', './src/code-sandbox.ts', './src/dashboard-features.ts'].forEach(file => {
   if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      content = content.replace(/\\\`/g, '\`');
      content = content.replace(/\\\$/g, '$');
      fs.writeFileSync(file, content);
      console.log(`Fixed ${file}`);
   }
});
