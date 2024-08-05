import axios from "axios";
import dotenv from "dotenv";
import apiLimitWait from "../helpers/apiLimitWait.js";

dotenv.config();

global.apiCount = 0;

// Создание экземпляра Axios с установленными параметрами
export const axiosInstance = axios.create({
  baseURL: "https://api.geckoterminal.com/api/v2/", // базовый URL для запросов
  headers: {
    accept: "application/json", // пример другого заголовка
  },
});

export const axiosInstanceTonViewer = axios.create({
  baseURL: "https://tonapi.io/v2/", // базовый URL для запросов
  headers: {
    accept: "application/json", // пример другого заголовка
  },
});

// Получение токена по адрессу
export async function getToken(address) {
  global.apiCount += 1;
  await apiLimitWait();
  return await axiosInstance
    .get(`networks/ton/tokens/${address}/info`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(
        `Ошибка получения токена (адресс: ${address}) getToken():\n `,
        err
      );
      return false;
    });
  
}

// Получение пуллов по токену
export async function getTokenPools(address, page = "1") {
  global.apiCount += 1;
  await apiLimitWait();
  return await axiosInstance
    .get(`networks/ton/tokens/${address}/pools?page=${page}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      // console.log(
      //   `Ошибка получения пуллов (токен: ${address}) getTokenPools():\n `,
      //   err
      // );
      return false;
    });
  
}

// Получение пуллов последних трэйдов по адрессу пула
export async function getLastPoolsTrades(address) {
  global.apiCount += 1;
  await apiLimitWait();
  return await axiosInstance
    .get(`networks/ton/pools/${address}/trades`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      // console.log(
      //   `Ошибка получения трэдов пулла (пулл: ${address}) getLastPoolsTrades():\n `,
      //   err
      // );
      return false;
    });
  
}

// Получение всех держателей токена
export async function getTokenHolders(address) {
  global.apiCount += 1;
  await apiLimitWait();
  return await axiosInstanceTonViewer
    .get(`jettons/${address}/holders?limit=1&offset=0`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // console.log(
      //   `Ошибка получения трэдов пулла (пулл: ${address}) getLastPoolsTrades():\n `,
      //   err
      // );
      return false;
    });
  
}

export const apiLimit = 29;
