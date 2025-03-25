# Create UI App CLI

A powerful CLI tool that generates React applications with pre-configured UI libraries and stunning templates. Skip the boilerplate and start building beautiful UIs instantly.

## 🌟 Features

- **Language Support**
  - JavaScript (React and Next.js)
  - TypeScript (React and Next.js with TypeScript)
  
- **Six Popular UI Libraries**
  - Chakra UI (chakraflow)
  - Tailwind CSS + ShadCN (shadeflow)
  - Tailwind CSS + DaisyUI (daisyworld)
  - Ant Design (antverse)
  - Bootstrap (bootflow)
  - PrimeReact (primeland)

- **Zero Configuration**
  - Pre-configured themes
  - Ready-to-use templates
  - Automatic dependency installation
  - Built with Vite or Next.js for lightning-fast development

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/shashwath1278/reactify-ui.git

# Install dependencies
cd reactify-ui
npm install

# Link the CLI for global usage
npm link
```

## 🚀 Quick Start

```bash
# Create a new project (interactive mode)
ui-cli my-app

# Or specify all options directly
ui-cli my-app chakraflow javascript next

# Navigate to project
cd my-app

# Start development server
npm run dev
```

## 📁 Project Structure

```
create-ui-app-cli/
├── src/               # CLI source code
│   └── index.js      # Main CLI logic
├── presets/          # UI library templates
│   ├── chakraflow.jsx
│   ├── shadeflow.jsx
│   ├── daisyworld.jsx
│   ├── antverse.jsx
│   ├── bootflow.jsx
│   └── primeland.jsx
├── scripts/          # Build scripts
│   ├── fix-shebang.js
│   └── copy-presets.js
└── dist/             # Built files
    ├── cli.js
    └── presets/      # Compiled templates

Generated Project Structure:
my-app/
├── src/
│   ├── App.{jsx,tsx}      # Main component with UI library setup
│   ├── main.{jsx,tsx}     # Entry point
│   ├── theme.{js,ts}      # Theme configuration (if applicable)
│   └── index.css          # Global styles
├── public/
├── package.json
├── vite.config.{js,ts}
└── tsconfig.json          # TypeScript configuration (if TypeScript selected)
```

## 🎨 Available Presets

### chakraflow
- Chakra UI with theme setup
- Responsive components
- Color mode support

### shadeflow
- Tailwind CSS configuration
- ShadCN UI integration
- Modern gradient design

### daisyworld
- Tailwind CSS configuration
- DaisyUI integration
- Beautiful component library

### antverse
- Ant Design integration
- Enterprise-ready components
- Customizable theme tokens

### bootflow
- Bootstrap 5 setup
- Responsive grid system
- SCSS variables configuration

### primeland
- PrimeReact components
- Theme customization
- Built-in icons

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/yourusername/create-ui-app-cli.git

# Install dependencies
npm install

# Build the CLI
npm run build

# Link for local testing
npm link

# Run tests
npm test
```

## 📚 Documentation Links

- [Chakra UI](https://chakra-ui.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ShadCN](https://ui.shadcn.com/)
- [DaisyUI](https://daisyui.com/)
- [Ant Design](https://ant.design/docs/react/introduce)
- [Bootstrap](https://getbootstrap.com/docs/)
- [PrimeReact](https://primereact.org/)

## 📄 License

MIT © [Your Name]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request
