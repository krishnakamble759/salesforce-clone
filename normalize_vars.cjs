const fs = require('fs');
const path = require('path');
const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.scss'));

files.forEach(file => {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace all uppercase variables starters with lowercase
    // e.g. $PRIMARY-COLOR -> $primary-color
    content = content.replace(/\$([A-Z][A-Z0-9_-]+)/g, (match) => {
        return match.toLowerCase();
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Normalized variables in ${file}`);
    }
});
