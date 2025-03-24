const fs = require('fs');
const path = require('path');

const presetsDir = path.join(__dirname, '..', 'presets');
const targetDir = path.join(__dirname, '..', 'dist', 'presets');

try {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.readdirSync(presetsDir).forEach(file => {
    const source = path.join(presetsDir, file);
    const target = path.join(targetDir, file);
    fs.copyFileSync(source, target);
    console.log(`✅ Copied ${file} to dist/presets`);
  });
} catch (error) {
  console.error('❌ Error copying presets:', error);
  process.exit(1);
}
