import ObserverClass from "../_classes/ObserverClass.js"
import ToggleClass from "../_classes/ToggleClass.js";

document.addEventListener("DOMContentLoaded", () => {
  const block = document.querySelector(".quations");
  const quations = block.querySelectorAll(".quation");


  new ObserverClass(block, ".title", {threshold: 0.2})
  new ObserverClass(block, ".quations__content", {threshold: 0.2})

  quations.forEach(quation => {
    const objectQuation = new ToggleClass({
      element: quation,
      active: false,
      eventElement: ".quation__title-block"
    })
  })
})