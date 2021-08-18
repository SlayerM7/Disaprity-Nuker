import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";
import nukerMenu from "../menu";
import nukeMenu from "../menu";

function createRole(name, guildId, mainColor) {
  request(
    {
      url: `https://discord.com/api/v8/guilds/${guildId}/roles`,
      method: "POST",
      headers: { Authorization: "Bot " + db.get("curtoken") },
      json: {
        reason: "External-nuker",
        name: name,
      },
    },
    async (err, res, body) => {
      if (typeof res !== "undefined")
        if (typeof res.body !== "undefined") {
          if (res.body.message === "Missing Permissions") {
            console.log(createString(`Failed to create role`, "semi", "fail"));
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            createRole(name, guildId, mainColor);
          } else {
            console.log(createString(`Created role`, "semi"));
          }
        } else {
          console.log(createString(`Created role`, "semi"));
        }
    }
  );
}

export default function (
  client: Client,
  guildId,
  params = { amount: 10, name: "no-name-given" },
  rl,
  server,
  goback = true
) {
  let oldRoleSize = server.roles.cache.size;
  let mainColor = getTheme();

  for (let i = 0; i < params.amount; i++) {
    createRole(params.name, guildId, mainColor);
    if (goback === true) {
      let checkChannels = setInterval(() => {
        if (server.roles.cache.size === oldRoleSize + params.amount) {
          nukeMenu(client, rl);
          clearInterval(checkChannels);
        }
      }, 1000);
    }
  }
}
