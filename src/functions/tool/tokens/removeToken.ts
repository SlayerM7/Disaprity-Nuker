import request from "request";
import db from "../../../database/db";

export default function removeToken(client, rl) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: "https://disparity-nuker-api.0w218021.repl.co/deletetoken",
        method: "POST",
        json: {
          Authorization: db.get("auth-code"),
        },
      },
      (err, res, body) => {
        if (res.body.status === true) resolve(void 0);
        if (res.body.status === false) reject(void 0);
      }
    );
  });
}
