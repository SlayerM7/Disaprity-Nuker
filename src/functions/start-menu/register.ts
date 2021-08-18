import db from "../../database/db";
import { logo } from "../../prints/logo";
import { createString } from "../utils/createString";
import request from "request";
import toolStart from "../..";

export default function (rl) {
  console.clear();
  logo();
  rl.question(createString("Enter username"), (username) => {
    username = username.trim();
    rl.question(createString("Enter password"), (password) => {
      password = password.trim();
      rl.question(createString("Enter license key"), (key) => {
        request(
          {
            url: "https://disparity-nuker-api.0w218021.repl.co/create",
            method: "POST",
            json: {
              Username: username,
              Password: password,
              KeyUsed: key,
            },
          },
          (err, res, body) => {
            if (res.body.status === false) {
              console.log(createString(res.body.message, "semi", "fail"));
              setTimeout(() => {
                toolStart();
              }, 1500);
              return;
            }
            console.log(" ");
            console.log(createString("Created account!", "semi"));
            setTimeout(() => {
              toolStart();
            }, 1000);
          }
        );
      });
    });
  });
}
