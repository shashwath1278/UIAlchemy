const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');


const testProjects = ['chakra-test', 'shade-test', 'mui-test', 'ant-test', 'boot-test', 'prime-test'];
testProjects.forEach(proj => {
  if (fs.existsSync(proj)) {
    fs.rmSync(proj, { recursive: true, force: true });
  }
});


console.log('🔨 Building CLI...');
execSync('npm run build', { stdio: 'inherit' });


console.log('📦 Installing CLI globally...');
execSync('npm install -g .', { stdio: 'inherit' });


const presets = ['chakraflow', 'shadeflow', 'muitopia', 'antverse', 'bootflow', 'primeland'];

presets.forEach(preset => {
  const projectName = `${preset.split('flow')[0]}-test`;
  console.log(`\n🧪 Testing ${preset}...`);
  try {
    execSync(`create-ui-app ${projectName} ${preset}`, { stdio: 'inherit' });
    console.log(`✅ ${preset} test passed`);
  } catch (error) {
    console.error(`❌ ${preset} test failed:`, error.message);
  }
});
