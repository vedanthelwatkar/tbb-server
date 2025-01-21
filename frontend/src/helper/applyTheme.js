export const loadGoogleFont = (font) => {
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
    " ",
    "+"
  )}:wght@400;700&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

export const applyTheme = (theme) => {
  if (!theme) return;

  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    if (key === "theme_font") {
      loadGoogleFont(value);
      root.style.setProperty("--theme-font", `'${value}', sans-serif`);
      root.style.fontFamily = `'${value}', sans-serif`;
    } else {
      root.style.setProperty(`--${key.replace(/_/g, "-")}`, value);
    }
  });
};
