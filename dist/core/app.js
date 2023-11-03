import "reflect-metadata";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import { IntentsBitField } from "discord.js";
export default class App {
    _id;
    _client;
    constructor(__id) {
        this._id = __id;
        this._client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMembers,
            ],
            silent: false,
        });
    }
    async run() {
        this._client.on("ready", async () => {
            console.log("|| Bot Started");
            await this._client.initApplicationCommands();
        });
        this._client.on("interactionCreate", (interaction) => {
            this._client.executeInteraction(interaction);
        });
        await importx(dirname(import.meta.url) +
            "/../components/{events,commands}/**/*.{ts,js}");
        await this._client.login(this._id);
    }
}
