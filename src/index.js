const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");


const __dirname = process.cwd();
const presetsDirPath = path.join(path.dirname(process.argv[1]), 'presets');

const dependencies = {
  chakraflow: [
    "@chakra-ui/react@2.8.2",
    "@emotion/react@11.11.3",
    "@emotion/styled@11.11.0",
    "framer-motion@10.18.0"
  ],
  shadeflow: ["tailwindcss@3.4.1", "postcss@8.4.35", "autoprefixer@10.4.17"],
  muitopia: ["@mui/material", "@emotion/react", "@emotion/styled", "@mui/icons-material"],
  antverse: ["antd", "@ant-design/icons"],
  bootflow: ["react-bootstrap", "bootstrap"],
  primeland: ["primereact", "primeicons"]
};

const args = process.argv.slice(2);
const projectName = args[0];
let presetType = args[1];

async function run() {
  if (!projectName) {
    console.log("❌ Please provide a project name");
    process.exit(1);
  }

  if (!presetType) {
    try {
     
      const answer = await inquirer.prompt([
        { 
          type: "list", 
          name: "preset", 
          message: "Pick a UI Stack:", 
          choices: Object.keys(dependencies) 
        }
      ]);
      presetType = answer.preset;
    } catch (error) {
      console.error("❌ Error with prompt:", error);
      presetType = Object.keys(dependencies)[0];
      console.log(`Falling back to default preset: ${presetType}`);
    }
  }

  if (!dependencies[presetType]) {
    console.log(`❌ Invalid preset. Available: ${Object.keys(dependencies).join(", ")}`);
    process.exit(1);
  }

  console.log(`🚀 Creating project: ${projectName}`);
  execSync(`npm create vite@latest ${projectName} -- --template react`, { stdio: "inherit" });

  try {
    const projectPath = path.join(process.cwd(), projectName);
    
    

    const appTemplatePath = path.join(presetsDirPath, `${presetType}.jsx`);
    
    console.log('📁 Looking for preset at:', appTemplatePath);
    
    if (!fs.existsSync(appTemplatePath)) {
      throw new Error(`Template not found at ${appTemplatePath}`);
    }

    const appTemplate = fs.readFileSync(appTemplatePath, 'utf-8');
    const targetAppFile = path.join(projectPath, 'src', 'App.jsx');
    
    if (!fs.existsSync(path.dirname(targetAppFile))) {
      throw new Error('Project structure not created properly');
    }

    fs.writeFileSync(targetAppFile, appTemplate);
    console.log(`✅ Injected ${presetType} template into App.jsx`);

    switch(presetType) {
      case "shadeflow":
        injectShadeflowConfig(projectPath);
        break;
      case "bootflow":
        injectBootstrapConfig(projectPath);
        break;
      case "primeland":
        injectPrimeReactConfig(projectPath);
        break;
      case "antverse":
        injectAntConfig(projectPath);
        break;
      case "muitopia":
        injectMUIConfig(projectPath);
        break;
      case "chakraflow":
        injectChakraConfig(projectPath);
        break;
    }

    console.log(`✅ Installing dependencies for preset: ${presetType}`);
    execSync(`npm install ${dependencies[presetType].join(" ")} --legacy-peer-deps`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    console.log("🎉 Done! Now run:");
    console.log(`cd ${projectName}`);
    console.log(`npm run dev`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

function injectShadeflowConfig(projectPath) {
  const tailwindConfig = path.join(projectPath, "tailwind.config.cjs");
  fs.writeFileSync(tailwindConfig, `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`);

  const postcssConfig = path.join(projectPath, "postcss.config.cjs");
  fs.writeFileSync(postcssConfig, `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);

  const viteConfig = path.join(projectPath, "vite.config.js");
  fs.writeFileSync(viteConfig, `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
});
`);

  const indexCss = path.join(projectPath, "src", "index.css");
  fs.writeFileSync(indexCss, `@tailwind base;
@tailwind components;
@tailwind utilities;`);

  console.log("✅ Tailwind CSS and Shadeflow configuration files injected successfully");
}

function injectBootstrapConfig(projectPath) {

  const indexCss = path.join(projectPath, "src", "index.css");
  fs.writeFileSync(indexCss, "@import 'bootstrap/dist/css/bootstrap.min.css';\n");
  

  const bootstrapConfig = path.join(projectPath, "src", "custom.scss");
  fs.writeFileSync(bootstrapConfig, `// Override Bootstrap variables here
$primary: #007bff;
$secondary: #6c757d;

@import '~bootstrap/scss/bootstrap.scss';`);
  
  console.log("✅ Bootstrap configuration created");
}

function injectPrimeReactConfig(projectPath) {

  const indexCss = path.join(projectPath, "src", "index.css");
  fs.writeFileSync(indexCss, 
    `@import 'primereact/resources/themes/lara-light-indigo/theme.css';\n` +
    `@import 'primereact/resources/primereact.min.css';\n` +
    `@import 'primeicons/primeicons.css';\n`
  );

  const primeConfig = path.join(projectPath, "src", "prime-config.js");
  fs.writeFileSync(primeConfig, `import { PrimeReactProvider } from 'primereact/api';

export const PrimeConfig = ({ children }) => {
  const value = {
    ripple: true,
    inputStyle: 'filled',
    buttonStyle: 'raised',
    locale: 'en'
  };
  
  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
};`);

  console.log("✅ PrimeReact configuration created");
}

function injectAntConfig(projectPath) {

  const indexCss = path.join(projectPath, "src", "index.css");
  fs.writeFileSync(indexCss, `@import 'antd/dist/reset.css';\n`); // Correct CSS import

  const themeConfig = path.join(projectPath, "src", "theme.config.js");
  fs.writeFileSync(themeConfig, `export const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
      algorithm: true,
    },
  },
};`);

  console.log("✅ Ant Design configuration created");
}

function injectMUIConfig(projectPath) {
  const themeConfig = path.join(projectPath, "src", "theme.js");
  fs.writeFileSync(themeConfig, `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});`);

  console.log("✅ MUI configuration created");
}

function injectChakraConfig(projectPath) {
  const mainJsx = path.join(projectPath, "src", "main.jsx");
  fs.writeFileSync(mainJsx, `import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from './theme'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)`);

  const themeFile = path.join(projectPath, "src", "theme.js");
  fs.writeFileSync(themeFile, `import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }
    }
  }
})`);

  const indexCss = path.join(projectPath, "src", "index.css");
  fs.writeFileSync(indexCss, "");

  console.log("✅ Chakra UI configuration created");
}

if (require.main === module) {
  run().catch(error => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
}
