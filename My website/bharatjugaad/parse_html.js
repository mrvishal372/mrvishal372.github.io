const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  try {
    // We wrap it in a function so top level await or return doesn't break parsing as easily,
    // though new Function() parses it.
    new Function(match[1]);
  } catch (e) {
    console.error('Error in script tag ' + count + ':');
    console.error(e);
    // Find the line with the error
    let lines = match[1].split('\n');
    for (let i=0; i<lines.length; i++) {
        if (lines[i].includes('\\')) {
            console.log('Line ' + (i+1) + ' has backslash:', lines[i]);
        }
    }
  }
}
console.log('Parsed ' + count + ' scripts.');
