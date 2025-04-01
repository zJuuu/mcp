/**
 * This script copies the awesome-akash submodule to the dist directory
 * so it can be accessed by the compiled JavaScript code.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// Source and destination paths
const sourcePath = path.join(rootDir, "awesome-akash");
const destPath = path.join(rootDir, "dist", "awesome-akash");

/**
 * Copy directory recursively
 */
function copyDirRecursive(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Get all files and subdirectories in the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip .git directory
    if (entry.name === ".git") {
      continue;
    }

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDirRecursive(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main function
function main() {
  console.log("Copying awesome-akash submodule to dist directory...");

  try {
    // Check if source directory exists
    if (!fs.existsSync(sourcePath)) {
      console.error(`Error: Source directory does not exist: ${sourcePath}`);
      process.exit(1);
    }

    // Copy the directory
    copyDirRecursive(sourcePath, destPath);
    console.log(
      "Awesome-akash directory was successfully copied to dist/awesome-akash",
    );
  } catch (error) {
    console.error("Error copying awesome-akash directory:", error);
    process.exit(1);
  }
}

// Run the script
main();
