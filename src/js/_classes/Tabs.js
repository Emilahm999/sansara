import ActiveClass from "./ActiveClass.js";

export default class Tabs {
  /*
  tabs, content - либо массив элементов, либо имена классов элемента
  tabClassActive, contentClassActive - Наименование классов активности
  tabExistActive, contentExistActive - Булеан значение по которому будет определяться когда элемент активен:
    true - когда имеет класс;
    false - Когда класс отсутствует
  */
  constructor ({
    tabs, 
    content, 
    tabClassActive = "active", 
    tabExistActive = true, 
    contentClassActive = "active", 
    contentExistActive = true,
    nextTabClass,
    prevTabClass,
  }) {
    this._length = 0;
    this._tabClassActive = tabClassActive;
    this._tabExistActive = tabExistActive;
    this._contentClassActive = contentClassActive;
    this._contentExistActive = contentExistActive;
    this._currentIndex = 0;
    this._nextNavElements;
    this._tabElements = [];
    this._contentElements = [];
    
    if (nextTabClass) {
      this._nextNavElements = document.querySelectorAll(nextTabClass);
    }

    if (prevTabClass) {
      this._prevNavElements = document.querySelectorAll(prevTabClass);
    }

    // Проверяем что переданно массивы элементов или наименование классов, если разное или не подходящие, то выбрасываем ошибку
    if ( Array.isArray(tabs) && Array.isArray(content) ) {
      this._length = Math.min( tabs.length, content.length );
      tabs.forEach((tab, index) => {
        this._tabElements.push(new ActiveClass({
          element: tab,
          className: this._tabClassActive,
          active: (index == 0 && tabExistActive) ? true : (index != 0 && !tabExistActive) ? true : false,
        }))
      });
      content.forEach((content, index) => {
        this._contentElements.push(new ActiveClass({
          element: content,
          className: this._contentClassActive,
          active: (index == 0 && contentExistActive) ? true : (index != 0 && !this._contentExistActive) ? true : false,
        }))
      });
    } else if ( typeof tabs == "string" && typeof content == "string" ) {
      let elements = document.querySelectorAll(tabs)
      elements.forEach((tab, index) => {
        this._tabElements.push(new ActiveClass({
          element: tab,
          className: this._tabClassActive,
          active: (index == 0 && tabExistActive) ? true : (index != 0 && !tabExistActive) ? true : false,
        }))
      });
      elements = document.querySelectorAll(content)
      elements.forEach((content, index) => {
        this._contentElements.push(new ActiveClass({
          element: content,
          className: this._contentClassActive,
          active: (index == 0 && contentExistActive) ? true : (index != 0 && !this._contentExistActive) ? true : false,
        }))
      });
      console.log(this._tabElements, this._contentElements);
      this._length = Math.min( this._tabElements.length, this._contentElements.length );
    } else {
      throw new Error('Переданные не верные данные. Либо только массивы html элементов, либо только наименования классов')
    }


    if (this._length > 0) {



      for (let i = 0; i < this._length; i++) {
        this._tabElements[i].element.addEventListener("click", this._activeTabs.bind(this, i))
      }


      if (this._nextNavElements) {
          for (const nextButton of Object.values(this._nextNavElements)) {
          nextButton.addEventListener("click", () => {
            this._activeTabs(this._currentIndex + 1)
          })
        }
      }

      if (this._prevNavElements) {
        for (const prevButton of Object.values(this._prevNavElements)) {
          prevButton.addEventListener("click", () => {
            this._activeTabs(this._currentIndex - 1)
          })
        }
      }
    }

  }
  // удаление активных класов
  _clearTabs() {
    this._tabElements.forEach(tab => {
      if (this._tabExistActive) {
        tab.active = false;
      } else {
        tab.active = true;
      }
    });

    this._contentElements.forEach(content => {
      if (this._contentExistActive) {
        content.active = false;
      } else {
        content.active = true
      }
    })
  }

  _activeTabs(index) {
    // если выходит за диапазоны массива элементов, то ничего не происходит
    if (index > this._length - 1 || index < 0) {
      return
    }
    this._clearTabs();
    // Проверка при каком состояние активен таб - отсутсвтие или присуствие класса
    if (this._tabExistActive) {
      this._tabElements[index].active = true;
    } else {
      this._tabElements[index].active = false;
    }
    // Проверка при каком состояние активен контент - отсутсвтие или присуствие класса
    if (this._contentExistActive) {
      this._contentElements[index].active = true;
    } else {
      this._contentElements[index].active = false;
    }

    this._currentIndex = index;
  }



  get currentIndex () {
    return this._currentIndex;
  }

  get length () {
    return this._length;
  }

  set currentIndex (value) {
    // Если передаваемое значение не число, то выкидываем ошибку
    if (typeof value != "number") {
      throw new Error("Индекс должен быть числом");
    }
    // проверка находиться ли значение в допустимом диапозоне контекнта
    if (value < 0 || value > this._length) {
      throw new Error("Некорректный индекс или индекс превышает длину массива табов")
    } else {
      this._currentIndex = value;
    }
    // меняем таб
    this._activeTabs(this._currentIndex);
  }
}