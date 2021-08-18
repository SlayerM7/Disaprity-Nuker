import { mainMenuLogo } from "../../prints/logo";
import { createString } from "../utils/createString";
import changeTheme from "./changeTheme";
import faq from "./faq";
import nukeMenu from "./nuke/menu";
import menuToken from "./tokens/menu";

export default function mainMenu(client, rl) {
  console.clear();
  mainMenuLogo();
  rl.question(createString("Enter option"), (option) => {
    let comingSoonOptions = ["x", "c", "n", "m", "z", "v"];
    if (option === "1") {
      nukeMenu(client, rl);
    } else if (option === "2") {
      menuToken(rl, client);
    } else if (option === "3") {
      faq(client, rl);
    } else if (option === "x") {
      changeTheme(client, rl);
    } else if (comingSoonOptions.includes(option)) {
      console.log("");
      console.log(createString("COMING SOON!", "semi", "fail"));
      setTimeout(() => {
        mainMenu(client, rl);
      }, 1500);
      return;
    } else {
      mainMenu(client, rl);
    }
  });
}
