import gsap from "gsap";

import Component from "../classes/Component";

import { lenis } from "../classes/Lenis";
import { each } from "../utils/dom";
import { events } from "../utils/events";
import { easeOut } from "../utils/easing";

export default class Menu extends Component {
  constructor(page) {
    super({
      element: ".menu",
      elements: {
        list: ".menu__links",
        links: ".menu__link a",
        close: ".menu__close",
        open: document.querySelector(".home__menu"),
      },
    });

    this.isBurgerVisible = false;

    this.addEventListeners();
  }

  show() {
    lenis.stop();

    gsap.set(this.element, {
      opacity: 0,
      display: "block",
    });

    gsap.to(this.element, { opacity: 1, duration: 0.7, ease: easeOut });
  }

  hide(anchors) {
    gsap.to(this.element, {
      opacity: 0,
      duration: 0.7,
      ease: easeOut,
      onComplete: () => {
        gsap.set(this.element, {
          display: "none",
        });

        lenis.start();

        if (anchors) {
          lenis.scrollTo(anchors);
        }
      },
    });
  }

  addEventListeners() {
    this.elements.open.addEventListener("click", () => this.show());
    this.elements.close.addEventListener("click", () => this.hide());

    each(this.elements.links, (link) => {
      const url = new URL(link.href);
      const fragment = url.hash;
      link.addEventListener("click", () => this.hide(fragment));
    });

    events.on("lenis", ({ scroll }) => {
      if (!this.isBurgerVisible && scroll > 200) {
        this.isBurgerVisible = true;
        this.elements.open.classList.add("visible");
      }

      if (this.isBurgerVisible && scroll < 200) {
        this.isBurgerVisible = false;
        this.elements.open.classList.remove("visible");
      }
    });
  }
}
