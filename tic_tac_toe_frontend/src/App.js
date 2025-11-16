import React, { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import "./styles/index.css";
import { applyCssVars } from "./theme/theme";

// PUBLIC_INTERFACE
function App() {
  useEffect(() => {
    applyCssVars();
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
