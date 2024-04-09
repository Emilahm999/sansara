// import { getMassThreshold } from "../script.js";



// let oldScrollTop = 0;


// let callbackScrollBlocksNext = (entries, observer) => {
//   entries.forEach(entry => {
//     let {isIntersecting, target} = entry;

//     if (isIntersecting) {
//       console.log(entry);
//       // scrollNextBlock(target);
//     }
//   })
// }


// document.addEventListener("DOMContentLoaded", () => {
//   // // Инициализация 
//   // let observerScrollBlock = new IntersectionObserver(callbackScrollBlocksNext, {
//   //   threshold: getMassThreshold([0,20]),
//   // });

//   // let scrollBlocks = document.querySelectorAll(".scroll-block");
//   // scrollBlocks.forEach(block => {
//   //   observerScrollBlock.observe(block);
//   // })


  
// })

// document.addEventListener("scroll", initScroll);






// function initScroll() {
//   let scrollTop = document.documentElement.scrollTop / 2 ;
//   let block = document.elementFromPoint(0, scrollTop);

//   let test = document.querySelector(".test");
//   console.log(test, scrollTop)

//   if (block == null) {
//     return;
//   }
  
//   if (scrollTop > oldScrollTop) {
//     scrollNextBlock(block);
//   } else {
//     scrollPrevBlock(block);
//   }
//   oldScrollTop = scrollTop;

// }



























// // function scrollPrevBlock(currentBlock) {
// //   let prevBlock = currentBlock.previousElementSibling;

// //   if (prevBlock && prevBlock.classList.contains("scroll-block")) {
// //     document.removeEventListener("scroll", initScroll);
    
// //     prevBlock.scrollIntoView();


// //   }
// // }

// // function scrollNextBlock(block) {

// //   if (block && block.classList.contains("scroll-block")) {
    
// //     block.scrollIntoView();
// //   }
// // }

// function scrollPrevBlock(currentBlock) {
//   let prevBlock = currentBlock.previousElementSibling;

//   if (prevBlock && prevBlock.classList.contains("scroll-block")) {
//     document.removeEventListener("scroll", initScroll);
    
//     prevBlock.scrollIntoView();
//     setTimeout(() => {
//       document.addEventListener("scroll", initScroll);
      
//     }, 500);
//   }
// }

// function scrollNextBlock(currentBlock) {
//   let nextBlock = currentBlock.nextElementSibling;

//   if (nextBlock && nextBlock.classList.contains("scroll-block")) {
//     document.removeEventListener("scroll", initScroll);
    
//     nextBlock.scrollIntoView();

//     setTimeout(() => {
//       document.addEventListener("scroll", initScroll);
      
//     }, 500);

//   }
// }