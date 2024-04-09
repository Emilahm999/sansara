import ObserverClass from "../_classes/ObserverClass.js";
import { PopUp } from "../_classes/Pop-up.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".quiz__button");

  new PopUp({
    title: "Пройти опрос и получить смету",
    buttonsActivate: button,
  })
  new ObserverClass(".quiz", ".quiz__content", {threshold: 0.2})
})