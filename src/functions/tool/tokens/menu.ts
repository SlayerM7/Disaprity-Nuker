import db from "../../../database/db";
import { logo, tokenMenuLogo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import sleep from "../../utils/sleep";
import mainMenu from "../main";
import changeToken from "./changeToken";
import removeToken from "./removeToken";
import tokenInfo from "./tokenInfo";
import viewToken from "./view-token";

export default function menuToken(rl, client) {
  console.clear();
  logo();
  tokenMenuLogo();

  rl.question(createString("Enter option"), async (option) => {
    if (option === "menu") {
      mainMenu(client, rl);
      return;
    }
    if (option === "1") {
      viewToken(rl, client);
    } else if (option === "2") {
      changeToken(client, rl);
    } else if (option === "3") {
      tokenInfo(client, rl);
    } else if (option === "remove") {
      removeToken(client, rl).then(() => {
        console.log("tooo");
      });
    } else {
      menuToken(rl, client);
    }
  });
}
