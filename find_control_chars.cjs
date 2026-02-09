const fs = require('fs');
const path = require('path');
const htmlDir = path.join(__dirname, 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const p = path.join(htmlDir, file);
    const c = fs.readFileSync(p, 'utf8');
    for (let i = 0; i < c.length; i++) {
        const code = c.charCodeAt(i);
        // HTML5 control character range check
        if ((code >= 0x0001 && code <= 0x0008) ||
            (code === 0x000B) ||
            (code >= 0x000E && code <= 0x001F) ||
            (code >= 0x007F && code <= 0x009F)) {

            const line = c.substring(0, i).split('\n').length;
            const context = c.substring(Math.max(0, i - 10), Math.min(c.length, i + 10)).replace(/[^\x20-\x7E]/g, '?');
            console.log(`Control char U+${code.toString(16).padStart(4, '0')} found in ${file} at line ${line}: "...${context}..."`);
        }
    }
});
