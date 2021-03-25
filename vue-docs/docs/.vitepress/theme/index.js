import "./tailwind.postcss";

import DefaultTheme from "vitepress/dist/client/theme-default";
export default {
  ...DefaultTheme,
};
if (typeof window !== "undefined") {
  window.global = window;
}
