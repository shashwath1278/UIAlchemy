const { execSync } = require('child_process');
const path = require('path');

function installAdditionalDependencies(projectPath, promptAnswers, framework) {
  try {
    const packages = [];
    
    if (promptAnswers.installFramerMotion) {
      packages.push('framer-motion');
    }
    
    if (promptAnswers.installReactRouter && framework.toLowerCase().includes('react')) {
      packages.push('react-router-dom');
    }
    
    if (promptAnswers.installJwtAuth) {
      packages.push('jsonwebtoken');
    }
    
    if (packages.length > 0) {
      console.log(`📦 Installing additional packages: ${packages.join(', ')}...`);
      
      const packageManager = getPackageManager();
      const installCmd = packageManager === 'npm' ? 'install' : 'add';
      
      execSync(`${packageManager} ${installCmd} ${packages.join(' ')} --legacy-peer-deps`, {
        cwd: projectPath,
        stdio: 'inherit'
      });
      
      console.log('✅ Additional packages installed successfully');
    }
  } catch (error) {
    console.error('❌ Failed to install additional packages:', error.message);
    console.log('⚠️ If you encounter dependency conflicts, try installing the packages manually with:');
    console.log('  npm install [package-name] --legacy-peer-deps');
  }
}

function getPackageManager() {
  return 'npm';
}

module.exports = {
  installAdditionalDependencies
};
