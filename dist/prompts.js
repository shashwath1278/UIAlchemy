/**
 * Configuration for additional package installation prompts
 */
module.exports = {
  commonPrompts: [
    {
      type: 'confirm',
      name: 'installFramerMotion',
      message: 'Would you like to install framer-motion?',
      default: false
    },
    {
      type: 'confirm',
      name: 'installJwtAuth',
      message: 'Would you like to add JWT authentication?',
      default: false
    }
  ],
  
  reactPrompts: [
    {
      type: 'confirm',
      name: 'installReactRouter',
      message: 'Would you like to install react-router-dom?',
      default: false
    }
  ],
  
  configWizardPrompts: [
    {
      type: 'confirm',
      name: 'setupESLint',
      message: 'Would you like to set up ESLint with recommended rules?',
      default: true
    },
    {
      type: 'confirm',
      name: 'setupPrettier',
      message: 'Would you like to set up Prettier for code formatting?',
      default: true
    },
    {
      type: 'confirm',
      name: 'setupGitHooks',
      message: 'Would you like to set up Git hooks with Husky?',
      default: false
    },
    {
      type: 'confirm',
      name: 'setupTesting',
      message: 'Would you like to set up testing with Jest and React Testing Library?',
      default: false
    },
    {
      type: 'confirm',
      name: 'setupStorybook',
      message: 'Would you like to set up Storybook for component documentation?',
      default: false
    },
    {
      type: 'confirm',
      name: 'setupCI',
      message: 'Would you like to set up a basic CI workflow (GitHub Actions)?',
      default: false
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you prefer?',
      choices: ['npm', 'yarn', 'pnpm'],
      default: 'npm'
    }
  ],
  
  getPromptsByFramework(framework) {
    // Return framework-specific prompts
    if (framework.toLowerCase().includes('react')) {
      return [...this.commonPrompts, ...this.reactPrompts];
    }
    
    // For non-React frameworks, return only common prompts
    return this.commonPrompts;
  },
  
  getConfigWizardPrompts() {
    return this.configWizardPrompts;
  }
};
