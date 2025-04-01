import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { SDLTemplate } from './get-sdl-templates.js';
import { fileURLToPath } from 'url';

export function getSDLTemplate(name: string): SDLTemplate | null {
  // Determine the base directory (works in both development and production)
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const projectRoot = path.resolve(currentDir, '..', '..');

  // Try both possible locations for awesome-akash
  let sdlPath = path.join(projectRoot, 'awesome-akash', name, 'deploy.yaml');

  // If the first path doesn't exist, check if we're in the dist directory
  if (!fs.existsSync(sdlPath) && currentDir.includes('dist')) {
    // We're running from the compiled code, use the copied version
    sdlPath = path.join(projectRoot, 'dist', 'awesome-akash', name, 'deploy.yaml');
  }

  if (fs.existsSync(sdlPath)) {
    try {
      const content = fs.readFileSync(sdlPath, 'utf-8');

      // Determine the location of README.md based on the located deploy.yaml
      const readmePath = path.join(path.dirname(sdlPath), 'README.md');

      // Validate that it's valid YAML
      yaml.load(content);

      return {
        name,
        path: sdlPath,
        content,
        readme: fs.existsSync(readmePath)
          ? fs.readFileSync(readmePath, 'utf-8')
          : 'No README found for this template.',
      };
    } catch (error) {
      console.warn(`Failed to load SDL template for ${name}:`, error);
      return null;
    }
  }

  return null;
}
