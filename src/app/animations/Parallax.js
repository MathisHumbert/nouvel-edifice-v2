import gsap from "gsap";

import Animation from "../classes/Animation";

export default class Parallax extends Animation {
  constructor({ element }) {
    super({ element, elements: {} });

    this.tween = null;
  }

  createAnimation() {
    const image = this.element.children[0];

    gsap.set(image, {
      willChange: "transform",
      width: "calc(100% + 10%)",
      height: "calc(100% + 10%)",
      left: "-5%",
    });

    gsap.fromTo(
      image,
      {
        yPercent: -10,
      },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: this.element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    super.createAnimation();
  }

  animateIn() {
    super.animateIn();
  }

  animateOut() {
    super.animateOut();
  }
}
