import gsap from "gsap";

import Component from "../classes/Component";
import { lenis } from "../classes/Lenis";
import { expoOut } from "../utils/easing";
import { events } from "../utils/events";
import { each, getOffset } from "../utils/dom";
import { lerp } from "../utils/math";

export default class Slider extends Component {
  constructor() {
    super({
      element: ".slider",
      elements: {
        medias: ".slider__medias",
        items: ".slider__items",
        images: null,
        prevButton: ".slider__prev",
        nextButton: ".slider__next",
      },
    });

    this.scroll = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
    this.containerWidth = 0;
    this.itemWidth = 0;

    this.addEventListeners();
  }

  closeSlider() {
    gsap.to(this.element, {
      opacity: 0,
      duration: 0.7,
      ease: expoOut,
      onComplete: () => {
        lenis.start();

        gsap.set(this.element, {
          display: "none",
        });

        this.elements.images = null;
        this.scroll = {
          current: 0,
          target: 0,
          ease: 0.1,
        };
        this.itemWidth = 0;
      },
    });
  }

  showSlider(images) {
    lenis.stop();

    this.elements.items.innerHTML = "";

    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.url;
      img.alt = image.alt;
      img.classList.add("slider__image");

      this.elements.items.appendChild(img);
    });

    this.elements.images = this.element.querySelectorAll(".slider__image");

    gsap.set(this.element, {
      display: "flex",
    });
    gsap.to(this.element, {
      opacity: 1,
      duration: 0.7,
      ease: expoOut,
    });

    this.onResize();
  }

  onResize() {
    if (this.elements.images === null) return;

    this.containerWidth = this.elements.items.clientWidth;
    this.itemWidth = this.elements.images[0].clientWidth;

    each(this.elements.images, (image) => {
      image.style.transform = `translate3d(0, 0, 0)`;

      const offset = getOffset(image);
      image.offset = { ...offset };
      image.extra = 0;
    });
  }

  update() {
    if (!this.containerWidth || this.elements.images === null) return;

    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    each(this.elements.images, (image) => {
      const position = -this.scroll.current - image.extra;
      const offset = position + image.offset.left + image.offset.width;

      image.isBefore = offset < 0;
      image.isAfter = offset > this.containerWidth;

      if (image.isBefore) {
        image.extra -= this.containerWidth;
        image.isBefore = false;
        image.isAfter = false;
      }
      if (image.isAfter) {
        image.extra += this.containerWidth;
        image.isBefore = false;
        image.isAfter = false;
      }

      image.style.transform = `translate3d(${Math.round(position)}px, 0, 0)`;
    });
  }

  /***
   * Listeners.
   */
  addEventListeners() {
    this.elements.nextButton.addEventListener("click", () => {
      if (this.elements.images !== null) {
        this.scroll.target += this.itemWidth;
      }
    });

    this.elements.prevButton.addEventListener("click", () => {
      if (this.elements.images !== null) {
        this.scroll.target -= this.itemWidth;
      }
    });

    this.element.addEventListener("click", (e) => {
      if (e.target == this.element) {
        this.closeSlider();
      }
    });

    events.on("show_slider", this.showSlider);
    events.on("resize", this.onResize);
    events.on("update", this.update);
  }
}
