import { ThemeProvider } from "./theme/ThemeProvider";
import { PrimitivesGallery } from "./screens/PrimitivesGallery";

// Phase 1-2 entry point: token layer + primitives gallery only. The nav shell, domain
// components, screens, and data layer (per START_HERE.md's build order) come later.
export default function App() {
  return (
    <ThemeProvider>
      <PrimitivesGallery />
    </ThemeProvider>
  );
}
