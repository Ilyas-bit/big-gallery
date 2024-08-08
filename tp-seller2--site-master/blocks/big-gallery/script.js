window.addEventListener("load", () => {
  document.querySelectorAll(".slr2-big-gallery .swiper").forEach((swiper) => {
    const slides = swiper.querySelectorAll(".swiper-slide");

    if (slides.length <= 1) {
      // Если слайд только один, отключаем прокрутку, автопрокрутку и скрываем элементы управления
      swiper.querySelector(".swiper-pagination").style.display = "none";
      swiper.querySelector(".swiper-button-prev").style.display = "none";
      swiper.querySelector(".swiper-button-next").style.display = "none";
      if (swiper.querySelector(".swiper-timer")) {
        swiper.querySelector(".swiper-timer").style.display = "none";
      }

      // Убираем прелоадер
      swiper.querySelectorAll(".swiper-lazy-preloader").forEach((preloader) => {
        preloader.style.display = "none";
      });

      return;
    }

    let delay = 1 * swiper.getAttribute("data-delay");
    let timer = swiper.querySelector(".swiper-timer");

    new Swiper(swiper, {
      // Основные параметры
      loop: true,
      lazy: {
        loadPrevNext: true,
      },
      autoplay: {
        delay: delay,
        disableOnInteraction: false,
      },

      // Пагинация
      pagination: {
        el: ".swiper-pagination",
      },

      // Кнопки навигации
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // Полоса прокрутки
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      on: {
        afterInit: () => {
          // Устанавливаем время анимации в зависимости от атрибута задержки
          let swiperId = swiper
            .querySelector(".swiper-wrapper")
            .getAttribute("id");
          let styleTag = document.createElement("style");
          styleTag.textContent = `
          .slr2-big-gallery #${swiperId} ~ .swiper-timer--animate {
            -webkit-transition-duration: ${delay}ms;
            transition-duration: ${delay}ms;
          }
        `;
          document.head.appendChild(styleTag);
        },
        transitionStart: () => {
          if (!timer) return;
          timer.classList.remove("swiper-timer--animate");
          timer.style.width = "0";
        },
        transitionEnd: () => {
          if (!timer) return;
          timer.classList.add("swiper-timer--animate");
          timer.style.width = "100%";
        },
      },
    });
  });
});
