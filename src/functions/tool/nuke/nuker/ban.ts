import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";

function banMember(m, guildId, mainColor) {
  request(
    {
      url: `https://discord.com/api/v8/guilds/${guildId}/bans/${m}?reson=external-nuker`,
      method: "PUT",
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
              createString(`Failed to ban ${mainColor(m)}`, "semi", "fail")
            );
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            banMember(m, guildId, mainColor);
          } else {
            console.log(createString(`Banned ${mainColor(m)}`, "semi"));
          }
        } else {
          console.log(createString(`Banned ${mainColor(m)}`, "semi"));
        }
    }
  );
}

export default function (client: Client, members, guildId) {
  let mainColor = getTheme();
  members.map(async (m) => {
    banMember(m, guildId, mainColor);
  });
}
