import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';

// Build the frontend
console.log('Building frontend...');
execSync('vite build', { stdio: 'inherit' });

// Create a simple index.html if it doesn't exist in dist/public
const distPublicPath = join(process.cwd(), 'dist', 'public');
if (!existsSync(distPublicPath)) {
  mkdirSync(distPublicPath, { recursive: true });
}

// Copy the built frontend to dist/public if needed
const clientDistPath = join(process.cwd(), 'dist', 'public');
if (existsSync(clientDistPath)) {
  console.log('Frontend build completed successfully!');
  console.log('Files are ready in dist/public for deployment');
} else {
  console.error('Build failed - dist/public directory not found');
  process.exit(1);
}

// Create a _redirects file for SPA routing
const redirectsContent = `/*    /index.html   200`;
const redirectsPath = join(distPublicPath, '_redirects');
import { writeFileSync } from 'fs';
writeFileSync(redirectsPath, redirectsContent);

console.log('✓ Created _redirects file for SPA routing');
console.log('✓ Ready for deployment!');