const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
const { parse } = require('acorn');
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    parse(match[1], { ecmaVersion: 2020 });
  } catch (e) {
    console.log("Acorn Error:", e.message);
  }
}
