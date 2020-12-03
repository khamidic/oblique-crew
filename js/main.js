const headerSticky = document.querySelector('.js-sticky');
const heroSection = document.querySelector('.js-hero');

const heroSectionOptions = {};

const heroSectionObserver = new IntersectionObserver(function (entries, heroSectionObserver) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      headerSticky.style.transform = "translateY(-84px)";
    } else {
      headerSticky.style.transform = "translateY(0)";
    }
  })
}, heroSectionOptions);

heroSectionObserver.observe(heroSection);

let letsTalk = document.querySelectorAll('.js-lets-talk');
let inclusiveHand = ['👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

letsTalk.forEach(item => {
  item.addEventListener('mouseover', () => {
    let letsTalkHand = item.querySelector('.link-icon--lets-talk');
    letsTalkHand.innerHTML = inclusiveHand[getRandomInt(5)];
  })
});

let matchMediaFlag = false;
function heroGifMaker () {
  if (matchMediaFlag === true) {
    let spanedText = document.querySelector('.js-heading-hero').querySelector('.heading-hero__underline');
    let designersSpan = document.querySelector('.js-designers');
    let developersSpan = document.querySelector('.js-developers');
    let gifDesign = document.querySelector('.js-gif-design');
    let gifDevelopment = document.querySelector('.js-gif-development');
    let borderBottom = document.querySelector('.js-bottom');

    function opacityChanger(state, objectToChange, gifToShow, borderWidth) {
      if (state === 'enter') {
        anime({
          targets: ['.js-optext', objectToChange],
          opacity: 0.2,
          duration: 500,
          easing: 'cubicBezier(0.76, 0, 0.24, 1)'
        });
        anime({
          targets: gifToShow,
          scale: [0, 1],
          duration: 500,
          easing: 'cubicBezier(0.76, 0, 0.24, 1)'
        });
        anime({
          targets: borderBottom,
          scaleX: borderWidth,
          duration: 500,
          begin: function (anim) {
            if (gifToShow === gifDesign)
              borderBottom.style.transformOrigin = "left";
            else
              borderBottom.style.transformOrigin = "right";
          },
          easing: 'cubicBezier(0.76, 0, 0.24, 1)'
        })
      } else {
        anime({
          targets: ['.js-optext', objectToChange],
          opacity: [0.2, 1],
          duration: 500,
          easing: 'cubicBezier(0.76, 0, 0.24, 1)'
        });
        anime({
          targets: gifToShow,
          scale: [1, 0],
          duration: 500,
          easing: 'cubicBezier(0.76, 0, 0.24, 1))'
        });
        anime({
          targets: borderBottom,
          scaleX: 1,
          duration: 500,
          easing: 'cubicBezier(0.76, 0, 0.24, 1))'
        })
      }
    }

    designersSpan.addEventListener('mouseout', () => opacityChanger('leave', developersSpan, gifDesign, designersSpan.offsetWidth / spanedText.offsetWidth));
    designersSpan.addEventListener('mouseover', () => opacityChanger('enter', developersSpan, gifDesign, designersSpan.offsetWidth / spanedText.offsetWidth));

    developersSpan.addEventListener('mouseout', () => opacityChanger('leave', designersSpan, gifDevelopment, developersSpan.offsetWidth / spanedText.offsetWidth));
    developersSpan.addEventListener('mouseover', () => opacityChanger('enter', designersSpan, gifDevelopment, developersSpan.offsetWidth / spanedText.offsetWidth));
  }
}


const mql = window.matchMedia('(max-width:1080px)');
window.onload = () => {
  if(mql.matches) {
    matchMediaFlag = false;
    document.querySelectorAll('.hero-link').forEach(item => {
      item.setAttribute("href", "");
    })
  }
  else {
    matchMediaFlag = true;
    heroGifMaker();
  }
};
