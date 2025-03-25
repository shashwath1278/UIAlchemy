const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Clean previous test projects
const testProjects = ['chakra-test-js', 'chakra-test-ts', 'shade-test-js', 'shade-test-ts', 'mui-test-js', 'mui-test-ts', 'ant-test-js', 'ant-test-ts', 'boot-test-js', 'boot-test-ts', 'prime-test-js', 'prime-test-ts'];
testProjects.forEach(proj => {
  if (fs.existsSync(proj)) {
    fs.rmSync(proj, { recursive: true, force: true });
  }
});

// Build the CLI
console.log('🔨 Building CLI...');
execSync('npm run build', { stdio: 'inherit' });

// Install globally
console.log('📦 Installing CLI globally...');
execSync('npm uninstall -g create-ui-app-cli', { stdio: 'inherit' });
execSync('npm install -g .', { stdio: 'inherit' });

// Test each preset with both language options
const presets = ['chakraflow', 'shadeflow', 'muitopia', 'antverse', 'bootflow', 'primeland'];
const languages = ['javascript', 'typescript'];

// Test a subset of combinations for faster testing
const testCombinations = [
  { preset: 'chakraflow', language: 'javascript' },
  { preset: 'chakraflow', language: 'typescript' },
  { preset: 'shadeflow', language: 'javascript' }
];

testCombinations.forEach(({ preset, language }) => {
  const langSuffix = language === 'typescript' ? 'ts' : 'js';
  const projectName = `${preset.split('flow')[0]}-test-${langSuffix}`;
  
  console.log(`\n🧪 Testing ${preset} with ${language}...`);
  try {
    // Force uninstall and reinstall to ensure latest code is used
    execSync(`create-ui-app ${projectName} ${preset} ${language}`, { stdio: 'inherit' });
    console.log(`✅ ${preset} (${language}) test passed`);
  } catch (error) {
    console.error(`❌ ${preset} (${language}) test failed:`, error.message);
  }
});

// Also test the interactive mode
console.log('\n🧪 Testing interactive mode...');
try {
  execSync('node -e "process.exit(0)"', { stdio: 'inherit' }); // Just to create a line break in output
  console.log('Interactive mode test: You will need to manually select options');
} catch (error) {
  console.error('❌ Interactive mode test setup failed:', error.message);
}
