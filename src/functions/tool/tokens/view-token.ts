import db from "../../../database/db";
import { logo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import sleep from "../../utils/sleep";
import mainMenu from "../main";

export default async function viewToken(rl, client) {
  console.clear();
  logo();
  let token = db.get("curtoken");
  let str = "";
  for (let letter of token) {
    await sleep(63);
    str += letter;
    console.clear();
    logo();
    console.log(createString(str, "semi"));
    if (str.length === token.length) {
      console.log(" ");
      rl.question(createString("Type anything to continue"), () => {
        mainMenu(client, rl);
      });
    }
  }
}
