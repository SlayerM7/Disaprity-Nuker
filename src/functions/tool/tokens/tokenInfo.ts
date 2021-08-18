import { Client } from "discord.js";
import db from "../../../database/db";
import { logo } from "../../../prints/logo";
import { createString } from "../../utils/createString";
import { getTheme } from "../../utils/getTheme";
import mainMenu from "../main";

export default function tokenInfo(client: Client, rl) {
  console.clear();
  logo();

  let mainColor = getTheme();

  console.log(createString(`CLIENT INFO: `, "semi"));
  console.log(" ");
  console.log(
    createString(`Total servers: ${client.guilds.cache.size}`, "semi")
  );
  console.log(
    createString(`Total channels: ${client.channels.cache.size}`, "semi")
  );
  console.log(
    createString(`Total emojis: ${client.emojis.cache.size}`, "semi")
  );
  console.log(createString(`WS ping: ${client.ws.ping}`, "semi"));
  console.log(" ");
  rl.question(createString("Type anything to continue"), () => {
    mainMenu(client, rl);
  });
}
