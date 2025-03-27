const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('🔨 Building CLI...');
try {
  execSync('npx esbuild src/index.js --bundle --platform=node --format=cjs --outfile=dist/cli.js', {
    stdio: 'inherit'
  });
  
  console.log('✍️ Adding shebang...');
  const cliPath = path.join(__dirname, 'dist', 'cli.js');
  let content = fs.readFileSync(cliPath, 'utf8');
  content = '#!/usr/bin/env node\n' + content;
  fs.writeFileSync(cliPath, content);
  
  console.log('📋 Copying presets...');
  const presetsDir = path.join(__dirname, 'presets');
  const targetPresetsDir = path.join(distDir, 'presets');
  
  if (!fs.existsSync(targetPresetsDir)) {
    fs.mkdirSync(targetPresetsDir, { recursive: true });
  }
  
  fs.readdirSync(presetsDir).forEach(file => {
    if (file.endsWith('.jsx')) {
      const sourcePath = path.join(presetsDir, file);
      const targetPath = path.join(targetPresetsDir, file);
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Copied ${file}`);
    }
  });
  
  console.log('📦 Installing CLI globally...');
  
  console.log('📦 Linking CLI locally...');
  execSync('npm link', { stdio: 'inherit' });
  
  console.log('🎉 Build completed successfully!');
  console.log('You can now use the CLI with the command: create-ui-app');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
