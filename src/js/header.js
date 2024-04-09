import {changeStyleProperties, getParentBlock, throttle, unlockBudy, blockBudy} from "./script.js";
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header-main");
  const menuButton = header.querySelector(".header-mobile-menu__burger");
  const mobileNavElements = header.querySelectorAll(".header-mobile__nav-element");
  // // цвета для светлых блоков

  const color = "var(--main-dark-color)";
  const backgroundColor = "var(--white)";
  const mainBrandGutenhausBackgroundColor = "var(--dark-color-10)";
  const socialTelegramBackgroundColor = "rgba(42, 171, 238, 0.1)";
  const socialWhatsappBackgroundColor = "rgba(43, 183, 65, 0.1)";

  // // цвета для темных блоков

  const colorD = "var(--white)";
  const backgroundColorD = "linear-gradient(180deg, rgba(10,17,34,0.4990371148459384) 0%, rgba(10,17,34,0) 100%)";
  const mainBrandGutenhausBackgroundColorD = "var(--dark-color-50)";
  const socialTelegramBackgroundColorD = "var(--dark-color-50)";
  const socialWhatsappBackgroundColorD = "var(--dark-color-50)";

  // // закрашиваем при первом запуске
  // headerCheck();
  // blockCheck();

  // // добавляем слушателя на скролл для изменения цвета шапки.
  // window.addEventListener("scroll", throttle(headerCheck, 500));
  window.addEventListener("scroll", throttle(blockCheck, 1000));

  
  // мобильное меню
  menuButton.addEventListener("click", () => {
    if (header.classList.contains("mobile-active")) {
      header.classList.remove("mobile-active");
      headerCheck();
      unlockBudy();
    } else {
      blockBudy();
      changeStyleProperties({
        "--header-color" : colorD,
      }, header)
      header.classList.add("mobile-active");
    }
  })

  mobileNavElements.forEach(element => {
    element.addEventListener("click", () => {
      header.classList.remove("mobile-active");
      changeStyleProperties({
        "--header-color" : color,
      }, header);
      unlockBudy();
      
    })
  })




  function headerCheck() {
    // получаем элемент который находиться под нижней точкой шапки
    let curentEl = getHeaderPosElement();

    // если элемент содержит класс темной шапки, то даем ей эти стили, иначе даем светлые
    if (curentEl.classList.contains("dark-header")) {
      changeStyleProperties({
        "--header-color": colorD,
        "--header-background-color": backgroundColorD,
        "--header-main-brand-gutenhaus-background-color": mainBrandGutenhausBackgroundColorD,
        "--header-social-telegram-background-color": socialTelegramBackgroundColorD,
        "--header-social-whatsapp-background-color": socialWhatsappBackgroundColorD,
      }, header)
    } else {
      changeStyleProperties({
        "--header-color": color,
        "--header-background-color": backgroundColor,
        "--header-main-brand-gutenhaus-background-color": mainBrandGutenhausBackgroundColor,
        "--header-social-telegram-background-color": socialTelegramBackgroundColor,
        "--header-social-whatsapp-background-color": socialWhatsappBackgroundColor,
      }, header)
    }
  }

  function getHeaderPosElement() {
    let headerBottomPos = header.getBoundingClientRect().bottom;
    let curentEl = document.elementFromPoint(0,headerBottomPos + 1);
    curentEl = getParentBlock(curentEl);

    return curentEl;
  }

  function blockCheck() {
    let curentEl = getHeaderPosElement();

    if (checkClass(curentEl, ["first-block", "fundaments"])) {
      setCurentNav(mobileNavElements[0]);
    } else if (checkClass(curentEl, ["includes", "invate"])) {
      setCurentNav(mobileNavElements[1]);
    } else if (checkClass(curentEl, ["quality"])) {
      setCurentNav(mobileNavElements[2]);
    } else if (checkClass(curentEl, ["quiz", "quation"])) {
      setCurentNav(mobileNavElements[3]);
    }
  }

  function checkClass(elem, classNames) {
    for (const className of classNames) {
      if (elem.classList.contains(className)) {
        return true;
      }
    }
    return false
  }

  function setCurentNav(elem) {
    cleanNav();
    elem.classList.add("curent");
  }

  function cleanNav() {
    mobileNavElements.forEach(element => {
      element.classList.remove("curent");
    })
  }
})

