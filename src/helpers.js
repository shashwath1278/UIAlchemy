
function fixContainerIssues(template) {
  return template.replace(
    /className="([^"]*)container([^"]*)"/g, 
    'className="$1$2" style={{width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 1rem"}}'
  );
}

function ensureFullWidth(template) {
  return template.replace(
    /<div className="([^"]*)(bg-[^"]*|py-[^"]*|flex[^"]*)([^"]*)"/g,
    '<div className="$1$2$3" style={{width: "100%"}}"'
  );
}

function processMUITemplate(template) {
  return template.replace(
    /<div className="([^"]*)max-w-[^"]*([^"]*)"/g,
    '<div className="$1$2"'
  );
}

function processTemplateForLayout(template) {
  let processed = template;
  processed = fixContainerIssues(processed);
  processed = ensureFullWidth(processed);
  return processed;
}

function processTemplateForNextJs(appTemplate, presetType) {
  const importRegex = /import\s+.*?['"];?(\r?\n|\r)/g;
  const imports = [];
  let match;
  let cleanedTemplate = appTemplate;

  cleanedTemplate = cleanedTemplate.replace(/<style[\s\S]*?<\/style>/g, '');
  
  while ((match = importRegex.exec(appTemplate)) !== null) {
    imports.push(match[0]);
    cleanedTemplate = cleanedTemplate.replace(match[0], '');
  }
  
  let additionalCode = '';
  let additionalImports = [];
  
  if (presetType === 'antverse') {
    const layoutDestructuringRegex = /const\s*{\s*([^}]+)\s*}\s*=\s*Layout;?/;
    const layoutMatch = layoutDestructuringRegex.exec(cleanedTemplate);
    if (layoutMatch && layoutMatch[1]) {
      additionalCode = `const { ${layoutMatch[1]} } = Layout;\n\n`;
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
  
  if (presetType === 'muitopia') {
    cleanedTemplate = processMUITemplate(cleanedTemplate);
    
    imports.push("import { ThemeProvider } from '@mui/material/styles';\n");
    imports.push("import CssBaseline from '@mui/material/CssBaseline';\n");
    imports.push("import { theme } from '../../theme';\n");
    
    returnBody = `<ThemeProvider theme={theme}>\n      <CssBaseline />\n      ${returnBody}\n    </ThemeProvider>`;
  }
  
  if (presetType === 'chakraflow') {

    const hasColorModeImport = imports.some(imp => 
      imp.includes('@chakra-ui/react') && 
      imp.includes('useColorMode')
    );
    
    const hasColorModeValueImport = imports.some(imp => 
      imp.includes('@chakra-ui/react') && 
      imp.includes('useColorModeValue')
    );

    if (!hasColorModeImport && !hasColorModeValueImport) {
      additionalImports.push("import { useColorMode, useColorModeValue } from '@chakra-ui/react';\n");
    } else if (!hasColorModeImport) {
      additionalImports.push("import { useColorMode } from '@chakra-ui/react';\n");
    } else if (!hasColorModeValueImport) {
      additionalImports.push("import { useColorModeValue } from '@chakra-ui/react';\n");
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
  
  if (presetType === 'primeland') {
    componentBody = `${componentBody}
  // CSS for PrimeReact components
  const gradientBgStyle = {
    background: 'linear-gradient(135deg, var(--primary-color) 0%, #8b5cf6 100%)'
  };
  
  const featureIconStyle = {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  
  const previewCardStyle = {
    maxWidth: '400px',
    width: '100%'
  };`;

    returnBody = returnBody
      .replace(/className="gradient-bg/g, 'style={gradientBgStyle} className="')
      .replace(/className="feature-icon/g, 'style={featureIconStyle} className="')
      .replace(/className="preview-card/g, 'style={previewCardStyle} className="');
  }
  
  return `'use client';\n\n` +
    imports.join('') + 
    additionalImports.join('') +
    '\n\n' +
    additionalCode +
    'export default function Home() {\n' +
    (componentBody ? `  ${componentBody}\n` : '') +
    '  return (\n    ' +
    returnBody +
    '\n  );\n' +
    '}';
}

module.exports = {
  processTemplateForLayout,
  processTemplateForNextJs
};
