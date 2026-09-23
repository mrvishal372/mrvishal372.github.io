const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The user is asking to keep the name "Aaj Kya Banaoo" and ensure the description is correct.
// Since we previously replaced "Aaj Kya Banaoo" with "Food" globally, we will revert it to comply with "Do NOT change name 'Aaj Kya Banaoo'".
html = html.replace(/Food/g, 'Aaj Kya Banaoo');

// The description is already correct in our file, but we will ensure it explicitly everywhere just in case.
html = html.replace(/Live Mandi Rates & Weather/gi, 'Find recipes from 300+ kitchen ingredients. Hindi + English search.');
html = html.replace(/Live Mandi Rates/gi, 'Find recipes from 300+ kitchen ingredients. Hindi + English search.');

fs.writeFileSync('index.html', html);
