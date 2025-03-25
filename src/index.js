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
  daisyworld: ["tailwindcss@3.4.1", "postcss@8.4.35", "autoprefixer@10.4.17", "daisyui@4.4.19"],
  antverse: ["antd", "@ant-design/icons"],
  bootflow: ["react-bootstrap", "bootstrap"],
  primeland: ["primereact", "primeicons"]
};

const args = process.argv.slice(2);
const projectName = args[0];
let presetType = args[1];
let language = args[2];
let framework = args[3];

async function run() {
  if (!projectName) {
    console.log("❌ Please provide a project name");
    process.exit(1);
  }

  const prompts = [];
  
  if (!framework) {
    prompts.push({
      type: "list",
      name: "framework",
      message: "Select your preferred framework:",
      choices: ["react", "next"]
    });
  }
  
  if (!language) {
    prompts.push({
      type: "list",
      name: "language",
      message: "Select your preferred language:",
      choices: ["javascript", "typescript"]
    });
  }
  
  if (!presetType) {
    prompts.push({ 
      type: "list", 
      name: "preset", 
      message: "Pick a UI Stack:", 
      choices: Object.keys(dependencies) 
    });
  }
  
  if (prompts.length > 0) {
    try {
      const answers = await inquirer.prompt(prompts);
      if (answers.framework) framework = answers.framework;
      if (answers.language) language = answers.language;
      if (answers.preset) presetType = answers.preset;
    } catch (error) {
      console.error("❌ Error with prompts:", error);
      framework = framework || "react";
      language = language || "javascript";
      presetType = presetType || Object.keys(dependencies)[0];
      console.log(`Falling back to defaults: ${framework}, ${language}, ${presetType}`);
    }
  }

  if (!dependencies[presetType]) {
    console.log(`❌ Invalid preset. Available: ${Object.keys(dependencies).join(", ")}`);
    process.exit(1);
  }

  console.log(`🚀 Creating ${framework} project with ${language}: ${projectName}`);
  
  try {
    if (framework === "next") {
      const typeFlag = language === "typescript" ? "--ts" : "--js";
      execSync(`npx create-next-app@latest ${projectName} ${typeFlag} --eslint --app --src-dir --import-alias "@/*"`, { stdio: "inherit" });
    } else {
      const template = language === "typescript" ? "react-ts" : "react";
      execSync(`npm create vite@latest ${projectName} -- --template ${template}`, { stdio: "inherit" });
    }
  } catch (error) {
    console.error(`❌ Error creating ${framework} project: ${error.message}`);
    process.exit(1);
  }

  try {
    const projectPath = path.join(process.cwd(), projectName);
    
    const appTemplatePath = path.join(presetsDirPath, `${presetType}.jsx`);
    
    console.log('📁 Looking for preset at:', appTemplatePath);
    
    if (!fs.existsSync(appTemplatePath)) {
      throw new Error(`Template not found at ${appTemplatePath}`);
    }

    const appTemplate = fs.readFileSync(appTemplatePath, 'utf-8');
    
    console.log(`✅ Installing dependencies for preset: ${presetType}`);
    execSync(`npm install ${dependencies[presetType].join(" ")} --legacy-peer-deps`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    let targetAppFile;
    if (framework === "next") {
      // For Next.js, remove any duplicate page files
      const fileExt = language === "typescript" ? ".tsx" : ".jsx";
      const jsExt = language === "typescript" ? ".ts" : ".js";
      const appDir = path.join(projectPath, 'src', 'app');
      
      // Check for duplicate page files and remove them
      const possiblePageFiles = [
        path.join(appDir, `page${fileExt}`),
        path.join(appDir, `page${jsExt}`)
      ];
      
      possiblePageFiles.forEach(file => {
        if (fs.existsSync(file)) {
          console.log(`🗑️ Removing existing page file: ${file}`);
          fs.unlinkSync(file);
        }
      });
      
      targetAppFile = path.join(appDir, `page${fileExt}`);
      
      let nextTemplate;
      
      try {
        const helpers = require('./helpers');
        nextTemplate = helpers.processTemplateForNextJs(appTemplate, presetType);
      } catch (error) {
        console.log("⚠️ Helper module not found or error processing template:", error.message);
        
        // Fallback template processing
        const importRegex = /import\s+.*?['"];?(\r?\n|\r)/g;
        const imports = [];
        let match;
        let cleanedTemplate = appTemplate;
        
        while ((match = importRegex.exec(appTemplate)) !== null) {
          imports.push(match[0]);
          cleanedTemplate = cleanedTemplate.replace(match[0], '');
        }
        
        let specialCode = '';
        
        if (presetType === "antverse") {
          const layoutDestructuringRegex = /const\s*{\s*([^}]+)\s*}\s*=\s*Layout;?/;
          const layoutMatch = layoutDestructuringRegex.exec(cleanedTemplate);
          if (layoutMatch && layoutMatch[1]) {
            specialCode = `const { ${layoutMatch[1]} } = Layout;\n\n`;
          }
          
          const hasIconImports = imports.some(imp => imp.includes('@ant-design/icons'));
          if (!hasIconImports) {
            const iconImportRegex = /import\s+{([^}]+)}\s+from\s+['"]@ant-design\/icons['"];?/;
            const iconMatch = iconImportRegex.exec(appTemplate);
            if (iconMatch && iconMatch[1]) {
              imports.push(`import { ${iconMatch[1]} } from '@ant-design/icons';\n`);
            }
          }
        }
        
        const appBodyRegex = /function\s+App\s*\(\s*\)\s*\{([\s\S]*?)return\s*\(([\s\S]*?)\);\s*\}/;
        const appBodyMatch = appBodyRegex.exec(cleanedTemplate);
        
        let componentBody = '';
        let returnBody = '';
        
        if (appBodyMatch && appBodyMatch.length >= 3) {
          componentBody = appBodyMatch[1].trim();
          returnBody = appBodyMatch[2].trim();
        } else {
          const returnRegex = /return\s*\(([\s\S]*?)\);/;
          const returnMatch = returnRegex.exec(cleanedTemplate);
          if (returnMatch && returnMatch.length >= 2) {
            returnBody = returnMatch[1].trim();
          } else {
            returnBody = '/* Template conversion failed - please check the template */';
          }
        }
        
        nextTemplate = 
          `'use client';\n\n` +
          imports.join('') + 
          '\n\n' +
          (specialCode ? specialCode : '') +
          'export default function Home() {\n' +
          (componentBody ? `  ${componentBody}\n` : '') +
          '  return (\n    ' +
          returnBody +
          '\n  );\n' +
          '}';
      }
      
      fs.writeFileSync(targetAppFile, nextTemplate);
      console.log(`✅ Injected ${presetType} template into Next.js page${fileExt}`);
      
      // For PrimeReact in Next.js, we need to add CSS module 
      if (presetType === "primeland") {
        const stylesDir = path.join(projectPath, "src", "styles");
        if (!fs.existsSync(stylesDir)) {
          fs.mkdirSync(stylesDir, { recursive: true });
        }
        
        const primeCssFile = path.join(stylesDir, "primeland.css");
        fs.writeFileSync(primeCssFile, `.gradient-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, #8b5cf6 100%);
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-card {
  max-width: 400px;
  width: 100%;
}
`);

        const globalCssPath = path.join(projectPath, "src", "app", "globals.css");
        if (fs.existsSync(globalCssPath)) {
          let cssContent = fs.readFileSync(globalCssPath, 'utf-8');
          if (!cssContent.includes('@import "../../styles/primeland.css"')) {
            cssContent = `@import "../../styles/primeland.css";\n` + cssContent;
            fs.writeFileSync(globalCssPath, cssContent);
          }
        }
      }
    } else {
      const fileExt = language === "typescript" ? ".tsx" : ".jsx";
      targetAppFile = path.join(projectPath, 'src', `App${fileExt}`);
      
      if (!fs.existsSync(path.dirname(targetAppFile))) {
        throw new Error('Project structure not created properly');
      }
      
      fs.writeFileSync(targetAppFile, appTemplate);
      console.log(`✅ Injected ${presetType} template into App${fileExt}`);
    }

    switch(presetType) {
      case "shadeflow":
        injectShadeflowConfig(projectPath, language, framework);
        break;
      case "bootflow":
        injectBootstrapConfig(projectPath, language, framework);
        break;
      case "primeland":
        injectPrimeReactConfig(projectPath, language, framework);
        break;
      case "antverse":
        injectAntConfig(projectPath, language, framework);
        break;
      case "daisyworld":
        injectDaisyUIConfig(projectPath, language, framework);
        break;
      case "chakraflow":
        injectChakraConfig(projectPath, language, framework);
        break;
    }

    console.log("🎉 Done! Now run:");
    console.log(`cd ${projectName}`);
    console.log(`npm run dev`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

function injectShadeflowConfig(projectPath, language, framework) {
  if (framework === "next") {
    const tailwindConfig = path.join(projectPath, "tailwind.config.js");
    
    console.log("🔧 Creating Tailwind CSS configuration for Next.js");
    
    fs.writeFileSync(tailwindConfig, `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`);

    const postcssConfig = path.join(projectPath, "postcss.config.js");
    if (!fs.existsSync(postcssConfig)) {
      fs.writeFileSync(postcssConfig, `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);
    }
    
    const globalCss = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalCss)) {
      const cssContent = fs.readFileSync(globalCss, 'utf-8');
      
      if (!cssContent.includes('@tailwind base')) {
        let cleanedContent = cssContent.replace(/@import\s+['"]tailwindcss.*?;/g, '');
        
        const tailwindDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;

`;
        fs.writeFileSync(globalCss, tailwindDirectives + cleanedContent);
        console.log("✅ Tailwind directives added to globals.css");
      }
    } else {
      console.log("⚠️ globals.css file not found");
    }
    
    console.log("✅ Tailwind CSS configuration for Next.js created successfully");
  } else {
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

    const fileExt = language === "typescript" ? ".ts" : ".js";
    const viteConfig = path.join(projectPath, `vite.config${fileExt}`);
    fs.writeFileSync(viteConfig, `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  }

  console.log("✅ Tailwind CSS and Shadeflow configuration files injected successfully");
}

function injectBootstrapConfig(projectPath, language, framework) {
  if (framework === "next") {
    const globalCss = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalCss)) {
      const cssContent = fs.readFileSync(globalCss, 'utf-8');
      
      if (!cssContent.includes('bootstrap')) {
        let newContent = cssContent;
        
        if (cssContent.includes('@tailwind')) {
          const tailwindEnd = cssContent.lastIndexOf('@tailwind') + cssContent.substring(cssContent.lastIndexOf('@tailwind')).indexOf(';') + 1;
          newContent = cssContent.substring(0, tailwindEnd) + 
                      "\n@import 'bootstrap/dist/css/bootstrap.min.css';\n" + 
                      cssContent.substring(tailwindEnd);
        } else {
          newContent = "@import 'bootstrap/dist/css/bootstrap.min.css';\n\n" + cssContent;
        }
        
        fs.writeFileSync(globalCss, newContent);
        console.log("✅ Bootstrap CSS import added to globals.css");
      }
    }
  } else {
    const indexCss = path.join(projectPath, "src", "index.css");
    fs.writeFileSync(indexCss, "@import 'bootstrap/dist/css/bootstrap.min.css';\n");
  }

  const bootstrapConfig = path.join(projectPath, "src", "custom.scss");
  fs.writeFileSync(bootstrapConfig, `$primary: #007bff;
$secondary: #6c757d;

@import '~bootstrap/scss/bootstrap.scss';`);
  
  console.log("✅ Bootstrap configuration created");
}

function injectPrimeReactConfig(projectPath, language, framework) {
  if (framework === "next") {
    const globalCss = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalCss)) {
      const newCssContent = `/* Reset styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* PrimeReact Theme Imports */
@import 'primereact/resources/themes/lara-light-indigo/theme.css';
@import 'primereact/resources/primereact.min.css';
@import 'primeicons/primeicons.css';

/* PrimeReact custom styles */
:root {
  --primary-color: #6366F1;
  --primary-color-hover: #4F46E5;
  --text-color: #334155;
  --text-color-secondary: #64748B;
  --surface-ground: #F8FAFC;
  --surface-card: #FFFFFF;
  --surface-border: #E2E8F0;
  --surface-hover: #F1F5F9;
}

body {
  background-color: var(--surface-ground);
  color: var(--text-color);
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.mx-auto { margin-left: auto; margin-right: auto; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-5 { margin-bottom: 1.25rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mr-2 { margin-right: 0.5rem; }
.mt-5 { margin-top: 1.25rem; }
.mt-6 { margin-top: 1.5rem; }
.pt-6 { padding-top: 1.5rem; }
.m-0 { margin: 0; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.text-center { text-align: center; }
.text-white { color: white; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-5xl { font-size: 3rem; }
.text-sm { font-size: 0.875rem; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.cursor-pointer { cursor: pointer; }
.uppercase { text-transform: uppercase; }
.list-none { list-style-type: none; }
.h-full { height: 100%; }
.w-full { width: 100%; }
.flex { display: flex; }
.flex-column { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.justify-content-center { justify-content: center; }
.justify-content-between { justify-content: space-between; }
.align-items-center { align-items: center; }
.border-circle { border-radius: 50%; }
.border-round { border-radius: 6px; }
.border-round-xl { border-radius: 12px; }
.border-top-1 { border-top-width: 1px; border-top-style: solid; }
.border-gray-800 { border-color: #1F2937; }
.text-900 { color: #0F172A; }
.text-800 { color: #1E293B; }
.text-700 { color: #334155; }
.text-600 { color: #475569; }
.text-gray-400 { color: #94A3B8; }
.text-gray-300 { color: #CBD5E1; }
.bg-gray-900 { background-color: #111827; }
.bg-primary-100 { background-color: #EEF2FF; }
.bg-orange-100 { background-color: #FFEDD5; }
.bg-purple-100 { background-color: #F3E8FF; }
.text-primary { color: var(--primary-color); }
.text-orange-500 { color: #F97316; }
.text-purple-500 { color: #A855F7; }
.shadow-2 { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.shadow-4 { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
.line-height-3 { line-height: 1.5; }

/* Grid System */
.grid {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
}

.col-12 { 
  flex: 0 0 100%; 
  padding: 0.5rem; 
  box-sizing: border-box; 
}

.col-6 { 
  flex: 0 0 50%; 
  padding: 0.5rem; 
  box-sizing: border-box; 
}

@media screen and (min-width: 768px) {
  .md\\:col-3 { 
    flex: 0 0 25%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:col-4 { 
    flex: 0 0 33.3333%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:col-6 { 
    flex: 0 0 50%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:col-8 { 
    flex: 0 0 66.6667%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:mb-0 { margin-bottom: 0 !important; }
  .md\\:mt-0 { margin-top: 0 !important; }
  .md\\:flex-row { flex-direction: row !important; }
  .md\\:hidden { display: none !important; }
}

@media screen and (max-width: 767px) {
  .md\\:hidden { display: block !important; }
  .hidden { display: none !important; }
}

/* Custom styles for PrimeReact */
.gradient-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, #8b5cf6 100%);
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-card {
  max-width: 400px;
  width: 100%;
}

.p-menubar {
  background: var(--surface-card);
  border: none;
  border-radius: 0;
  padding: 1rem;
}

.p-card .p-card-content {
  padding-top: 0.5rem;
}

.surface-card {
  background-color: var(--surface-card);
}

.surface-section {
  background-color: var(--surface-section, #ffffff);
}

.surface-ground {
  background-color: var(--surface-ground);
}`;
      
      fs.writeFileSync(globalCss, newCssContent);
      console.log("✅ Created new globals.css file with PrimeReact styling");
    }
    
    const customCssDir = path.join(projectPath, "src", "styles");
    if (!fs.existsSync(customCssDir)) {
      fs.mkdirSync(customCssDir, { recursive: true });
    }
    
    const primeCssFile = path.join(customCssDir, "prime-theme.css");
    fs.writeFileSync(primeCssFile, `/* PrimeReact Custom Theme Overrides */

/* Menu bar styling */
.p-menubar {
  background-color: var(--surface-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Sidebar styling */
.p-sidebar .p-sidebar-header {
  padding: 1.5rem;
}

.p-sidebar .p-sidebar-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

/* Section headers */
.section-header {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--surface-border);
}

/* Button improvements */
.p-button {
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.p-button.p-button-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.p-button.p-button-primary:hover {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

/* Card improvements */
.p-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
}

.p-card .p-card-title {
  color: var(--text-color);
  font-weight: 600;
}

.p-card .p-card-subtitle {
  color: var(--text-color-secondary);
  font-weight: 400;
}

/* Input styling */
.p-inputtext {
  border-radius: 6px;
}

.p-inputtext:enabled:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
}
`);

    try {
      console.log("📦 Installing PrimeFlex for better layout support...");
      execSync("npm install primeflex", {
        cwd: projectPath,
        stdio: "inherit",
      });
    } catch (error) {
      console.log("⚠️ Could not install PrimeFlex, using custom styles instead");
    }
  } else {
    const indexCss = path.join(projectPath, "src", "index.css");
    fs.writeFileSync(indexCss, 
      `/* PrimeReact Theme Imports */
@import 'primereact/resources/themes/lara-light-indigo/theme.css';
@import 'primereact/resources/primereact.min.css';
@import 'primeicons/primeicons.css';

/* PrimeReact custom styles */
:root {
  --primary-color: #6366F1;
  --primary-color-hover: #4F46E5;
  --text-color: #334155;
  --text-color-secondary: #64748B;
  --surface-ground: #F8FAFC;
  --surface-card: #FFFFFF;
  --surface-border: #E2E8F0;
  --surface-hover: #F1F5F9;
}

body {
  background-color: var(--surface-ground);
  color: var(--text-color);
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.mx-auto { margin-left: auto; margin-right: auto; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-5 { margin-bottom: 1.25rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mr-2 { margin-right: 0.5rem; }
.mt-5 { margin-top: 1.25rem; }
.mt-6 { margin-top: 1.5rem; }
.pt-6 { padding-top: 1.5rem; }
.m-0 { margin: 0; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.text-center { text-align: center; }
.text-white { color: white; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-5xl { font-size: 3rem; }
.text-sm { font-size: 0.875rem; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.cursor-pointer { cursor: pointer; }
.uppercase { text-transform: uppercase; }
.list-none { list-style-type: none; }
.h-full { height: 100%; }
.w-full { width: 100%; }
.flex { display: flex; }
.flex-column { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.justify-content-center { justify-content: center; }
.justify-content-between { justify-content: space-between; }
.align-items-center { align-items: center; }
.border-circle { border-radius: 50%; }
.border-round { border-radius: 6px; }
.border-round-xl { border-radius: 12px; }
.border-top-1 { border-top-width: 1px; border-top-style: solid; }
.border-gray-800 { border-color: #1F2937; }
.text-900 { color: #0F172A; }
.text-800 { color: #1E293B; }
.text-700 { color: #334155; }
.text-600 { color: #475569; }
.text-gray-400 { color: #94A3B8; }
.text-gray-300 { color: #CBD5E1; }
.bg-gray-900 { background-color: #111827; }
.bg-primary-100 { background-color: #EEF2FF; }
.bg-orange-100 { background-color: #FFEDD5; }
.bg-purple-100 { background-color: #F3E8FF; }
.text-primary { color: var(--primary-color); }
.text-orange-500 { color: #F97316; }
.text-purple-500 { color: #A855F7; }
.shadow-2 { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.shadow-4 { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
.line-height-3 { line-height: 1.5; }

/* Grid System */
.grid {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
}

.col-12 { 
  flex: 0 0 100%; 
  padding: 0.5rem; 
  box-sizing: border-box; 
}

.col-6 { 
  flex: 0 0 50%; 
  padding: 0.5rem; 
  box-sizing: border-box; 
}

@media screen and (min-width: 768px) {
  .md\\:col-3 { 
    flex: 0 0 25%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:col-4 { 
    flex: 0 0 33.3333%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:col-6 { 
    flex: 0 0 50%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:col-8 { 
    flex: 0 0 66.6667%; 
    padding: 0.5rem; 
    box-sizing: border-box; 
  }
  
  .md\\:mb-0 { margin-bottom: 0 !important; }
  .md\\:mt-0 { margin-top: 0 !important; }
  .md\\:flex-row { flex-direction: row !important; }
  .md\\:hidden { display: none !important; }
}

@media screen and (max-width: 767px) {
  .md\\:hidden { display: block !important; }
  .hidden { display: none !important; }
}

/* Custom styles for PrimeReact */
.gradient-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, #8b5cf6 100%);
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-card {
  max-width: 400px;
  width: 100%;
}

.p-menubar {
  background: var(--surface-card);
  border: none;
  border-radius: 0;
  padding: 1rem;
}

.p-card .p-card-content {
  padding-top: 0.5rem;
}

.surface-card {
  background-color: var(--surface-card);
}

.surface-section {
  background-color: var(--surface-section, #ffffff);
}

.surface-ground {
  background-color: var(--surface-ground);
}

/* Fix to ensure PrimeReact themes apply correctly */
.p-button:not(.p-button-outlined):not(.p-button-text):not(.p-button-link) {
  color: #ffffff;
}

.p-button.p-button-info {
  background: var(--blue-500);
  border: 1px solid var(--blue-500);
}

.p-button.p-button-info:enabled:hover {
  background: var(--blue-600);
  border-color: var(--blue-600);
}

/* Add PrimeReact specific hover effects */
.p-button.p-button-text:enabled:hover {
  background: rgba(99, 102, 241, 0.04);
  color: var(--primary-color);
  border-color: transparent;
}
`
    );

    // Also try to install PrimeFlex for React projects
    try {
      console.log("📦 Installing PrimeFlex for better layout support...");
      execSync("npm install primeflex", {
        cwd: projectPath,
        stdio: "inherit",
      });
    } catch (error) {
      console.log("⚠️ Could not install PrimeFlex, using custom styles instead");
    }

    // Create a custom prime-theme.css file for React projects too
    const styleDir = path.join(projectPath, "src", "styles");
    if (!fs.existsSync(styleDir)) {
      fs.mkdirSync(styleDir, { recursive: true });
    }
    
    const primeThemeFile = path.join(styleDir, "prime-theme.css");
    fs.writeFileSync(primeThemeFile, `/* PrimeReact Custom Theme Overrides */

/* Menu bar styling */
.p-menubar {
  background-color: var(--surface-card);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Button improvements */
.p-button {
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.p-button.p-button-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.p-button.p-button-primary:hover {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

/* Card improvements */
.p-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
}

.p-card .p-card-title {
  color: var(--text-color);
  font-weight: 600;
}

.p-card .p-card-subtitle {
  color: var(--text-color-secondary);
  font-weight: 400;
}
`);

    // Update main file to import the custom theme and PrimeFlex
    const fileExt = language === "typescript" ? ".tsx" : ".jsx";
    const mainFile = path.join(projectPath, "src", `main${fileExt}`);
    
    if (fs.existsSync(mainFile)) {
      let mainContent = fs.readFileSync(mainFile, 'utf-8');
      
      if (!mainContent.includes('import "./styles/prime-theme.css"')) {
        const lastImportIndex = mainContent.lastIndexOf('import');
        if (lastImportIndex !== -1) {
          const endOfLastImport = mainContent.indexOf('\n', lastImportIndex) + 1;
          mainContent = 
            mainContent.substring(0, endOfLastImport) + 
            "import './styles/prime-theme.css';\n" +
            mainContent.substring(endOfLastImport);
          
          fs.writeFileSync(mainFile, mainContent);
        }
      }
    }
  }

  const fileExt = language === "typescript" ? ".tsx" : ".jsx";
  const primeConfigPath = framework === "next" 
    ? path.join(projectPath, "src", "components") 
    : path.join(projectPath, "src");
  
  if (framework === "next" && !fs.existsSync(primeConfigPath)) {
    fs.mkdirSync(primeConfigPath, { recursive: true });
  }
  
  const primeConfig = path.join(primeConfigPath, `prime-config${fileExt}`);
  
  const configContent = language === "typescript" 
    ? `import { PrimeReactProvider } from 'primereact/api';
import React, { ReactNode } from 'react';
${framework === "next" ? "import '../styles/prime-theme.css';" : ""}

interface PrimeConfigProps {
  children: ReactNode;
}

export const PrimeConfig = ({ children }: PrimeConfigProps) => {
  const value = {
    ripple: true,
    inputStyle: 'filled',
    buttonStyle: 'raised',
    locale: 'en'
  };
  
  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
};`
    : `import { PrimeReactProvider } from 'primereact/api';
${framework === "next" ? "import '../styles/prime-theme.css';" : ""}

export const PrimeConfig = ({ children }) => {
  const value = {
    ripple: true,
    inputStyle: 'filled',
    buttonStyle: 'raised',
    locale: 'en'
  };
  
  return <PrimeReactProvider value={value}>{children}</PrimeConfig>;
};`;

  fs.writeFileSync(primeConfig, configContent);

  if (framework === "next") {
    const providersDir = path.join(projectPath, "src", "app", "providers");
    if (!fs.existsSync(providersDir)) {
      fs.mkdirSync(providersDir, { recursive: true });
    }
    
    const primeProviderFile = path.join(providersDir, `prime-provider${fileExt}`);
    const primeProviderContent = language === "typescript"
      ? `'use client';

import { ReactNode } from 'react';
import { PrimeConfig } from '../../components/prime-config';

interface PrimeProviderProps {
  children: ReactNode;
}

export function PrimeProviders({ children }: PrimeProviderProps) {
  return <PrimeConfig>{children}</PrimeConfig>;
}`
      : `'use client';

import { PrimeConfig } from '../../components/prime-config';

export function PrimeProviders({ children }) {
  return <PrimeConfig>{children}</PrimeProviders>;
}`;

    fs.writeFileSync(primeProviderFile, primeProviderContent);
    
    const layoutFile = path.join(projectPath, "src", "app", `layout${fileExt}`);
    if (fs.existsSync(layoutFile)) {
      console.log(`🔄 Updating Next.js layout file to use PrimeProviders...`);
      
      let layoutContent = fs.readFileSync(layoutFile, 'utf-8');
      
      const metadataRegex = /export\s+const\s+metadata\s*=\s*({[\s\S]*?});/;
      const metadataMatch = metadataRegex.exec(layoutContent);
      const metadata = metadataMatch ? metadataMatch[0] : `export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};`;
      
      const newLayoutContent = `import './globals.css';
import { PrimeProviders } from './providers/prime-provider';

${metadata}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <PrimeProviders>
          {children}
        </PrimeProviders>
      </body>
    </html>
  );
}`;
      
      fs.writeFileSync(layoutFile, newLayoutContent);
      console.log(`✅ Next.js layout file updated to use PrimeProviders`);
    }
  }

  console.log("✅ PrimeReact configuration created");
}

function injectAntConfig(projectPath, language, framework) {
  if (framework === "next") {
    const globalCss = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalCss)) {
      const cssContent = fs.readFileSync(globalCss, 'utf-8');
      
      if (!cssContent.includes('antd')) {
        let newContent = cssContent;
        
        if (cssContent.includes('@tailwind')) {
          const tailwindEnd = cssContent.lastIndexOf('@tailwind') + cssContent.substring(cssContent.lastIndexOf('@tailwind')).indexOf(';') + 1;
          newContent = cssContent.substring(0, tailwindEnd) + 
                      "\n/* Import Ant Design styles */\n" + 
                      cssContent.substring(tailwindEnd);
        } else {
          newContent = "/* Ant Design styles will be imported in the layout */\n\n" + cssContent;
        }
        
        fs.writeFileSync(globalCss, newContent);
        console.log("✅ Added comment for Ant Design CSS in globals.css");
      }
    }
    
    const providersDir = path.join(projectPath, "src", "app", "providers");
    if (!fs.existsSync(providersDir)) {
      fs.mkdirSync(providersDir, { recursive: true });
    }
    
    const fileExt = language === "typescript" ? ".tsx" : ".jsx";
    const antProviderFile = path.join(providersDir, `ant-provider${fileExt}`);
    const antProviderContent = language === "typescript"
      ? `'use client';

import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { theme } from '../../theme.config';

import 'antd/dist/reset.css';

interface AntProviderProps {
  children: ReactNode;
}

export function AntProvider({ children }: AntProviderProps) {
  return (
    <ConfigProvider theme={theme}>
      {children}
    </ConfigProvider>
  );
}`
      : `'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { theme } from '../../theme.config';

import 'antd/dist/reset.css';

export function AntProvider({ children }) {
  return (
    <ConfigProvider theme={theme}>
      {children}
    </ConfigProvider>
  );
}`;

    fs.writeFileSync(antProviderFile, antProviderContent);
    
    const layoutFile = path.join(projectPath, "src", "app", `layout${fileExt}`);
    if (fs.existsSync(layoutFile)) {
      console.log(`🔄 Updating Next.js layout file to use AntProvider...`);
      
      let layoutContent = fs.readFileSync(layoutFile, 'utf-8');
      
      const metadataRegex = /export\s+const\s+metadata\s*=\s*({[\s\S]*?});/;
      const metadataMatch = metadataRegex.exec(layoutContent);
      const metadata = metadataMatch ? metadataMatch[0] : `export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};`;
      
      const newLayoutContent = `import './globals.css';
import { AntProvider } from './providers/ant-provider';

${metadata}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <AntProvider>
          {children}
        </AntProvider>
      </body>
    </html>
  );
}`;
      
      fs.writeFileSync(layoutFile, newLayoutContent);
      console.log(`✅ Next.js layout file updated to use AntProvider`);
    }
  } else {
    const indexCss = path.join(projectPath, "src", "index.css");
    fs.writeFileSync(indexCss, `/* Ant Design styles */\n`);
    
    const fileExt = language === "typescript" ? ".tsx" : ".jsx";
    const mainFile = path.join(projectPath, "src", `main${fileExt}`);
    
    if (fs.existsSync(mainFile)) {
      let mainContent = fs.readFileSync(mainFile, 'utf-8');
      
      if (!mainContent.includes('antd/dist/reset.css')) {
        const lastImportIndex = mainContent.lastIndexOf('import');
        if (lastImportIndex !== -1) {
          const endOfLastImport = mainContent.indexOf('\n', lastImportIndex) + 1;
          mainContent = 
            mainContent.substring(0, endOfLastImport) + 
            "import 'antd/dist/reset.css';\n" + 
            mainContent.substring(endOfLastImport);
          
          fs.writeFileSync(mainFile, mainContent);
        } else {
          fs.writeFileSync(mainFile, "import 'antd/dist/reset.css';\n" + mainContent);
        }
      }
    } else {
      fs.writeFileSync(mainFile, language === "typescript" 
        ? `import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);` 
        : `import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
      );
    }
  }

  const fileExt = language === "typescript" ? ".ts" : ".js";
  const themeConfig = path.join(projectPath, "src", `theme.config${fileExt}`);
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

function injectDaisyUIConfig(projectPath, language, framework) {
  if (framework === "next") {
    const tailwindConfig = path.join(projectPath, "tailwind.config.js");
    
    console.log("🔧 Creating Daisyworld configuration for Next.js");
    
    fs.writeFileSync(tailwindConfig, `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate"],
  }
}`);

    const postcssConfig = path.join(projectPath, "postcss.config.js");
    if (!fs.existsSync(postcssConfig)) {
      fs.writeFileSync(postcssConfig, `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);
    }
    
    const globalCss = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalCss)) {
      const cssContent = fs.readFileSync(globalCss, 'utf-8');
      
      if (!cssContent.includes('@tailwind base')) {
        let cleanedContent = cssContent.replace(/@import\s+['"]tailwindcss.*?;/g, '');
        
        const tailwindDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

body {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
  width: 100%;
}

`;
        fs.writeFileSync(globalCss, tailwindDirectives + cleanedContent);
        console.log("✅ Tailwind directives added to globals.css");
      }
    } else {
      console.log("⚠️ globals.css file not found");
    }
    
  } else {
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate"],
  }
}`);

    const postcssConfig = path.join(projectPath, "postcss.config.cjs");
    fs.writeFileSync(postcssConfig, `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);

    const fileExt = language === "typescript" ? ".ts" : ".js";
    const viteConfig = path.join(projectPath, `vite.config${fileExt}`);
    fs.writeFileSync(viteConfig, `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
@tailwind utilities;

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

body {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
  width: 100%;
}`);
  }

  const htmlPath = path.join(projectPath, "index.html");
  if (fs.existsSync(htmlPath)) {
    try {
      const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
      const updatedHtml = htmlContent
        .replace(/<title>.*?<\/title>/, '<title>Daisyworld App</title>')
        .replace(/<meta name="viewport".*?>/, '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />');
      
      fs.writeFileSync(htmlPath, updatedHtml);
      console.log("✅ Updated index.html with proper viewport settings");
    } catch (error) {
      console.log("⚠️ Could not update index.html");
    }
  }

  console.log("✅ Daisyworld and Tailwind CSS configuration files injected successfully");
}

function injectChakraConfig(projectPath, language, framework) {
  if (framework === "next") {
    const fileExt = language === "typescript" ? ".tsx" : ".jsx";
    
    const themeFileExt = language === "typescript" ? ".ts" : ".js";
    const themeFile = path.join(projectPath, "src", `theme${themeFileExt}`);
    // Create a more comprehensive theme with full color definitions
    fs.writeFileSync(themeFile, `import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    blue: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
    purple: {
      50: '#FAF5FF',
      100: '#E9D8FD',
      200: '#D6BCFA',
      300: '#B794F4',
      400: '#9F7AEA',
      500: '#805AD5',
      600: '#6B46C1',
      700: '#553C9A',
      800: '#44337A',
      900: '#322659',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    }
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
    
    const providersDir = path.join(projectPath, "src", "app", "providers");
    if (!fs.existsSync(providersDir)) {
      fs.mkdirSync(providersDir, { recursive: true });
    }
    
    const chakraProviderFile = path.join(providersDir, `chakra-provider${fileExt}`);
    const chakraProviderContent = language === "typescript"
      ? `'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme';
import { ReactNode } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';

interface ChakraProviderProps {
  children: ReactNode;
}

export function ChakraProviders({ children }: ChakraProviderProps) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}`
      : `'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme';
import { CacheProvider } from '@chakra-ui/next-js';

export function ChakraProviders({ children }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}`;
    
    fs.writeFileSync(chakraProviderFile, chakraProviderContent);

    console.log("📦 Installing @chakra-ui/next-js for better Next.js integration...");
    try {
      execSync("npm install @chakra-ui/next-js --legacy-peer-deps", {
        cwd: projectPath,
        stdio: "inherit",
      });
    } catch (error) {
      console.log("⚠️ Could not install @chakra-ui/next-js, modifying provider to work without it");

      const chakraProviderContent = language === "typescript"
        ? `'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme';
import { ReactNode } from 'react';

interface ChakraProviderProps {
  children: ReactNode;
}

export function ChakraProviders({ children }: ChakraProviderProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </>
  );
}`
        : `'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme';

export function ChakraProviders({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </>
  );
}`;
      
      const providersDir = path.join(projectPath, "src", "app", "providers");
      const chakraProviderFile = path.join(providersDir, `chakra-provider${language === "typescript" ? ".tsx" : ".jsx"}`);
      fs.writeFileSync(chakraProviderFile, chakraProviderContent);
    }
    
    const layoutFile = path.join(projectPath, "src", "app", `layout${fileExt}`);
    console.log(`🔄 Creating Next.js layout file for ChakraProviders...`);
    
    const metadataContent = `export const metadata = {
  title: 'ChakraFlow App',
  description: 'Next.js app with Chakra UI',
};`;
    
    const newLayoutContent = `import './globals.css';
import { ChakraProviders } from './providers/chakra-provider';

${metadataContent}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProviders>
          {children}
        </ChakraProviders>
      </body>
    </html>
  );
}`;
    
    fs.writeFileSync(layoutFile, newLayoutContent);
    console.log(`✅ Next.js layout file created with ChakraProviders`);
    
  } else {
    const fileExt = language === "typescript" ? ".tsx" : ".jsx";
    const mainFile = path.join(projectPath, "src", `main${fileExt}`);
    
    // Use different main file content for TypeScript vs JavaScript
    const mainContent = language === "typescript" 
      ? `import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from './theme'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)`
      : `import React from 'react'
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
)`;
    
    fs.writeFileSync(mainFile, mainContent);
  }

  const themeFileExt = language === "typescript" ? ".ts" : ".js";
  const themeFile = path.join(projectPath, "src", `theme${themeFileExt}`);
  // Create a more comprehensive theme with full color definitions
  fs.writeFileSync(themeFile, `import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    blue: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
    purple: {
      50: '#FAF5FF',
      100: '#E9D8FD',
      200: '#D6BCFA',
      300: '#B794F4',
      400: '#9F7AEA',
      500: '#805AD5',
      600: '#6B46C1',
      700: '#553C9A',
      800: '#44337A',
      900: '#322659',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    }
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

  if (framework !== "next") {
    const indexCss = path.join(projectPath, "src", "index.css");
    fs.writeFileSync(indexCss, "");
  }

  console.log("✅ Chakra UI configuration created");
}

if (require.main === module) {
  run().catch(error => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
}
