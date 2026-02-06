const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const variableFile = path.join(cssDir, 'variable.scss');

// 1. Read existing variables
let variableContent = fs.readFileSync(variableFile, 'utf8');
const variableMap = new Map(); // Value -> Name

// Parse variables: $name: #value;
const varRegex = /(\$[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,6})/g;
let match;
while ((match = varRegex.exec(variableContent)) !== null) {
    const name = match[1];
    let value = match[2].toLowerCase();
    // Normalize short hex
    if (value.length === 4) {
        value = '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
    }
    if (!variableMap.has(value)) {
        variableMap.set(value, name);
    }
}

// 2. Scan files
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.scss') && f !== 'variable.scss');
let newVariables = [];
let filesModified = 0;

files.forEach(file => {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Find all hex codes
    // Regex must ensure it captures the full hex, not a substring
    // We sort matches by length and replacement to avoid issues
    // But simplistic approach: Replace specific hex strings

    // Better: Find all matches, determine replacement, apply from bottom up?
    // Or just simple string replacement if we are careful.

    // Let's iterate over ALL hex codes found in the file
    const hexRegex = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
    const matches = [...content.matchAll(hexRegex)];

    if (matches.length === 0) return;

    // We need to replace matches. To avoid index drift, we can rebuild the string or replace unique values.
    // Let's collect unique hex values in this file found
    const foundHexes = new Set(matches.map(m => m[0].toLowerCase()));

    // Sort hexes by length descending so #ffffff is replaced before #fff (if both exist)
    const sortedHexes = Array.from(foundHexes).sort((a, b) => b.length - a.length);

    sortedHexes.forEach(hex => {
        let fullHex = hex;
        if (hex.length === 4) {
            fullHex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }

        let varName = variableMap.get(fullHex);

        if (!varName) {
            // Create new variable
            // Name convention: $color-[hex]
            // remove # for name
            const cleanHex = fullHex.substring(1);
            varName = `$color-${cleanHex}`;

            // Add to new variables list and map
            newVariables.push(`${varName}: ${fullHex};`);
            variableMap.set(fullHex, varName);

            // Also map the original short hex if it differs
            if (hex !== fullHex) {
                variableMap.set(hex, varName);
            }
        }

        // Replace in content
        // Use a regex that ensures we don't replace inside another word, though \b handles suffix. 
        // Prefix issue: #123456 shouldn't match #123.
        // The regex /#hex\b/gi should work.
        const replaceRegex = new RegExp(`${hex}\\b`, 'gi');
        content = content.replace(replaceRegex, varName);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
        filesModified++;
    }
});

// 3. Append new variables to variable.scss if any
if (newVariables.length > 0) {
    // Deduplicate new variables list
    const uniqueNewVars = [...new Set(newVariables)];
    const toAppend = '\n// Generated Colors\n' + uniqueNewVars.join('\n') + '\n';
    fs.appendFileSync(variableFile, toAppend, 'utf8');
    console.log(`Added ${uniqueNewVars.length} new variables to variable.scss`);
} else {
    console.log('No new variables needed.');
}

console.log(`Process complete. Modified ${filesModified} files.`);
