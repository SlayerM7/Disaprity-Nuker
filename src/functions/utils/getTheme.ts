import { magentaBright } from "chalk";
import db from "../../database/db";
import themesObject from "./themes";

export function getTheme() {
  if (db.has("theme")) {
    let themeName = db.get("theme");
    let theme = themesObject.themes.find((obj) => obj.themeName === themeName);
    // while (true) {
    //   console.log(theme.theme);
    // }

    return theme.theme;
  } else return magentaBright;
}
