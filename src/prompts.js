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
      message: 'Would you like to add JWT authentication utilities?',
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
  
  getPromptsByFramework(framework) {
    if (framework.toLowerCase().includes('react')) {
      return [...this.commonPrompts, ...this.reactPrompts];
    }
    
    return this.commonPrompts;
  }
};
