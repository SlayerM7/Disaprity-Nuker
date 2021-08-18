import {
  blue,
  blueBright,
  cyan,
  cyanBright,
  green,
  greenBright,
  grey,
  magenta,
  magentaBright,
  red,
  redBright,
  yellow,
  yellowBright,
} from "chalk";

let themes = [
  {
    themeName: "red",
    theme: red,
  },
  {
    themeName: "red bright",
    theme: redBright,
  },
  {
    themeName: "green",
    theme: green,
  },
  {
    themeName: "green bright",
    theme: greenBright,
  },
  {
    themeName: "yellow",
    theme: yellow,
  },
  {
    themeName: "yellow bright",
    theme: yellowBright,
  },
  {
    themeName: "default",
    theme: magentaBright,
  },
  {
    themeName: "magenta",
    theme: magenta,
  },
  {
    themeName: "blue",
    theme: blue,
  },
  {
    themeName: "blue bright",
    theme: blueBright,
  },
  {
    themeName: "grey",
    theme: grey,
  },
  {
    themeName: "cyan",
    theme: cyan,
  },
  {
    themeName: "cyan bright",
    theme: cyanBright,
  },
];

let themesObject = {
  themes,
  themeNames: themes.map((obj) => obj.themeName),
};

export default themesObject;
