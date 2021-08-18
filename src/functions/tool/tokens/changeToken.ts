import db from "../../../database/db";
import { logo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import mainMenu from "../main";
import request from "request";
import removeToken from "./removeToken";
import addToken from "./addToken";
import toolStart from "../../..";

export default function changeToken(client, rl) {
  console.clear();
  logo();
  rl.question(createString("Enter new token"), (token) => {
    if (token === "menu") {
      mainMenu(client, rl);
      return;
    }
    console.clear();
    logo();
    // console.log(createString("Checking token ...", "semi"));
    // client.destroy();
    // client.login(token).catch(() => {
    //   console.log(" ");
    //   console.log(createString("Invalid token", "semi", "fail"));
    //   setTimeout(() => {
    //     console.clear();
    //     logo();
    //     console.log(
    //       createString("Critical error, Please restart tool", "semi", "fail")
    //     );
    //   }, 4000);
    // });
    removeToken(client, rl).then(() => {
      addToken(client, rl, token).then(() => {
        db.delete("auth-code");
        db.delete("curtoken");
        db.delete("username");

        toolStart();
      });
    });
  });
}
