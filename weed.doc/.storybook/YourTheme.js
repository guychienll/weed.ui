import { create } from "@storybook/theming";

const bg = "#b6bb80";
export default create({
  base: "light",
  // brandImage: "https://place-hold.it/200x100",
  colorPrimary: "#ACB365",
  colorSecondary: "#6F91A0",
  barBg: bg,
  appBg: bg,
  inputBg: bg,
  textColor: "#444",
  barTextColor: "#444",
  inputTextColor: "#444",
  appContentBg: "#eee8da",
  appBorderColor: "#444444",
  appBorderRadius: 10,
  fontBase: "sans-serif",
  fontCode: "monospace",
});
