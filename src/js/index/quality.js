import ObserverClass from "../_classes/ObserverClass.js"

document.addEventListener("DOMContentLoaded", () => {
  new ObserverClass(".quality", ".title", {threshold: 0.2})
  new ObserverClass(".quality", ".quality__tabs", {threshold: 0.2})
})