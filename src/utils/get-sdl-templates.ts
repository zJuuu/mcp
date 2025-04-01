import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface SDLTemplateListItem {
  name: string;
  readme: string;
}

export interface SDLTemplateListResponse {
  templates: SDLTemplateListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface SDLTemplate {
  name: string;
  path: string;
  content: string;
  readme: string;
}

export function getSDLTemplates(page: number, limit: number): SDLTemplateListResponse {
  // Determine the base directory (works in both development and production)
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const projectRoot = path.resolve(currentDir, '..', '..');

  // Try both possible locations for awesome-akash
  let awesomeAkashPath = path.join(projectRoot, 'awesome-akash');

  // If the first path doesn't exist, check if we're in the dist directory
  if (!fs.existsSync(awesomeAkashPath) && currentDir.includes('dist')) {
    // We're running from the compiled code, use the copied version
    awesomeAkashPath = path.join(projectRoot, 'dist', 'awesome-akash');
  }

  const templates: SDLTemplateListItem[] = [];

  // Check if the awesome-akash directory exists
  if (!fs.existsSync(awesomeAkashPath)) {
    console.error(`Error: awesome-akash directory not found at ${awesomeAkashPath}`);
    return {
      templates: [],
      total: 0,
      page,
      limit,
    };
  }

  // Read all directories in awesome-akash
  const dirs = fs.readdirSync(awesomeAkashPath, { withFileTypes: true });

  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const sdlPath = path.join(awesomeAkashPath, dir.name, 'deploy.yaml');
      const readmePath = path.join(awesomeAkashPath, dir.name, 'README.md');

      // Check if deploy.yaml exists in the directory
      if (fs.existsSync(sdlPath)) {
        try {
          templates.push({
            name: dir.name,
            readme: fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '',
          });
        } catch (error) {
          console.warn(`Failed to load SDL template for ${dir.name}:`, error);
        }
      }
    }
  }

  const response = {
    templates: templates.slice((page - 1) * limit, page * limit),
    total: templates.length,
    page,
    limit,
  };

  return response;
}
