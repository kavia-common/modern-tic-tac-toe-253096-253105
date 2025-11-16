//
// Ocean Professional Theme Tokens and helper utilities
// Refined with motion, elevations, zIndex and gradient definitions
//

// PUBLIC_INTERFACE
export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",          // Blue 600
    primary600: "#2563EB",
    primary500: "#3B82F6",
    primary400: "#60A5FA",
    primary200: "#BFDBFE",
    amber: "#F59E0B",            // Amber 500
    secondary: "#F59E0B",
    success: "#10B981",          // Emerald 500
    error: "#EF4444",            // Red 500
    warning: "#F59E0B",
    info: "#3B82F6",
    background: "#0B1220",       // Deep ocean base for gradient start
    backgroundTint: "#0F172A",   // Slate 900 tint
    surface: "#0F1A2A80",        // 50% alpha for glass
    surfaceSolid: "#0F172A",     // Solid surface for high-contrast areas
    text: "#E5E7EB",             // Gray 200
    textStrong: "#F9FAFB",       // Gray 50
    mutedText: "#94A3B8",        // Slate 400
    border: "rgba(148,163,184,0.24)",
    outline: "#93C5FD"           // Light blue for focus outline
  },
  gradient: {
    appBg: "radial-gradient(1200px 600px at 10% -10%, rgba(59,130,246,0.25) 0%, rgba(15,23,42,0) 70%), radial-gradient(1000px 500px at 110% 10%, rgba(245,158,11,0.12) 0%, rgba(15,23,42,0) 70%), linear-gradient(180deg, #0B1220 0%, #0F172A 100%)",
    surface: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
    buttonPrimary: "linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)",
    buttonSecondary: "linear-gradient(180deg, #FBBF24 0%, #F59E0B 100%)",
  },
  blur: {
    sm: "6px",
    md: "12px",
    lg: "18px"
  },
  radius: {
    xs: "6px",
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "24px",
    round: "9999px",
  },
  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.35)",
    md: "0 6px 16px rgba(0,0,0,0.35)",
    lg: "0 18px 36px rgba(0,0,0,0.45)",
    neumorphInset: "inset 2px 2px 6px rgba(0,0,0,0.35), inset -2px -2px 6px rgba(255,255,255,0.02)"
  },
  spacing: {
    xs: "6px",
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "24px",
    xxl: "32px"
  },
  zIndex: {
    base: 1,
    header: 5,
    modal: 50,
    toast: 60
  },
  motion: {
    durations: {
      xfast: "120ms",
      fast: "180ms",
      normal: "240ms",
      slow: "380ms"
    },
    easings: {
      standard: "cubic-bezier(0.2, 0.0, 0.2, 1)",
      emphasized: "cubic-bezier(0.2, 0.0, 0, 1)",
      decel: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      accel: "cubic-bezier(0.4, 0.0, 1, 1)"
    }
  }
};

// PUBLIC_INTERFACE
export function applyCssVars() {
  try {
    const r = document.documentElement;

    // Colors
    r.style.setProperty("--color-primary", theme.colors.primary);
    r.style.setProperty("--color-primary-500", theme.colors.primary500);
    r.style.setProperty("--color-primary-400", theme.colors.primary400);
    r.style.setProperty("--color-primary-200", theme.colors.primary200);
    r.style.setProperty("--color-secondary", theme.colors.secondary);
    r.style.setProperty("--color-amber", theme.colors.amber);
    r.style.setProperty("--color-success", theme.colors.success);
    r.style.setProperty("--color-error", theme.colors.error);
    r.style.setProperty("--color-warning", theme.colors.warning);
    r.style.setProperty("--color-info", theme.colors.info);
    r.style.setProperty("--color-bg", theme.colors.background);
    r.style.setProperty("--color-bg-tint", theme.colors.backgroundTint);
    r.style.setProperty("--color-surface", theme.colors.surface);
    r.style.setProperty("--color-surface-solid", theme.colors.surfaceSolid);
    r.style.setProperty("--color-text", theme.colors.text);
    r.style.setProperty("--color-text-strong", theme.colors.textStrong);
    r.style.setProperty("--color-muted-text", theme.colors.mutedText);
    r.style.setProperty("--color-border", theme.colors.border);
    r.style.setProperty("--color-outline", theme.colors.outline);

    // Radius
    r.style.setProperty("--radius-xs", theme.radius.xs);
    r.style.setProperty("--radius-sm", theme.radius.sm);
    r.style.setProperty("--radius-md", theme.radius.md);
    r.style.setProperty("--radius-lg", theme.radius.lg);
    r.style.setProperty("--radius-xl", theme.radius.xl);
    r.style.setProperty("--radius-round", theme.radius.round);

    // Shadows
    r.style.setProperty("--shadow-sm", theme.shadow.sm);
    r.style.setProperty("--shadow-md", theme.shadow.md);
    r.style.setProperty("--shadow-lg", theme.shadow.lg);
    r.style.setProperty("--shadow-neu-inset", theme.shadow.neumorphInset);

    // Spacing
    r.style.setProperty("--space-xs", theme.spacing.xs);
    r.style.setProperty("--space-sm", theme.spacing.sm);
    r.style.setProperty("--space-md", theme.spacing.md);
    r.style.setProperty("--space-lg", theme.spacing.lg);
    r.style.setProperty("--space-xl", theme.spacing.xl);
    r.style.setProperty("--space-xxl", theme.spacing.xxl);

    // Z
    r.style.setProperty("--z-base", String(theme.zIndex.base));
    r.style.setProperty("--z-header", String(theme.zIndex.header));
    r.style.setProperty("--z-modal", String(theme.zIndex.modal));
    r.style.setProperty("--z-toast", String(theme.zIndex.toast));

    // Motion
    r.style.setProperty("--easing-standard", theme.motion.easings.standard);
    r.style.setProperty("--easing-emph", theme.motion.easings.emphasized);
    r.style.setProperty("--easing-decel", theme.motion.easings.decel);
    r.style.setProperty("--easing-accel", theme.motion.easings.accel);
    r.style.setProperty("--dur-xfast", theme.motion.durations.xfast);
    r.style.setProperty("--dur-fast", theme.motion.durations.fast);
    r.style.setProperty("--dur-normal", theme.motion.durations.normal);
    r.style.setProperty("--dur-slow", theme.motion.durations.slow);

    // Gradients and blur
    r.style.setProperty("--gradient-app-bg", theme.gradient.appBg);
    r.style.setProperty("--gradient-surface", theme.gradient.surface);
    r.style.setProperty("--gradient-btn-primary", theme.gradient.buttonPrimary);
    r.style.setProperty("--gradient-btn-secondary", theme.gradient.buttonSecondary);
    r.style.setProperty("--blur-sm", theme.blur.sm);
    r.style.setProperty("--blur-md", theme.blur.md);
    r.style.setProperty("--blur-lg", theme.blur.lg);
  } catch {
    // no-op for SSR or restricted environments
  }
}
