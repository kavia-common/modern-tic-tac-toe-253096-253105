//
// Ocean Professional Theme Tokens and helper utilities
//

// PUBLIC_INTERFACE
export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    mutedText: "#6B7280",
    border: "#E5E7EB",
  },
  gradient: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(249,250,251,1))",
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    round: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 20px rgba(0,0,0,0.10)",
  },
  timing: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
  },
};

// PUBLIC_INTERFACE
export function applyCssVars() {
  try {
    const r = document.documentElement;
    r.style.setProperty("--color-primary", theme.colors.primary);
    r.style.setProperty("--color-secondary", theme.colors.secondary);
    r.style.setProperty("--color-success", theme.colors.success);
    r.style.setProperty("--color-error", theme.colors.error);
    r.style.setProperty("--color-bg", theme.colors.background);
    r.style.setProperty("--color-surface", theme.colors.surface);
    r.style.setProperty("--color-text", theme.colors.text);
    r.style.setProperty("--color-muted-text", theme.colors.mutedText);
    r.style.setProperty("--color-border", theme.colors.border);

    r.style.setProperty("--radius-sm", theme.radius.sm);
    r.style.setProperty("--radius-md", theme.radius.md);
    r.style.setProperty("--radius-lg", theme.radius.lg);
    r.style.setProperty("--radius-xl", theme.radius.xl);
    r.style.setProperty("--radius-round", theme.radius.round);

    r.style.setProperty("--shadow-sm", theme.shadow.sm);
    r.style.setProperty("--shadow-md", theme.shadow.md);
    r.style.setProperty("--shadow-lg", theme.shadow.lg);

    r.style.setProperty("--timing-fast", theme.timing.fast);
    r.style.setProperty("--timing-normal", theme.timing.normal);
    r.style.setProperty("--timing-slow", theme.timing.slow);
  } catch {
    // no-op for SSR or restricted environments
  }
}
