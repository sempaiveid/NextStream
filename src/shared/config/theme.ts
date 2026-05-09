export const colors = {
  bg: {
    base: "#0A0A0A",
    elevated: "#141414",
    overlay: "#1F1F1F",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B3B3B3",
    muted: "#6B6B6B",
  },
  brand: {
    DEFAULT: "#E50914",
    hover: "#F40612",
  },
} as const;

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    standard: [0.4, 0, 0.2, 1],
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
