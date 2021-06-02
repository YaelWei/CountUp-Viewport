// import { CountUp } from '/countUp.min.js';


// var countUp = new CountUp('target', 0, 5000);
// var countUps = new CountUp('targets', 0, 2000);
// var number3 = new CountUp('number3', 0, 22000);
// var number4 = new CountUp('number4', 0, 12000);
// var number4 = new CountUp('number5', 0, 12000);

// console.log(countUp.start());

function isVisibleInViewport(element) {
  const rect = element.getBoundingClientRect();
  const { top, bottom, left, right } = rect;
  return top >= 0
    && bottom <= window.innerHeight
    && left >= 0
    && right <= window.innerWidth;
}
// forEach;
// map - transforms each element in the array
// reduce - combine elements into a single result : [ 1 , 2 , 3] = 6
// filter - condition to remove elements from the array
// Array.from - make collection into array, ex querySelectorAll returns HTMLCollection which is NOT an array so use Array.from

function startCount(number) {
  if (!number.hasCountedUp && isVisibleInViewport(number.element)) {
    number.hasCountedUp = true;
    number.counter.start();
    // number.element.classList.add('animate__animated', 'animate__fadeInRight');
  }
}

function fadeInUp(animatedObject) {
  animatedObject.hasFaded = true;
  animatedObject.element.classList.add('animate__animated', 'animate__fadeInUp');
}

function animateDollarInBox(animationObject) {
  const dollarSpan = animationObject.element.querySelector("span[data-animation-fadeup-trigger]");
  if (!animationObject.hasFaded && isVisibleInViewport(dollarSpan)) {
    animationObject.element.style.visibility = "visible";
    fadeInUp(animationObject);
  }
}

function main() {
  const elementsToFadeInRight = Array
    .from(document.querySelectorAll("li[data-animation-fadeup]"))
    .map(element => ({ hasFaded: false, element: element }));

  const elementsToCountUp = Array
    .from(document.querySelectorAll('.demo'))
    .map(element => {
      const startingNumber = parseInt(element.textContent);//use parseFloat for decimals
      const finalNumber = parseInt(element.dataset.finalNumber);
      const numberObject = {
        hasCountedUp: false,
        element: element,
        counter: new CountUp(element.id, startingNumber, finalNumber)
      }
      return numberObject;
    });

  // Check initially when the program starts.
  elementsToCountUp.forEach(startCount);
  elementsToFadeInRight.forEach(animateDollarInBox);

  // Check when the user begins to scroll.
  window.addEventListener('scroll', () => {
    elementsToCountUp.forEach(startCount);
    elementsToFadeInRight.forEach(animateDollarInBox);
  });
}

main();
