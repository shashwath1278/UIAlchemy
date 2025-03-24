const fs = require('fs');
const path = require('path');

const cliPath = path.join(__dirname, '..', 'dist', 'cli.js');
const content = fs.readFileSync(cliPath, 'utf8');

// Remove any existing shebang
const contentWithoutShebang = content.replace(/^#!.*\n/, '');

// Add shebang with correct line ending
const newContent = `#!/usr/bin/env node\r\n${contentWithoutShebang}`;

// Write with binary flag to preserve line endings
fs.writeFileSync(cliPath, newContent, { encoding: 'utf8', flag: 'w' });
console.log('✅ Added shebang to CLI file');
