export function isWebP(callback) {
  

  function testWebP(callback) {
    var webP = new Image(); 
    webP.onload = webP.onerror = function () { 
      callback(webP.height == 2); 
    }; 
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
  
    testWebP(function (support) {
      if (support == true) { document.querySelector('body').classList.add('webp'); 
    } else {
      document.querySelector('body').classList.add('no-webp'); 
    }
    });
  }

// Превращает первую букву в строке в заглавную
export function firstUpperLetter (str , space = false) {
  if (!str) {
    console.error(`Строка не найдена`);
    return;
  };

  let pos;
  for (let i = 0; i < str.length; i++) {
    if (str[i] != " ") {
      pos = i;
      break;
    }
  }
  str = str.slice(0, pos) + str[pos].toUpperCase(pos) + str.slice(pos + 1);
  if (space) {
    return str;
  } else {
    return str.trim();
  }
}

// Возврат случайного числа от min до max (не включая max), при integer вовзращает целые числа
export function getRandom(min, max , integer = false) {
  try {
    if (!isNumber(min)) {
      throw new NumericError(` Аргумент min не является числом`, min)
    }
    
    if (!isNumber(max)) {
      throw new NumericError(` Аргумент max не является числом`, max)
    }
  
    if (min > max) {
      throw new NumericOverflowError(` Минимальное значение больше максимального`)
    }
  } catch (e) {
    if (e instanceof NumericError) {
      console.error(e.name + ": " + e.message + "\nЗначение аргумента = "+ e.property);
    } else if (e instanceof NumericOverflowError) {
      console.error(e);
    } else {
      throw e;
    }
    return;
  }
    min = +min;
    max = +max; 
    let rand = min + Math.random() * (max - min);
    if (integer) {
      rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    } else {
      return rand;
    }
  
  
}

// Возвращает истину если перменная равна числу, ложь при ` "", тексте, NaN, undefiend, infinity, -infinity`
export function isNumber(num) {
  try {
    switch (typeof num) {
      case "string":
        if (num.trim() === "" || num.trim() === "Infinity") {
          return false;
        }
        return (typeof +num == "number") ? !isNaN(+num) : false;
      case "boolean":
        return false;
      case "number":
        if (isFinite(num)) {
          return true;
        } else if (num === 0) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  } catch (e) {
    console.log(e);
  }
  
}

// возвращает высоту экрана браузера.
export function getScrollHeight() {
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  )

  return scrollHeight;
}
// Маска для телефона в inputy[type="tel"]
export function maskPhone(masked = '+7 ___ ___-__-__') {
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
    elem.placeholder = "+7 ___ ___-__-__";
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}






















// Пользовательские ошибки

//"Абстрактный" класс для наследование другими пользовательскими ошибками 
class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // присваивание имени ошибки именем класса ошибки
  }
}

export class NumericError extends UserError {
  constructor(message, property = NaN) {
    super(message);
    if (property == "") {
      this.property = NaN;
    } else { 
      this.property = property;
    }
    
  }
}

export class NumericOverflowError extends UserError {
  constructor(message) {
    super(message);
  }
}

export class StringError extends UserError {
  constructor(message, property = "") {
    super(message);
    this.property = property;
  }
}
