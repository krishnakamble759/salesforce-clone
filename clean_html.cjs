const fs = require('fs');
const path = require('path');
const htmlDir = path.join(__dirname, 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const p = path.join(htmlDir, file);
    let c = fs.readFileSync(p, 'utf8');
    const originalContent = c;

    // Replace common mojibake from smart quotes/dashes/TM
    content = c
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€˜/g, "'")
        .replace(/â€™/g, "'")
        .replace(/â€“/g, "-")
        .replace(/â€”/g, "--")
        .replace(/â„¢/g, "(TM)")
        .replace(/"˜/g, "'")
        .replace(/"™/g, "'")
        .replace(/œ/g, '"');

    // Remove remaining non-ASCII characters to be safe
    content = content.replace(/[^\x00-\x7F]/g, '');

    // Remove HTML control characters that Vite/parse5 chokes on
    content = content.replace(/[\x01-\x08\x0B\x0E-\x1F\x7F-\x9F]/g, '');

    if (content !== originalContent) {
        fs.writeFileSync(p, content, 'utf8');
        console.log(`Cleaned hidden control characters from ${file}`);
    } else {
        console.log(`No control characters found in ${file}`);
    }
});
