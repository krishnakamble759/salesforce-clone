const fs = require('fs');
const path = require('path');
const c = fs.readFileSync('html/agentforce.html', 'utf8');
const tagRegex = /<([a-zA-Z0-9]+)\s+([^>]*)/g;
let match;
while ((match = tagRegex.exec(c)) !== null) {
    const tagName = match[1];
    const attrs = match[2];
    for (let i = 0; i < attrs.length; i++) {
        const code = attrs.charCodeAt(i);
        // HTML attribute names cannot contain certain characters
        // Especially control characters, spaces (within the name), ", ', >, /, =
        // But we are looking for the 'unexpected-character-in-attribute-name'
        if (code > 127 || (code < 32 && code !== 9 && code !== 10 && code !== 13)) {
            const line = c.substring(0, match.index + i).split('\n').length;
            console.log(`Bad character U+${code.toString(16).padStart(4, '0')} in <${tagName}> attribute at line ${line}`);
        }
    }
}
