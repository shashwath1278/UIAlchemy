const fs = require('fs');
let content = fs.readFileSync('./dist/cli.js', 'utf8').replace(/^#!.*\n/, '');
eval(content);
