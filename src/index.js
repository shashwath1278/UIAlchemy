#!/usr/bin/env node
import { execSync } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 🔥 This guarantees correct directory resolving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dependencies = {
  chakraflow: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
  shadeflow: ["@shadcn/ui", "tailwindcss", "postcss", "autoprefixer"],
  muitopia: ["@mui/material", "@emotion/react", "@emotion/styled"],
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
    const answer = await inquirer.prompt([
      { type: "list", name: "preset", message: "Pick a UI Stack:", choices: Object.keys(dependencies) }
    ]);
    presetType = answer.preset;
  }

  if (!dependencies[presetType]) {
    console.log(`❌ Invalid preset. Available: ${Object.keys(dependencies).join(", ")}`);
    process.exit(1);
  }

  console.log(`🚀 Creating project: ${projectName}`);
  execSync(`npm create vite@latest ${projectName} -- --template react`, { stdio: "inherit" });

  // ✅ Ensure we delay injection until project scaffolding is ready
  const appTemplatePath = path.join(__dirname, "presets", `${presetType}.jsx`);
  const appTemplate = fs.readFileSync(appTemplatePath, "utf-8");

  const targetAppFile = path.join(process.cwd(), projectName, "src", "App.jsx");
  fs.writeFileSync(targetAppFile, appTemplate);
  console.log(`✅ Injected ${presetType} template into App.jsx`);

  if (presetType === "shadeflow") {
    const indexCss = path.join(process.cwd(), projectName, "src", "index.css");
    fs.writeFileSync(indexCss, "@tailwind base;\n@tailwind components;\n@tailwind utilities;");
    console.log("✅ Tailwind CSS injected");
  }

  console.log(`✅ Installing dependencies for preset: ${presetType}`);
  execSync(`npm install ${dependencies[presetType].join(" ")}`, {
    cwd: path.join(process.cwd(), projectName),
    stdio: "inherit",
  });

  console.log("🎉 Done! Now run:");
  console.log(`cd ${projectName}`);
  console.log(`npm run dev`);
}

run();
