import React, { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
// Global app styles consume CSS variables from assets/theme.css (imported in index.js)
import "./styles/index.css";
import { applyCssVars } from "./theme/theme";

/**
 * PUBLIC_INTERFACE
 * App initializes runtime theme variables (optional) and renders routes.
 * CSS variables are sourced from assets/theme.css; do not hardcode colors in components.
 */
function App() {
  useEffect(() => {
    // Optional runtime token injection (kept for future dynamic theming).
    applyCssVars();
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
