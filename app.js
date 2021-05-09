const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");
const axios = require("axios").default;

client.on("ready", () => {
  console.log(`Loggend in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (msg.content === "!hello") {
    msg.reply("Hello, I'm Lumbark bot");
  }
});

client.on("message", async (msg) => {
  // ...
  if (msg.content === "!online") {
    axios
      .get("https://api.g-portal.us/gameserver/query/446747")
      .then(function (response) {
        const res = response.data;
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#ff006a")
          .setTitle("Scum Lumbark Server Online Player")
          .setDescription("รายงานจำนวนผู้เล่นใน server")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/670545624814583858/840885853445685248/232eb2a7532626b1.png"
          )
          .addFields(
            { name: "Name Server", value: res.name, inline: true },
            { name: "\u200B", value: "\u200B" },
            { name: "IpAddress", value: res.ipAddress, inline: true }
          )
          .addField(
            "Online Players",
            "\u200B" + res.currentPlayers + "/" + res.maxPlayers,
            true
          )
          .addFields({ name: "\u200B", value: "\u200B" })
          .setTimestamp()
          .setFooter(
            "Lumbark bot",
            "https://cdn.discordapp.com/attachments/670545624814583858/840885853445685248/232eb2a7532626b1.png"
          );

        msg.channel.send(exampleEmbed);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
});

client.login(auth.token);
