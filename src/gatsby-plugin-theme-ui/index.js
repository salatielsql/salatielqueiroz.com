import { merge } from "theme-ui";
import originalTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index";

const theme = merge(originalTheme, {
  fonts: {
    heading: `'Spline Sans', sans-serif`,
    body: `'Inter', sans-serif`,
    monospace: `'Roboto Mono', monospace`,
  },
});

export default theme;