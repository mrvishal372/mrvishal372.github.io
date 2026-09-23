const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    fs.writeFileSync('script.js', scriptMatch[1]);
    console.log('Script extracted to script.js');
}
