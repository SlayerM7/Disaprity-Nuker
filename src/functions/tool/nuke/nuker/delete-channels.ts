import { Client } from "discord.js";
import db from "../../../../database/db";
import request from "request";
import { createString } from "../../../utils/createString";
import { getTheme } from "../../../utils/getTheme";
import sleep from "../../../utils/sleep";
import nukeMenu from "../menu";

function deleteChannel(ch, guildId, mainColor) {
  request(
    {
      url: `https://discord.com/api/v8/channels/${ch}`,
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
                `Failed to delete channel ${mainColor(ch)}`,
                "semi",
                "fail"
              )
            );
          } else if (res.body.retry_after) {
            console.log(createString(`Rate limited`, "semi", "fail"));
            await sleep(res.body.retry_after * 1.05);
            deleteChannel(ch, guildId, mainColor);
          } else {
            console.log(
              createString(`Deleted channel ${mainColor(ch)}`, "semi")
            );
          }
        }
    }
  );
}

export default function (
  client: Client,
  channels,
  guildId,
  rl,
  server,
  goBack = true
) {
  let mainColor = getTheme();
  channels.map((m, i) => {
    deleteChannel(m, guildId, mainColor);
  });
  if (goBack === true) {
    let checkChannels = setInterval(() => {
      if (server.channels.cache.size === 0) {
        nukeMenu(client, rl);
        clearInterval(checkChannels);
      }
    }, 1000);
  }
}
