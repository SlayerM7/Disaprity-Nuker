import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";
import nukeMenu from "../menu";

function createChannel(name, guildId, mainColor) {
  request(
    {
      url: `https://discord.com/api/v8/guilds/${guildId}/channels`,
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
            console.log(
              createString(`Failed to create channel`, "semi", "fail")
            );
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            createChannel(name, guildId, mainColor);
          } else {
            console.log(createString(`Created channel`, "semi"));
          }
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
  goBack = true
) {
  let oldChannelSize = server.channels.cache.size;
  let mainColor = getTheme();

  for (let i = 0; i < params.amount; i++) {
    createChannel(params.name, guildId, mainColor);
    if (goBack === true) {
      let checkChannels = setInterval(() => {
        if (server.channels.cache.size === oldChannelSize + params.amount) {
          nukeMenu(client, rl);
          clearInterval(checkChannels);
        }
      }, 1000);
    }
  }
}
