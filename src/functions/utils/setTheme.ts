import request from "request";
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
import { Client } from "discord.js";

const themes = [
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
    theme: magenta,
  },
  {
    themeName: "magenta",
    theme: magenta,
  },
  {
    themeName: "magenta bright",
    theme: magentaBright,
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

const themeNames = themes.map((obj) => obj.themeName);

export default function setTheme(client: Client, rl, theme) {
  return new Promise((resolve, reject) => {
    if (!themeNames.includes(theme)) {
      reject("Theme is not supported");
    }
    request({
        url: "",
        
    })
  });
}
