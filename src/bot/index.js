import dotenv from "dotenv";
dotenv.config();

import { axiosInstance } from "./services/apiService.js";
import { db, checkAndCreateTable } from "./db/index.js";

import { Scenes, Telegraf, session } from "telegraf";

import { AddToken } from "./scenes/addToken.js";
import { ChangePhoto } from "./scenes/changePhoto.js";

import messageHandler from "./handlers/messageHandlers.js";
import commandHandler from "./handlers/commandHandlers.js";
import actionHandler from "./handlers/actionHandler.js";

import scheduleTask from "./helpers/hookLastOperation.js";

const bot = new Telegraf(process.env.BOT_TOKEN);
// инициализация сцен
const stage = new Scenes.Stage([AddToken, ChangePhoto]);
bot.use(session());
bot.use(stage.middleware());

// Создание БД
checkAndCreateTable();

// Хэндлеры
messageHandler(bot);
commandHandler(bot);
actionHandler(bot);

scheduleTask();

bot.launch({
  allowedUpdates: ["message", "callback_query"],
});

export default bot;

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
