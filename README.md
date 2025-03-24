# Create UI App CLI

A powerful CLI tool that generates React applications with pre-configured UI libraries and stunning templates. Skip the boilerplate and start building beautiful UIs instantly.

## 🌟 Features

- **Six Popular UI Libraries**
  - Chakra UI (chakraflow)
  - Tailwind CSS + ShadCN (shadeflow)
  - Material UI (muitopia)
  - Ant Design (antverse)
  - Bootstrap (bootflow)
  - PrimeReact (primeland)

- **Zero Configuration**
  - Pre-configured themes
  - Ready-to-use templates
  - Automatic dependency installation
  - Built with Vite for lightning-fast development

## 📦 Installation

```bash
# Install globally
npm install -g create-ui-app-cli

# Create a new project
create-ui-app my-app

# Or specify a preset
create-ui-app my-app chakraflow
```

## 🚀 Quick Start

```bash
# Create a new project
create-ui-app my-app

# Select your preferred UI library
# ... interactive prompt appears ...

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
│   ├── muitopia.jsx
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
│   ├── App.jsx      # Main component with UI library setup
│   ├── main.jsx     # Entry point
│   ├── theme.js     # Theme configuration (if applicable)
│   └── index.css    # Global styles
├── public/
├── package.json
└── vite.config.js
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

### muitopia
- Material-UI components
- Custom theme configuration
- Icon library included

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
- [Material UI](https://mui.com/material-ui/)
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
