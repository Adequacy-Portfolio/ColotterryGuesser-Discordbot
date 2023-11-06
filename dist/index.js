import App from "./core/app.js";
import dotenv from "dotenv";
dotenv.config();
await new App(process.env.DISCORD_BOT_TOKEN).run();
