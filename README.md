# Create UI App CLI

A powerful CLI tool that generates React applications with pre-configured UI libraries and stunning templates. Skip the boilerplate and start building beautiful UIs instantly.
It is published on NPM and can be installed globally on any machine terminal.

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

## 📦 NPM Package

[![NPM Version](https://img.shields.io/npm/v/create-ui-app-cli.svg?style=flat)](https://www.npmjs.com/package/create-ui-app-cli)
[![NPM Downloads](https://img.shields.io/npm/dm/create-ui-app-cli.svg?style=flat)](https://www.npmjs.com/package/create-ui-app-cli)

**[View on NPM](https://www.npmjs.com/package/create-ui-app-cli)**

## ⚡ Quick Use (No git cloning required)

Just go to your editor(vs code) terminal and use these commands

```bash
# Install globally
npm install -g create-ui-app-cli

# Create a new project
create-ui-app my-app
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/shashwath1278/UIAlchemy.git

# Install dependencies
cd UIAlchemy
npm install

# Link the CLI for global usage
npm link
```

## 🚀 Quick Start

```bash
# Create a new project (interactive mode)
create-ui-app my-app

# Or specify all options directly
create-ui-app my-app chakraflow javascript next

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

| UI Stack | Components & Features | Best For | Configuration |
|----------|----------------------|----------|---------------|
| **chakraflow** | • Accessible components<br>• Customizable theme<br>• Color mode support<br>• Responsive styles<br>• Layout primitives | • Accessibility-focused apps<br>• Component-driven projects<br>• Modern, clean interfaces<br>• Rapid development cycles | `create-ui-app my-app chakraflow` |
| **shadeflow** | • Unstyled, accessible components<br>• Radix UI primitives<br>• Tailwind integration<br>• Copy-paste usage<br>• Fully customizable | • Design system integration<br>• Unique brand identity<br>• Component-first development<br>• Design customization needed | `create-ui-app my-app shadeflow` |
| **daisyworld** | • Tailwind CSS with components<br>• Theme customization<br>• Responsive design<br>• Beautiful UI elements<br>• Lightweight setup | • Rapid prototyping<br>• Beautiful UI without effort<br>• Projects needing simplicity<br>• Quick development cycles | `create-ui-app my-app daisyworld` |
| **antverse** | • Enterprise-grade components<br>• Data visualization<br>• Form validation<br>• Layout systems<br>• Internationalization | • Admin panels<br>• Data-rich dashboards<br>• Enterprise apps<br>• Complex form systems | `create-ui-app my-app antverse` |
| **bootflow** | • Responsive grid system<br>• Ready-made components<br>• SCSS variables<br>• Utility classes<br>• Cross-browser compatibility | • Traditional web projects<br>• Teams familiar with Bootstrap<br>• Rapid prototyping<br>• Content-heavy sites | `create-ui-app my-app bootflow` |
| **primeland** | • Rich component library<br>• DataTable with features<br>• Theme designer<br>• Accessibility support<br>• Built-in icons | • Complex data displays<br>• Enterprise applications<br>• Form-heavy interfaces<br>• Drag-and-drop features | `create-ui-app my-app primeland` |

## Using ShadCN UI in your project

When you create a project with the `shadeflow` preset, the CLI automatically sets up the infrastructure needed for ShadCN UI:

### 1. Use the pre-installed Button component

A Button component is automatically created in your project at `src/components/ui/button.tsx`. You can import and use it like this:

```tsx
import { Button } from "./components/ui/button";

function MyComponent() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
    </div>
  );
}
```

### 2. Add more ShadCN components

The project has been set up with a convenience script to add more ShadCN components:

```bash
# Add a single component
npm run shadcn@latest card

# Add multiple components
npm run shadcn@latest dialog dropdown-menu toast

# Add a component with its dependencies automatically
npm run shadcn@latest calendar
```

This will add the components to your `src/components/ui` directory, ready to use.

### 3. Customize components

One of the advantages of ShadCN UI is that all component source code is in your project. To customize a component:

1. Navigate to the component file (e.g., `src/components/ui/button.tsx`)
2. Modify the component code to suit your needs
3. The changes will apply everywhere the component is used

### 4. Theme customization

ShadCN UI uses CSS variables for theming. You can customize the theme by modifying:

- For React: `src/index.css`
- For Next.js: `src/app/globals.css`

Look for the `:root` and `.dark` selectors to modify colors, border radius, etc.

### 5. Learn more about ShadCN UI

For more information, visit [ui.shadcn.com](https://ui.shadcn.com/)

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/shashwath1278/UIAlchemy.git

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

MIT © shashwath1278

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request
