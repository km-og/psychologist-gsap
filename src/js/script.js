document.addEventListener("DOMContentLoaded", () => {
  animate();
});

function animate() {
  gsap.registerPlugin(ScrollTrigger);

  //   if (ScrollTrigger.isTouch === 1) {
  //     console.log("touch");
  //   } else {
  //     console.log("mouse");
  //   }

  //прелоадер и подпись в svg есть path
  const preloaderPath = document.querySelector("path");
  const svgPreload = document.querySelector("svg");
  const pathLength = preloaderPath.getTotalLength();

  gsap.set(svgPreload, {
    opacity: 0,
    strokeDasharray: pathLength, //свойство svg
    strokeDashoffset: pathLength,
  });

  const tlPreloader = gsap.timeline({});

  tlPreloader
    .to(".preloader__title", {
      opacity: 1,
    })
    .to(svgPreload, {
      opacity: 1,
    })
    .to(svgPreload, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.in",
    })
    .to(
      ".preloader",
      {
        duration: 0.6,
        xPercent: 100,
        ease: "power3.in",
      },
      "+=0.5"
    )
    .to(".preloader", {
      display: none, //когда есть прелоадер, который срабатывает один раз
    });

  gsap.set(".about__bg", {
    yPercent: 20,
  });
  gsap.set(".about__wrap", {
    yPercent: 200,
  });

  const tlPromo = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom+=100%",
      scrub: true,
      pin: true,
    },
  });
  tlPromo
    .to(".about__bg", {
      yPercent: 0,
    })
    .to(
      ".about__inner",
      {
        width: "100%",
        height: "100%",
      },
      "<"
    )
    .to(
      ".about__decor",
      {
        opacity: 0,
      },
      "<"
    )
    .to(
      ".about__wrap",
      {
        yPercent: 0,
      },
      "<"
    );

  // когда пинится что-то, высота должна быть хотя бы 100vh
  const tlAim = gsap.timeline({
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".aim",
      start: "top top",
      end: "bottom+=120%",
      pin: true,
      scrub: 1,
    },
  });
  tlAim
    .to(
      ".aim__first",
      {
        xPercent: -100,
      },
      "0.5"
    )
    .to(
      ".aim__second",
      {
        xPercent: -100,
      },
      "<"
    )
    .ftom(".aim__text", {
      autoAlpha: 0,
      yPercent: 100,
    })
    .ftom(".experience__item", {
      autoAlpha: 0,
      stagger: 0.2,
    })
    .to(".experience__border", {
      width: "100%",
    });

  //   // гринсокет позволяет менять элементы (текста, картинки, атрибуты)
  //   // как в примере ниже можно менять картинки (массив создать с картинками)
  //   const texts = ["Один", "Два", "три", "4", "5", "6", "7", "8"];
  //   const sections = document.querySelectorAll("section");
  //   sections.forEach((section, index) => {
  //     ScrollTrigger.create({
  //       trigger: section,
  //       start: "top center",
  //       end: "bottom center",
  //       //onEnter //когда вошли в анимацию
  //       //onLeave
  //       //onEnterBack //когда снова вошли в анимацию
  //       //onLeaveBack
  //       onEnter: () => {
  //         gsap.set(".fix", {
  //           innerText: texts[index], //текстовое содержимое внутри эл-та
  //           //attr: {src: texts[index]} //написать какой атрибут устанавливать
  //           //это если с картинками
  //         });
  //       },
  //       onEnterBack: () => {
  //         gsap.set(".fix", {
  //           innerText: texts[index], //текстовое содержимое внутри эл-та
  //         });
  //       },
  //     });
  //   });

  const tlEducation = gsap.timeline({ repeat: -1 }); //повторяем бесконечно
  tlEducation
    .from(".education__item", {
      duration: 1,
      yPercent: 100,
      autoAlpha: 0,
      stagger: 2, //sec
    })
    .to(
      ".education__item",
      {
        duration: 1,
        yPercent: -100,
        stagger: 2, //sec
      },
      2 //delay 2s = stagger
    );

  gsap.set(".training__item:first-child", {
    xPercent: 110,
  });
  gsap.set(".training__item:nth-child(2)", {
    xPercent: 120,
  });
  gsap.set(".training__item:nth-child(3)", {
    xPercent: 130,
  });
  gsap.set(".training__item:last-child", {
    xPercent: 140,
  });
  gsap.set(".training__title", {
    xPercent: 100,
  });

  //объединение двух таймлайнов в один
  const tlResults = gsap.timeline({ paused: true });
  tlResults
    .from(".results__item", {
      xPercent: 100,
      autoAlpha: 0,
      stagger: 1,
    })
    .to(
      ".results__item:not(:last-child)",
      {
        xPercent: -100,
        stagger: 1,
      },
      1
    );
  //можно переделать на горизонтальный скролл

  const tlTraining = gsap.timeline({ paused: true });
  tlTraining
    .to(".results", {
      xPercent: -100,
    })
    .to(
      ".training__item",
      {
        xPercent: 0,
      },
      "<"
    )
    .to(
      ".training__title",
      {
        xPercent: 0,
      },
      "<"
    );

  const tlMain = gsap.timeline();
  tlMain
    .to(tlResults, {
      duration: 0.8,
      progress: 1,
    })
    .to(tlTraining, {
      duration: 0.6,
      progress: 1,
      ease: "power3.in",
    });

  ScrollTrigger.create({
    animation: tlMain,
    trigger: ".double-section",
    start: "top top",
    end: `bottom+=${tlMain.duration() * 4000} bottom`,
    pin: true,
    scrub: 1, //цифра - отставание
  });

  gsap.to(".reviews", {
    yPercent: -110,
    scrollTrigger: {
      trigger: ".double-section2",
      start: "top top",
      end: "bottom+=70%",
      scrub: 1,
      pin: true,
    },
  });
}
