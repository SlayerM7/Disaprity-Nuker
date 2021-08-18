import { white } from "chalk";
import db from "../../database/db";
import { logo } from "../../prints/logo";
import { createString } from "../utils/createString";
import themes from "../utils/themes";
import mainMenu from "./main";

export default function changeTheme(client, rl) {
  console.clear();
  logo();
  console.log(createString("Type *view* to view themes", "semi"));
  console.log(" ");
  rl.question(createString("Enter theme name"), (theme) => {
    theme = theme.toLowerCase();
    if (!themes.themeNames.includes(theme) && theme !== "view") {
      console.log("");
      console.log(createString("Unknown theme", "semi", "fail"));
      setTimeout(() => {
        mainMenu(client, rl);
      }, 1500);
      return;
    }
    if (theme === "view") {
      console.clear();
      logo();
      themes.themes.map((t) => {
        let mColor = t.theme;
        console.log(`              ${mColor("> ")}${white(t.themeName)} `);
      });
      setTimeout(() => {
        console.log(" ");
        rl.question(createString("Type anything to continue"), () => {
          changeTheme(client, rl);
        });
      }, 2000);
      return;
    }
    db.set("theme", theme);
    db.save();

    mainMenu(client, rl);
  });
}
