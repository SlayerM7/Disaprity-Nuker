import { logo } from "../../prints/logo";
import { createString } from "../utils/createString";
import { Client } from "discord.js";
import request from "request";
import toolStart from "../..";
import db from "../../database/db";
import main from "../tool/main";
import sleep from "../utils/sleep";
import addToken from "../tool/tokens/addToken";

export default function (rl) {
  console.clear();
  logo();

  rl.question(createString("Enter username"), (username) => {
    username = username.trim();
    rl.question(createString("Enter password"), (password) => {
      password = password.trim();
      request(
        {
          url: "https://disparity-nuker-api.0w218021.repl.co/login",
          method: "POST",
          json: {
            Username: username,
            Password: password,
          },
        },
        async (err, res, body) => {
          if (res.body.message === "That account does not exist.") {
            console.log(" ");
            console.log(createString("Unknown account", "semi", "fail"));
            setTimeout(() => {
              toolStart();
            }, 1000);
            return;
          }
          if (res.body.message === "Incorrect password.") {
            console.log(" ");
            console.log(createString("Incorrect password", "semi", "fail"));
            setTimeout(() => {
              toolStart();
            }, 1000);
            return;
          }
          if (res.body.message === "Exception fail") {
            console.log(" ");
            console.log(createString("Unknown exception", "semi", "fail"));
            setTimeout(() => {
              toolStart();
            }, 1000);
            return;
          }
          if (!res.body) {
            console.log(" ");
            console.log(createString("Please try again later", "semi", "fail"));
            setTimeout(() => {
              toolStart();
            }, 1000);
            return;
          } else if (res.body.status === false) {
            console.log(" ");
            console.log(createString("Please try again later", "semi", "fail"));
            setTimeout(() => {
              console.log(res.body.message);
            }, 1000);
          }
          let preTokenRes = res;
          request(
            {
              url: "https://disparity-nuker-api.0w218021.repl.co/gettoken",
              method: "GET",
              json: {
                Authorization: res.body.message,
              },
            },
            (err, res, body) => {
              const client = new Client();

              if (res.body.message === "No token has been added.") {
                db.set("auth-code", preTokenRes.body.message);
                console.clear();
                logo();
                console.log(createString("No token saved", "semi", "fail"));
                console.log(" ");
                rl.question(createString("Enter token"), (token) => {
                  if (token === "menu") {
                    toolStart();
                    return;
                  }
                  client.on("ready", () => {
                    client.destroy();
                    console.log(" ");
                    addToken(client, rl, token).then(() => {
                      // console.log("SUCCESS");
                      toolStart();
                    });
                  });
                  client.login(token).catch(() => {
                    console.log(createString("Invalid token", "semi", "fail"));
                    setTimeout(() => {
                      toolStart();
                    }, 1000);
                  });
                });
                return;
              }
              db.set("auth-code", preTokenRes.body.message);
              db.set("username", preTokenRes.body.username);
              db.set("curtoken", res.body.message);

              client.login(res.body.message);

              main(client, rl);
            }
          );
        }
      );
    });
  });
}
