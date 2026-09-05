import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed as a subpath of williamlepoidevin.github.io: the built output goes to
// ../clone-cabinet (repo root) so GitHub Pages serves it at /clone-cabinet/, alongside the
// resume site at the repo root. Run `npm run build` here, then commit the generated
// /clone-cabinet directory, to publish.
export default defineConfig({
  base: '/clone-cabinet/',
  plugins: [react()],
  build: {
    outDir: '../clone-cabinet',
    emptyOutDir: true,
  },
})
