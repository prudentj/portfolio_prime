import { defineConfig } from 'astro/config';

// outDir matches the old CRA output folder so the existing Vercel project settings keep working.
export default defineConfig({
  site: 'https://jacobprudent.com',
  outDir: './build',
});
