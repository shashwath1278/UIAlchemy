const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Clean previous test projects
const testProjects = [
  'chakra-test-js-react', 'chakra-test-ts-react', 
  'chakra-test-js-next', 'chakra-test-ts-next',
  'shade-test-js-react', 'shade-test-ts-react'
];

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

// Test combinations including framework choice
const testCombinations = [
  { preset: 'chakraflow', language: 'javascript', framework: 'react' },
  { preset: 'chakraflow', language: 'typescript', framework: 'react' },
  { preset: 'chakraflow', language: 'javascript', framework: 'next' }
];

testCombinations.forEach(({ preset, language, framework }) => {
  const langSuffix = language === 'typescript' ? 'ts' : 'js';
  const projectName = `${preset.split('flow')[0]}-test-${langSuffix}-${framework}`;
  
  console.log(`\n🧪 Testing ${preset} with ${language} on ${framework}...`);
  try {
    execSync(`create-ui-app ${projectName} ${preset} ${language} ${framework}`, { stdio: 'inherit' });
    console.log(`✅ ${preset} (${language}, ${framework}) test passed`);
  } catch (error) {
    console.error(`❌ ${preset} (${language}, ${framework}) test failed:`, error.message);
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
