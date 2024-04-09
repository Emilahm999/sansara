import { Form } from "../_classes/Form.js";
import ObserverClass from "../_classes/ObserverClass.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = new Form({
    el: ".invate__form",
  })

  new ObserverClass('.invate', ".invate__form ", {threshold: 0.2})

})