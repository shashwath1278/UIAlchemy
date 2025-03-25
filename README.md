# UI CLI

A powerful CLI tool for quickly scaffolding React or Next.js applications with popular UI libraries and frameworks.

## Features

- Support for both **React** (Vite) and **Next.js** projects

- TypeScript and JavaScript support

- Multiple UI library presets:
  - **Shadeflow**: Tailwind CSS with clean modern design
  - **Daisyworld**: Tailwind CSS + DaisyUI components
  - **Muitopia**: Material UI design system
  - **Antverse**: Ant Design components
  - **Bootflow**: React Bootstrap integration
  - **Chakraflow**: Chakra UI components
  - **Primeland**: PrimeReact UI components

## Installation

```bash
# Clone the repository
git clone https://github.com/shashwath1278/reactify-ui.git

# Install dependencies
cd reactify-ui
npm install

# Link the CLI for global usage
npm link
```

## Usage

```bash
ui-cli <project-name> [ui-preset] [language] [framework]
```

### Interactive Mode

Simply run the command with just the project name to enter interactive mode:

```bash
ui-cli my-awesome-app
```

The CLI will prompt you to select:
1. Framework (React or Next.js)
2. Language (JavaScript or TypeScript)
3. UI Stack/Preset

### Direct Mode

You can also specify all options directly:

```bash
ui-cli my-app daisyworld typescript next
```

## Available UI Stacks

- **shadeflow**: Tailwind CSS with modern UI design
- **daisyworld**: DaisyUI + Tailwind CSS components
- **muitopia**: Material UI design system
- **antverse**: Ant Design component library
- **bootflow**: React Bootstrap integration
- **chakraflow**: Chakra UI component system
- **primeland**: PrimeReact UI components

## Examples

Create a Next.js + TypeScript + DaisyUI project:
```bash
ui-cli my-daisy-app daisyworld typescript next
```

Create a React + JavaScript + Material UI project:
```bash
ui-cli my-mui-app muitopia javascript react
```

## Project Structure

Each generated project includes:
- Properly configured UI library
- Ready-to-use layout template
- Responsive design elements
- Properly set up configuration files

## License

MIT
