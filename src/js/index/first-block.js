import ObserverClass from "../_classes/ObserverClass.js";
import { PopUp } from "../_classes/Pop-up.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".first-block__button");

  new PopUp({
    title: " Вызвать специалиста на бесплатный замер ",
    buttonsActivate: button,
    // targetValue: "3",
  })

  new ObserverClass(".first-block", ".title");
  new ObserverClass(".first-block", ".sub-title");
  new ObserverClass(".first-block", ".first-block__callback-block");
  new ObserverClass(".first-block", ".first-block__arrow-down");
})