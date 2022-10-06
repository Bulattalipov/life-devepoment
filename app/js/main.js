(function ($) {
  jQuery.fn.lightTabs = function (options) {

    var createTabs = function () {
      tabs = this;
      i = 0;

      initialShowPage = function () {
        $(tabs).children("div").children("div").hide();
        $(tabs).children("ul").children("li").children('a').removeClass("active");
      }

      initialShowPage();

      showPage = function (i) {
        $(tabs).children("div").children("div").hide();
        $(tabs).children("div").children("div").eq(i).show();
        $(tabs).children("ul").children("li").children('a').removeClass("active");
        $(tabs).children("ul").children("li").children('a').eq(i).addClass("active");
      }

      noShowPage = function () {
        $(tabs).children("div").children("div").hide();
        $(tabs).children("ul").children("li").children('a').removeClass("active");
      }

      $(tabs).children("ul").children("li").children('a').each(function (index, element) {
        $(element).attr("data-page", i);
        i++;
      });

      $(tabs).children("ul").children("li").children('a').mouseenter(function () {
        showPage(parseInt($(this).attr("data-page")));
      });

      $(tabs).children("ul").children("li").children('a').mouseleave(function () {
        noShowPage();
      });
    };
    return this.each(createTabs);
  };
})(jQuery);


$(document).ready(function () {
  $(".banner__tabs").lightTabs();

  $('.slider__video').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 700,
    asNavFor: '.banner__slider'
  });
  $('.banner__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider__video',
    speed: 700,
    fade: true,
    centerMode: true,
    focusOnSelect: true,
    prevArrow: '<button type="button" class="slick-prev"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.42 16.59L10.83 12L15.42 7.41L14 6L8 12L14 18L15.42 16.59Z" fill="white"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.58 16.59L13.17 12L8.58 7.41L10 6L16 12L10 18L8.58 16.59Z" fill="white"/></svg></button>'
  });


  function rangeSquare() {
    var $range = $(".js-range-slider"),
      $inputFrom = $(".js-input-from"),
      $inputTo = $(".js-input-to"),
      instance,
      min = 32,
      max = 186,
      from = 32,
      to = 186;

    $range.ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: 32,
      to: 186,
      onStart: updateInputs,
      onChange: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;

      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
      var val = $(this).prop("value");

      // validate
      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }

      instance.update({
        from: val
      });
    });

    $inputTo.on("input", function () {
      var val = $(this).prop("value");

      // validate
      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        to: val
      });
    });
  }

  rangeSquare();



  function rangePrice() {
    var $range = $(".price-range-slider"),
      $inputFrom = $(".price-input-from"),
      $inputTo = $(".price-input-to"),
      instance,
      min = 1.5,
      max = 17.5,
      from = 1.5,
      to = 17.5;

    $range.ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: 1.5,
      to: 17.5,
      onStart: updateInputs,
      onChange: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;

      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
      var val = $(this).prop("value");

      console.log(val);

      // validate
      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }

      instance.update({
        from: val
      });
    });

    $inputTo.on("input", function () {
      var val = $(this).prop("value");

      // validate
      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        to: val
      });
    });
  }

  rangePrice();





  $('.calculator-complex__select').styler();


});





/*Кнопка меню*/

const menuBtn = document.querySelector('.header__btn');
const menuModal = document.querySelector('.menu-modal');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('header__btn--active');
  menuModal.classList.toggle('active');
})




const calculatorBtn = document.querySelector('.calculator__box-btn');
const calculatorForm = document.querySelector('.calculator__form');

calculatorBtn.addEventListener('click', () => {
  calculatorForm.classList.toggle('active');
})





/*Spinner кольцо*/

class ProgressRing extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute('stroke');
    const radius = this.getAttribute('radius');
    const normalizedRadius = radius - stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;

    this._root = this.attachShadow({
      mode: 'open'
    });
    this._root.innerHTML = `
      <svg
        height="${radius * 2}"
        width="${radius * 2}"
       >
         <circle
           stroke="white"
           stroke-dasharray="${this._circumference} ${this._circumference}"
           style="stroke-dashoffset:${this._circumference}"
           stroke-width="${stroke}"
           fill="transparent"
           r="${normalizedRadius}"
           cx="${radius}"
           cy="${radius}"
        />
      </svg>

      <style>
        circle {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      </style>
    `;
  }

  setProgress(percent) {
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this._root.querySelector('circle');
    circle.style.strokeDashoffset = offset;
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }
}

window.customElements.define('progress-ring', ProgressRing);

// emulate progress attribute change
let progress = 0;
const el = document.querySelector('progress-ring');

const interval = setInterval(() => {
  progress += 10;
  el.setAttribute('progress', progress);
  if (progress === 100)
    clearInterval(interval);
}, 800);


