import { PopUp } from "./Pop-up.js";

export class Form {

  constructor (options) {
    // Если передают node элемент, то _el = элемент, иначе ищем элемент по селектору(строке)
    if ( options.el.nodeType == 1) {
      this._el = options.el;
    } else {
      this._el = document.querySelector(options.el);
    }

    if (options.popup) {
      this._popup = options.popup;      
    } else {
      this._popup = new PopUp({});
    }

    this._inputs = this._el.querySelectorAll("input");

    this._elButton = this._el.querySelector(".submit");

    this._formData = {};

    if (this._elButton) {
      this._elButton.addEventListener("click", () => {this.#formInput()})
    };

    // добавляем отправку формы при нажатие на enter
    document.addEventListener("keydown", (e) => {
      let keyEnter = 13;
      if (e.keyCode == keyEnter) {
        this._inputs.forEach(input => {
          if (document.activeElement == input) this.#formInput();
        })
      }
      
    })
  }

  #formInput() {
    let check = true;
    this._inputs.forEach( input => {
      let name = getNameInput(input);

      if (check) check = checkInput(input, name);
      
      if (checkInput(input, name)) {
        this._formData[name] = {
          name: name,
          value: input.value,
          checked: input.checked,
        };
      }
    })

    if (check) {
      // this.#sendForm(this._formData);
    }
  }

  async #sendForm(data) {
    let url = "/local/templates/good-modern-houses/ajax/sendFos.php"
  
    let response = await fetch(url, {
      method: "POST",
      referrer: `${location.origin}${url}`,
      headers: {
        // Добавляем необходимые заголовки
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    }).finally(() => {
      //Очистка инпутов
    }).then((response) => {
      console.log(response);
      hideAllErrorInputs(this._inputs);
      
      if (!(response.ok)) {
        this._popup.responseInner = `
        <div class="pop-up__main">
          <div class="pop-up__title">Что-то пошло не так</div>
          <div class="pop-up__text">Попробуйте позже или обратитесь к администратору</div>
          <div class="pop-up__button button close-button">Хорошо</div>
        </div>`
      }
      this.#showResponse();

    }).catch((reject) => {
      console.warn("Что-то пошло не так", reject)
    })
  }

  #showResponse() {
    if (this._popup) {
      this._popup.showResponse();
    }
  }

}




// Входная функция для проверки переданных input. Возвращает true если input корректный
function checkInput(input, idName) {
  let check = true;

  switch (idName) {
    case "phone":
      if (check) {
        check = checkPhone(input);      
      }
      break;

    case "name":
      if (check) {
        check = checkEmpty(input);      
      }
      break;

    case "policy":
      if (check) {
        check = checkPolicy(input);      
      }
      break;

    case "adress":
      if (check) {
        check = checkEmpty(input);      
      }
      break;

    case "time":
      if (check) {
        check = checkTime(input);      
      }
      break;

    case "otdelka":
      if (check) {
        check = checkOtdelka(input);      
      }
      break;

    case "wishes":
      if (check) {
        check = checkEmpty(input);      
      }
      break;
    case "email":
      if (check) {
        check = checkEmail(input);      
      }
      break;
  
    default:
      break;
  }
  return check;
}


// Проверка поля отделки
function checkOtdelka(input) {
  if (input.value == "0" || input.value == "") {
    // showErrorInput(input);
    return false;
  }

  hideErrorInput(input);
  return true;
}
// Проверка поля Телефона
function checkPhone(input) {
  if (input.value.length != 16) {
    showErrorInput(input);
    return false;
  }

  return true;
}
// Проверка поля соглашения с политикой конфиденциальности
function checkPolicy(input) {
  if (input.checked == false) {
    showErrorInput(input);
    return false;
  }
  hideErrorInput(input);

  return true;
}
// Проверка на пустоту
function checkEmpty(input) {
  if (input.value.trim() == "") {
    showErrorInput(input);
    return false;
  }
  hideErrorInput(input);
  return true;
}

// Проверка на почту
function checkEmail(input) {
  let value = input.value.trim();
  if (!value.match(/\w+@\w+\.\w+/g)) {
    showErrorInput(input);
    return false;
  }
  hideErrorInput(input);
  return true;
}

// Проверка введения времени. от 00:00 до 24:00
function checkTime(input) {
  let time = input.value.trim();
  if (!time.match(/\d\d.\d\d/)) {
    showErrorInput(input);
    hideErrorInput(input);
  return false;
  }

  let hourse = +time.slice(0,2);
  let minutes = +time.slice(3,5);


  if (hourse > 24) {
    // showErrorInput(input, "Некорректное время");
    return false;
  }

  if (minutes > 60) {
    // showErrorInput(input, "Некорректное время");
    return false;
  }

  hideErrorInput(input);
  return true;
}


// Получает name для input из класса "input-name-'name'"
export function getNameInput(input) {
  let idName;
  for (let i = 0; i < input.classList.length; i++) {
    if (input.classList[i].indexOf("input-name-") != -1) {
      idName =  input.classList[i].slice(11);
    }
  }

  if (!idName) {
    return;
  } else {
    return idName;
  }
}

function showErrorInput(input) {
  let block = input.closest(".input-block") ? input.closest(".input-block") : input.closest(".checkbox-block");
  if (block) {
    block.classList.add("error");    
  }
}

function hideAllErrorInputs(inputs) {
  inputs.forEach(input => {
    hideErrorInput(input);
  })
}

function hideErrorInput(input) {
  let block = input.closest(".input-block") ? input.closest(".input-block") : input.closest(".checkbox-block");
  if (block) {    
    block.classList.remove("error");
  }
}