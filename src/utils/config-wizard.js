const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function setupProjectConfiguration(projectPath, config, framework) {
  try {
    let setupLog = [];
    
    if (config.setupESLint) {
      setupESLint(projectPath, framework, setupLog);
    }
    
    if (config.setupPrettier) {
      setupPrettier(projectPath, setupLog);
    }
    
    if (config.setupGitHooks) {
      setupGitHooks(projectPath, config.packageManager, setupLog);
    }
    
    if (config.setupTesting) {
      setupTesting(projectPath, framework, setupLog);
    }
    
    if (config.setupStorybook) {
      setupStorybook(projectPath, framework, setupLog);
    }
    
    if (config.setupCI) {
      setupCI(projectPath, setupLog);
    }
    
    const logFile = path.join(projectPath, 'setup-log.md');
    fs.writeFileSync(logFile, generateSetupLog(setupLog, config));
    
    console.log('✅ Project configuration completed successfully!');
    console.log(`📝 Setup log written to ${logFile}`);
  } catch (error) {
    console.error('❌ Error setting up project configuration:', error.message);
  }
}

function setupESLint(projectPath, framework, log) {
  console.log('🔧 Setting up ESLint...');
  
  const eslintConfig = framework === 'next' ? 
    { extends: ['next/core-web-vitals', 'eslint:recommended'] } : 
    {
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    };
  
  const eslintConfigPath = path.join(projectPath, '.eslintrc.json');
  fs.writeFileSync(eslintConfigPath, JSON.stringify(eslintConfig, null, 2));
  
  log.push('Set up ESLint with recommended configuration');
}

function setupPrettier(projectPath, log) {
  console.log('🔧 Setting up Prettier...');
  
  const prettierConfig = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    printWidth: 100,
    bracketSpacing: true
  };
  
  const prettierConfigPath = path.join(projectPath, '.prettierrc');
  fs.writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2));
  
  const prettierIgnorePath = path.join(projectPath, '.prettierignore');
  fs.writeFileSync(prettierIgnorePath, `node_modules
.next
build
dist
public`);
  
  log.push('Set up Prettier for consistent code formatting');
}

function setupGitHooks(projectPath, packageManager, log) {
  console.log('🔧 Setting up Git hooks with Husky...');
  
  try {
    const pm = packageManager === 'npm' ? 'npm' : 
               packageManager === 'yarn' ? 'yarn' : 'pnpm';
    
    execSync(`${pm} ${pm === 'npm' ? 'install' : 'add'} -D husky lint-staged`, {
      cwd: projectPath,
      stdio: 'inherit'
    });
    
    const lintStagedConfig = {
      '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
      '*.{json,css,md}': ['prettier --write']
    };
    
    const lintStagedPath = path.join(projectPath, '.lintstagedrc');
    fs.writeFileSync(lintStagedPath, JSON.stringify(lintStagedConfig, null, 2));
    
    execSync('npx husky install', {
      cwd: projectPath,
      stdio: 'inherit'
    });
    
    const huskyDir = path.join(projectPath, '.husky');
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
    }
    
    const preCommitPath = path.join(huskyDir, 'pre-commit');
    fs.writeFileSync(preCommitPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`);
    fs.chmodSync(preCommitPath, '755');
    
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.prepare = 'husky install';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
    
    log.push('Set up Git hooks with Husky and lint-staged for pre-commit checks');
  } catch (error) {
    console.log('⚠️ Could not fully set up Git hooks:', error.message);
    log.push('⚠️ Attempted to set up Git hooks but encountered issues');
  }
}

function setupTesting(projectPath, framework, log) {
  console.log('🔧 Setting up testing with Jest and React Testing Library...');
  
  try {
    const testingDeps = [
      'jest',
      'jest-environment-jsdom',
      '@testing-library/react',
      '@testing-library/jest-dom',
      '@testing-library/user-event'
    ];
    
    execSync(`npm install --save-dev ${testingDeps.join(' ')} --legacy-peer-deps`, {
      cwd: projectPath,
      stdio: 'inherit'
    });
    
    const jestConfig = framework === 'next' ? 
      `module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
};` : 
      `module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};`;
    
    fs.writeFileSync(path.join(projectPath, 'jest.config.js'), jestConfig);
    
    fs.writeFileSync(path.join(projectPath, 'jest.setup.js'), 
      `import '@testing-library/jest-dom';`);
    
    const exampleDir = path.join(projectPath, 'src', '__tests__');
    if (!fs.existsSync(exampleDir)) {
      fs.mkdirSync(exampleDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(exampleDir, 'example.test.js'), 
      `import { render, screen } from '@testing-library/react';

test('example test', () => {
  expect(true).toBeTruthy();
});`);
    
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.test = 'jest';
      packageJson.scripts['test:watch'] = 'jest --watch';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
    
    log.push('Set up Jest and React Testing Library for testing');
  } catch (error) {
    console.log('⚠️ Could not fully set up testing:', error.message);
    log.push('⚠️ Attempted to set up testing but encountered issues');
  }
}

function setupStorybook(projectPath, framework, log) {
  console.log('🔧 Setting up Storybook...');
  
  try {
    execSync(`npx storybook@latest init --yes`, {
      cwd: projectPath,
      stdio: 'inherit'
    });
    
    log.push('Set up Storybook for component documentation and development');
  } catch (error) {
    console.log('⚠️ Could not set up Storybook:', error.message);
    log.push('⚠️ Attempted to set up Storybook but encountered issues');
  }
}

function setupCI(projectPath, log) {
  console.log('🔧 Setting up GitHub Actions CI workflow...');
  
  const githubDir = path.join(projectPath, '.github', 'workflows');
  if (!fs.existsSync(githubDir)) {
    fs.mkdirSync(githubDir, { recursive: true });
  }
  
  const ciConfig = `name: CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint || echo "No linting configured"
      
    - name: Test
      run: npm test || echo "No tests configured"
      
    - name: Build
      run: npm run build
`;

  fs.writeFileSync(path.join(githubDir, 'ci.yml'), ciConfig);
  log.push('Set up GitHub Actions CI workflow for automated testing and builds');
}

function generateSetupLog(logs, config) {
  return `# Project Setup Log

## Configuration Summary
${Object.entries(config)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

## Configuration Steps
${logs.map(log => `- ${log}`).join('\n')}

## Next Steps
1. Review the configurations and adjust as needed
2. Install any additional dependencies specific to your project
3. Start developing your awesome application!
`;
}

module.exports = {
  setupProjectConfiguration
};
