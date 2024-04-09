import { maskPhone } from "../modules/functions.js";
import { blockBudy, unlockBudy } from "../script.js";
import { Form } from "./Form.js";

export class PopUp {

  _mainInner = `
  <div class="pop-up__main form">
    <input type="hidden" class="input-name-target" value="2" data-reset="false">
    <div class="pop-up__title">Получить консультацию</div>
    <div class="pop-up__input-blocks">
      <label class="input-block">
        <p class="input-block__label">Ваше имя</p>
        <input type="email" class="pop-up__input input-block__input input-name-name" placeholder="Иван">
      </label>
      <label class="input-block">
        <p class="input-block__label">Номер телефона</p>
        <input type="tel" class="pop-up__input input-block__input input-name-phone" placeholder="+7 9__ ___ __ __">
      </label>
    </div>
    <div class="pop-up__button button submit">Оставить заявку</div>
  </div>
  `;

  _popUpInner =`
  <div class="pop-up__container">
    <div class="pop-up__close-button close-button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.66663 2.6665L13.3333 13.3332M2.66663 13.3332L13.3333 2.6665" stroke="#0A1122" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  </div>`;

  _responseInner = `
  <div class="pop-up__main">
    <div class="pop-up__title">Мы получили Вашу заявку!</div>
    <div class="pop-up__response">
      <div class="pop-up__response-text">Наш сотрудник позвонит Вам с номера</div>
      <div class="pop-up__response_phone">+7 (347) 299 79 30</div>
    </div>
    <div class="pop-up__text">Подписывайтесь на наш Телеграм-канал и будьте в курсе последних новостей в сфере малоэтажного строительства, наших акций и предложений</div>
    <div class="pop-up__button button">
      <div class="button-block">
        <div class="button-block__text">Подписаться</div>
        <div class="button-block__svg">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0C4.03202 0 0 4.03202 0 9C0 13.968 4.03202 18 9 18C13.968 18 18 13.968 18 9C18 4.03202 13.968 0 9 0ZM13.176 6.12C13.041 7.542 12.456 10.998 12.159 12.591C12.033 13.266 11.781 13.491 11.547 13.518C11.025 13.563 10.629 13.176 10.125 12.843C9.33299 12.321 8.88302 11.997 8.118 11.493C7.22701 10.908 7.80302 10.584 8.31601 10.062C8.451 9.92701 10.755 7.82998 10.8 7.64102C10.8063 7.61237 10.8054 7.58263 10.7976 7.55443C10.7898 7.52618 10.7751 7.50032 10.755 7.47898C10.701 7.43401 10.629 7.45202 10.566 7.46102C10.485 7.47898 9.22501 8.31601 6.76798 9.97202C6.40798 10.215 6.08399 10.341 5.79601 10.332C5.47202 10.323 4.86 10.152 4.40102 9.99898C3.834 9.81898 3.393 9.72 3.429 9.40501C3.447 9.24302 3.672 9.08102 4.09499 8.90998C6.72302 7.76701 8.469 7.011 9.342 6.651C11.844 5.60701 12.357 5.42701 12.699 5.42701C12.771 5.42701 12.942 5.44501 13.05 5.53499C13.14 5.60701 13.167 5.70599 13.176 5.77801C13.167 5.83202 13.185 5.99402 13.176 6.12Z" fill="#0A1122"/>
          </svg>              
        </div>
      </div>
    </div>
  </div>
  `;

  _responsePopUpInner = `
  <div class="pop-up__container success">
    <div class="pop-up__close-button close-button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.66663 2.6665L13.3333 13.3332M2.66663 13.3332L13.3333 2.6665" stroke="#0A1122" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
  `;

  _el = document.createElement("div");

  constructor (options) {
    this._options = options;
    if (options.title) {
      this._title = options.title;
    }
    if (options.responseTitle) {
      this._responseTitle = options.responseTitle;
    }
    
    this._el.classList.add("pop-up");

    if (options.mainInner) {
      this.#setMainInner();
    }

    

    // на каждую кнопку с селектором options.buttonsActivate добавляем функцию показа формы
    if (options.buttonsActivate) {
      if ( options.buttonsActivate.nodeType == 1) {
        this._buttonsActivate = options.buttonsActivate;
        this._buttonsActivate.addEventListener("click", () => {
          this.#initPopupInner()
          this.#show();
        });
      } else {
        this._buttonsActivate = document.querySelectorAll(options.buttonsActivate);
        this._buttonsActivate.forEach(button => {
          button.addEventListener("click", () => {
          this.#initPopupInner()
          this.#show();
          });
        })
      }
    }
    

  }

  #show() {
    document.body.append(this._el);
    //небходимая зхадержка для анимации
    setTimeout(() => {
      this._el.classList.add("active");      
    }, 100);


    maskPhone();
    blockBudy();
  }

  #hide() {
    // убираем класс для анимаций следющих popup
    this._el.classList.remove("active");
    // ждем пока проигрывается анимация, а потом убираем popup
    setTimeout(() => {
      this._el.remove();      
      unlockBudy();
    }, 300);  
  }
  
  // Выполнение общих настроек для формы
  #setDefaultSettings() {
    // Установка заголовка, если был передан или изменен
    // Если статус ответа формы true, то устанавливае заголовок response формы
    if (this._responseStatus) {
      if (this._responseTitle) {
        this.#setTitle(this._responseTitle);
      }
    } else {
      if (this._title) {
        this.#setTitle(this._title);
      }
    }
    
    // инициализация кнопко закрытия
    this.#initClose();
    // инициализация формы, если она есть в форме
    if (this._el.querySelector(".form")) {
      this.#initForm()
    }
  }

  #initPopupInner() {
    this._responseStatus = false;

    this._el.innerHTML = this._popUpInner;

    this._el.querySelector(".pop-up__container").append(getInnerHtmlElement(this._mainInner));


    this.#setDefaultSettings();
  
  }

  showResponse() {
    this._responseStatus = true;
    this._el.innerHTML = this._responsePopUpInner;
    this._el.querySelector(".pop-up__container").append(getInnerHtmlElement(this._responseInner));
    
    this.#setDefaultSettings();
    this.#show();
  }

  // Вешаем события  на закрытие формы
  #initClose() {
    // кнопка закрытия
    this._closeButtons = this._el.querySelectorAll(".close-button");
    this._closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        this.#hide();
      })
    })

    // нажатие вне контейнера
    this._el.addEventListener("click", (e) => {
      let target = e.target;

      if (target.closest(".pop-up__container")) {
        e.stopPropagation();
      } else {
        this.#hide();
      }
    })

    document.addEventListener("keydown", (e) => {
      let keyEsc = 27;
      if (e.keyCode == keyEsc) this.#hide();
    })
  }

  #initForm() {
    // Инициализируем форму
    this._form = new Form({
      el: this._el.querySelector(".form"),
      // передаем в форму объект popup, для использование в форме функций popup 
      popup: this,
    })

  }

  #setMainInner() {
    this._mainInner = this._options.mainInner;
  }

  #setTitle(value) {
    let title = this._el.querySelector(".pop-up__title")
    if (title) {
      title.textContent = value;  

    }
    
  }

  get el() {
    return this._el;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get responseTitle() {
    return this._responseTitle;
  }

  set responseTitle(value) {
    this._responseTitle = value;
  }

  get responseInner() {
    return this._responseInner;
  }

  set responseInner(value) {
    this._responseInner = value;
  }

  get responsePopUpInner() {
    return this._responsePopUpInner;
  }

  set popUpInner(value) {
    this._responsePopUpInner = value;
  }

  get mainInner() {
    return this._mainInner;
  }

  set mainInner(value) {
    this._mainInner = value;
  }

  get popUpInner() {
    return this._popUpInner;
  }

  set popUpInner(value) {
    this._popUpInner = value;
  }
}

function getInnerHtmlElement(inner) {
  let div = document.createElement("div");
  div.innerHTML = inner;

  return div.children[0];
}