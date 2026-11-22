const fs = require('fs');
const path = require('path');

function copyRecursive(srcDir, destDir, renameExt = null) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    let destPath = path.join(destDir, entry.name);
    if (renameExt && entry.isFile()) {
      const base = path.parse(entry.name).name;
      destPath = path.join(destDir, base + renameExt);
    }
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, renameExt);
    } else {
      let data = fs.readFileSync(srcPath);
      if (renameExt) {
        // For CJS we need .cjs extensions; keep content same.
      }
      fs.writeFileSync(destPath, data);
    }
  }
}

// Build CJS version (rename .js to .cjs)
copyRecursive(path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dist/cjs'), '.cjs');
// Build ESM version (rename .js to .mjs)
copyRecursive(path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dist/esm'), '.mjs');

console.log('Build completed');
