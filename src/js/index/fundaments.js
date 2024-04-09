import ObserverClass from "../_classes/ObserverClass.js"
import { PopUp } from "../_classes/Pop-up.js"
import Tabs from "../_classes/Tabs.js"

document.addEventListener("DOMContentLoaded", () => {
  new PopUp({
    title: "Заказать фундамент",
    buttonsActivate: ".fundament-list__order",
  })

  const tabs = new Tabs({
    tabs: ".fundament-list__tab",
    content: ".fundament-list__content",
    tabClassActive: "button_white",
    tabExistActive: false,
    nextTabClass: ".fundament-list__button-next",
    prevTabClass: ".fundament-list__button-prev",
  })

  new ObserverClass(".fundaments", ".title", {threshold: 0.2});
  new ObserverClass(".fundaments", ".sub-title", {threshold: 0.2});
  new ObserverClass(".fundaments", ".fundament-list", {threshold: 0.2});


})

