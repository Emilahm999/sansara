"use strict"
// import * as func from "./modules/functions.js";
import "./header.js";
import "./index/first-block.js";
import "./index/fundaments.js";
import "./index/quations.js";
import "./index/quiz.js";
import "./index/includes.js";
import "./index/quality.js";
import "./index/invate.js";
// import "./index/difference.js";
// import "./index/newsletter.js";
// import "./index/build-map.js";
// import "./index/map.js";
// import "./index/build-benefit.js";
// import "./modules/scroll.js";
// import Swiper from 'swiper';// default слайдер
import { PopUp } from "./_classes/Pop-up.js";
import Tabs from "./_classes/Tabs.js";
// import { Navigation, Pagination } from 'swiper/modules'; //раскомментировать и добавить нужные модули при необходимости

let widthScroll = window.innerWidth - document.documentElement.clientWidth;

maskPhone();

// Устанавливаем оступ при загрузке странице
setAutoMargin()

// при изменение размеров экрана меняем margin
window.addEventListener("resize", setAutoMargin)

// устанавливаем высоту для --vh, для нормального отображения на мобильных устройствах 100vh
setVh();
window.addEventListener("resize", setVh);

const onTopButton = document.querySelector(".on-top");
	onTopButton.addEventListener("click", () => {
	window.scrollTo(0, 0);
})

// Функция для изменения переменных в css
// object - объект с наименованием переменных и их значений
// пример: {"--main-font-size" : "16px"}
// use - элемент к в котором будет назначена/изменена переменная, по умолчанию - :root
export function changeStyleProperties(object, use = document.documentElement) {
	for (const prop of Object.entries(object)) {
		use.style.setProperty(prop[0], prop[1]);	
	}
}

export function getMassThreshold(procents = [0,100]) {
  let threshold = [];
  for (let i = 0; i <= 100; i++) {
		if (procents.length > 1) {
			if ((i >= procents[0]) && (i <= procents[1])) {
				threshold.push(i/100);			
			}
		} else {
			if (i == procents) {
				threshold.push(i/100);			
			}
		}
		
  }
  return threshold;
}

// функция фильтр, для уменьшения выполнения функций на событиях.
// Пример для scroll. 
// window.addEventListener("scroll", throttle(callback, 1000))
// при скроле функция выполнентся только через 1 секунду

export function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
// получаем родительский блок, который лежит в body
export function getParentBlock(element) {
  if (element == null) {
		return document.body;
	}
  let curent = element;
  let parent = curent.parentElement;

  if (parent == document.body) {
    return curent;
  }

  return getParentBlock(parent);
}

// маска для телефона

function maskPhone(masked = '+7 9__ ___-__-__') {
	const elems = document.querySelectorAll(`input[type="tel"]`);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
    elem.placeholder = "+7 9__ ___-__-__";
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}



function setAutoMargin() {
	let marginWrapper = getWrapperMargin();
	changeStyleProperties({
		"--wrapper-side-margin": marginWrapper,
	})
}

// получаем отступы padding
export function getWrapperPadding(number = false) {
	let wrapper = document.querySelector(".wrapper");
	let paddingWrapper = window.getComputedStyle(wrapper).getPropertyValue("padding-left");
	// если указано, что нужно только число, то возвращаем значение без px
	if (number) {
		return +paddingWrapper.replace(/\D/g, "");
	}
	return paddingWrapper
}

// получаем отступы padding
export function getWrapperMargin(number = false) {
	let wrapper = document.querySelector(".wrapper");
	let marginWrapper = window.getComputedStyle(wrapper).getPropertyValue("margin-left");
	// если указано, что нужно только число, то возвращаем значение без px
	if (number) {
		return +marginWrapper.replace(/\D/g, "");
		
	}
	return marginWrapper;
}


function setVh() {
	let vh = document.documentElement.clientHeight * 0.01;
	changeStyleProperties({
		"--vh" : vh +"px",
	})

	
}


export function blockBudy() {
	if (getComputedStyle(document.documentElement).getPropertyValue("--body-overflow") != "hidden"){
		changeStyleProperties({
			"--body-overflow": "hidden",
			"--body-padding": `0 ${widthScroll}px 0 0`
		})
	}
}

export function unlockBudy() {
	changeStyleProperties({
		"--body-overflow": "initial",
		"--body-padding": `initial`
	})
}

export function videoInner(elements) {
	elements.forEach(element => {
    let link = element.dataset.link;

    let iframeInner = `<iframe 
    src="${link}?autoplay=1" title="YouTube video player" 
    frameborder="0" allow="accelerometer; autoplay"; clipboard-write; encrypted-media; gyroscope; 
    picture-in-picture; web-share" allowfullscreen></iframe>`
    
    element.addEventListener("click", () => {
      element.innerHTML = iframeInner;
    })


  })
}