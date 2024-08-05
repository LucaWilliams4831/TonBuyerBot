import { apiLimit } from "../services/apiService.js";

export default function apiLimitWait() {
  return new Promise((resolve) => {
    const checkValue = () => {
      if (Number(global.apiCount) === apiLimit) {
        console.log("Ожидание");
        setTimeout(checkValue, 1000); // Проверяем каждые 100 мс
      } else {
        console.log(global.apiCount);
        resolve();
      }
    };

    checkValue();
  });
}
