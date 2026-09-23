const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/function renderAIRecipes\([\s\S]*?\}\s*function showRecipeDetails/);
if (match) {
    fs.writeFileSync('dump.txt', match[0]);
}
