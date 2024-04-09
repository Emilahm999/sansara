import ActiveClass from "./ActiveClass.js";
export default class ObserverClass {

  _activeClass = "active";
  _options = {}

  _callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        new ActiveClass({element: this._element, className: this._activeClass})
        observer.unobserve(entry.target)
      }
    })
  }

  constructor (block, element, options = null) {
    if (block.nodeType == 1) {
      this._watcherBlock = block;      
    } else {
      this._watcherBlock = document.querySelector(block);
    }

    if (options?.threshold) {
     this._options.threshold = options.threshold 
    }


    if ( element.nodeType == 1) {
      this._element = element;
    } else {
      this._element = this._watcherBlock.querySelector(element);
    }

    this._observer = new IntersectionObserver(this._callback, this._options);

    this._observer.observe(this._watcherBlock)
  } 

}