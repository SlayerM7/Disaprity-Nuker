import db from "./database/db";
import readline from "readline";
import { createString } from "./functions/utils/createString";
import { logo, startMenuLogo } from "./prints/logo";
import login from "./functions/start-menu/login";
import register from "./functions/start-menu/register";
import child_process from "child_process";
import request from "request";
import open from "open";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function toolStart() {
  db.delete("username");
  db.delete("curtoken");
  db.delete("auth-code");
  db.save();

  child_process.exec("mode 85,20");
  console.clear();
  request(
    {
      url: "https://disparity-nuker-api.0w218021.repl.co/update",
      method: "GET",
      json: {
        Version: 4.0,
      },
    },
    (err, res, body) => {
      if (res.body.status === true) {
        logo();
        console.log(" ");
        console.log(
          createString("You are on a out-dated version", "semi", "fail")
        );
        console.log(" ");
        rl.question(createString("Type anything to update"), () => {
          open(res.body.message);
          console.log(" ");
          console.log(createString("Closing window in 5 seconds", "semi"));
          setTimeout(() => {
            process.exit();
          }, 5000);
        });
        return;
      }
      logo();
      startMenuLogo();
      rl.question(createString("Enter option"), (option) => {
        if (option === "1") {
          login(rl);
        } else if (option === "2") {
          register(rl);
        } else if (option === "4") {
          if (res.body.status === true) {
            open(res.body.message);
          } else {
            console.log("");
            console.log(createString("You are on the newest version!", "semi"));
            setTimeout(() => {
              toolStart();
            }, 1500);
            return;
          }
        } else {
          console.log("");
          console.log(createString("COMING SOON!", "semi", "fail"));
          setTimeout(() => {
            toolStart();
          }, 1500);
          return;
        }
      });
    }
  );
}
toolStart();

export default toolStart;
