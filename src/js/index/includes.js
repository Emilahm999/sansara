import ObserverClass from "../_classes/ObserverClass.js"

document.addEventListener("DOMContentLoaded", () => {
  new ObserverClass(".includes", ".title", {threshold: 0.2})
  new ObserverClass(".includes", ".includes__content", {threshold: 0.2})
})