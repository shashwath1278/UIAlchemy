# UI Alchemy

<p align="center">
  <img src="./assets/ui-alchemy-logo.png" alt="UI Alchemy Logo" width="200" />
</p>

<p align="center">
  <strong>Transform your React development workflow with a touch of magic ✨</strong>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#templates">Templates</a> •
  <a href="#ui-stacks">UI Stacks</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

## Installation

```bash
npm install -g ui-alchemy
```

## Features

- 🚀 **Instant Project Setup** - Bootstrap complete React/Next.js applications in seconds
- 🧩 **Component Generation** - Create consistent component structures with a single command
- 🎭 **Animation Integration** - Seamlessly add Framer Motion with pre-built animations
- 🔒 **Authentication Ready** - Built-in JWT authentication utilities
- 🧰 **Multiple UI Libraries** - Support for popular UI frameworks (Tailwind, Ant Design, and more)
- 🔄 **Routing Setup** - Automatic React Router DOM configuration
- 🎨 **Custom Templates** - Define and use your own project and component templates

## Usage

### Creating a new project

```bash
create-ui-app my-app
```

Follow the interactive prompts to select your preferred:
- Framework (React, Next.js)
- Language (JavaScript, TypeScript)
- UI Stack (Material UI, Tailwind CSS, Ant Design, and more)
- Additional features (Framer Motion, JWT Authentication, etc.)

### Generating components

```bash
ui-alchemy create-component Button
```

Options:
- `--style=tailwind` - Add Tailwind CSS styles
- `--animate` - Include Framer Motion animations
- `--test` - Generate test files

### Adding features to existing projects

```bash
ui-alchemy add auth
```

Adds authentication utilities including:
- JWT token handling
- Protected routes
- Login/Register components
- User context

```bash
ui-alchemy add animations
```

Adds Framer Motion with:
- Page transitions
- Scroll animations
- Interactive components

## Templates

UI Alchemy comes with several built-in templates:

### Project Templates
- **basic-react** - Clean React setup with React Router DOM
- **next-app** - Next.js App Router setup
- **next-pages** - Next.js Pages Router setup

### UI Stack Templates
- **tailwind** - Tailwind CSS with common utility patterns
- **material** - Material UI with theming
- **antverse** - Ant Design with custom components
- **vanilla** - No UI framework, just clean CSS

### Authentication Templates
- **jwt-auth** - Complete JWT authentication flow
- **firebase-auth** - Firebase Authentication integration
- **auth0** - Auth0 integration

## UI Stacks

UI Alchemy offers six carefully crafted UI stacks to match your project needs:

| UI Stack | Components & Features | Best For | Configuration |
|----------|----------------------|----------|---------------|
| **Tailwind** | • Utility-first CSS<br>• Pre-configured colors & spacing<br>• Custom component classes<br>• Dark mode toggle<br>• Responsive utilities | • Rapid prototyping<br>• Custom designs<br>• Performance-critical apps<br>• Developers who prefer CSS control | `--style=tailwind` |
| **Material UI** | • Complete MUI component library<br>• Theme customization<br>• Dark/light themes<br>• Form components<br>• Data display components | • Enterprise applications<br>• Admin dashboards<br>• Data-heavy interfaces<br>• Teams familiar with Material Design | `--style=material` |
| **Ant Design** | • Enterprise-grade components<br>• Data visualization<br>• Form validation<br>• Layout systems<br>• Internationalization | • Admin panels<br>• Data-rich dashboards<br>• Enterprise apps<br>• Complex form systems | `--style=antverse` |
| **Chakra UI** | • Accessible components<br>• Customizable theme<br>• Color mode support<br>• Responsive styles<br>• Layout primitives | • Accessibility-focused apps<br>• Component-driven projects<br>• Modern, clean interfaces<br>• Rapid development cycles | `--style=chakra` |
| **Shadcn/UI** | • Unstyled, accessible components<br>• Radix UI primitives<br>• Copy-paste usage<br>• Tailwind integration<br>• Fully customizable | • Design system integration<br>• Unique brand identity<br>• Component-first development<br>• Design customization needed | `--style=shadcn` |
| **Vanilla** | • Clean, minimal CSS<br>• CSS variables<br>• No dependencies<br>• CSS modules support<br>• Lightweight setup | • Performance-critical apps<br>• Learning environments<br>• Full design customization<br>• Minimizing dependencies | `--style=vanilla` |

Each UI stack comes with:
- Pre-configured theme setup
- Common layout components
- Responsive navigation
- Optimized performance settings
- Documentation links and examples

### Style Combination Examples

UI Alchemy allows combining styles with other features:

```bash
# Create a Next.js app with Tailwind and Framer Motion
create-ui-app my-app --framework=next --style=tailwind --animate

# Create a React app with Material UI and JWT authentication
create-ui-app my-app --framework=react --style=material --auth=jwt

# Add Chakra UI to an existing React project
ui-alchemy add style --chakra
```

## Configuration

Create a `.uialchemyrc.json` file in your project root to customize templates and settings:

```json
{
  "componentPath": "src/components",
  "componentTemplate": "functional",
  "testFramework": "jest",
  "cssPreprocessor": "scss"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by [Your Name]
</p>
