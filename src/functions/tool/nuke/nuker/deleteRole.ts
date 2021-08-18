import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";

function deleteRole(rl, guildId, mainColor) {
  request(
    {
      url: `https://discord.com/api/v8/guilds/${guildId}/roles/${rl}`,
      method: "DELETE",
      headers: { Authorization: "Bot " + db.get("curtoken") },
      json: {
        reason: "External-nuker",
      },
    },
    async (err, res, body) => {
      if (typeof res !== "undefined")
        if (typeof res.body !== "undefined") {
          if (res.body.message === "Missing Permissions") {
            console.log(
              createString(
                `Failed to delete role ${mainColor(rl)}`,
                "semi",
                "fail"
              )
            );
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            deleteRole(rl, guildId, mainColor);
          } else {
            console.log(createString(`Deleted role ${mainColor(rl)}`, "semi"));
          }
        } else {
          console.log(createString(`Deleted role ${mainColor(rl)}`, "semi"));
        }
    }
  );
}

export default function (client: Client, roles, guildId) {
  let mainColor = getTheme();
  roles.map((m, i) => {
    deleteRole(m, guildId, mainColor);
  });
}
