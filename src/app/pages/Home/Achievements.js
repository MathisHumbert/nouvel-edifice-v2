import Component from "../../classes/Component";
import AchievementsMedia from "./AchievementsMedia";
import { each, getOffset, map } from "../../utils/dom";
import { events } from "../../utils/events";
import { lerp } from "../../utils/math";

export default class Achievements extends Component {
  constructor() {
    super({
      element: ".home__achievements",
      elements: {
        slider: ".home__achievements__list",
        items: null,
        prevButton: ".home__achievements__prev",
        nextButton: ".home__achievements__next",
      },
    });

    this.elements.items = this.element.querySelectorAll(
      ".home__achievements__item"
    );

    this.createMedias();

    this.scroll = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
    this.containerWidth = 0;
    this.itemWidth = 0;
    this.index = 0;
    this.total = this.elements.items.length;
  }

  createMedias() {
    this.medias = map(this.elements.items, (item) => {
      const mediaElement = item.querySelector(".home__achievements__medias");

      if (mediaElement) {
        return new AchievementsMedia({ element: mediaElement });
      }

      return null;
    });
  }

  resizeMedias() {
    each(this.medias, (media) => {
      if (media && media.onResize) {
        media.onResize();
      }
    });
  }

  onResize() {
    this.containerWidth = this.elements.slider.clientWidth;
    this.itemWidth = this.elements.items[0].clientWidth;

    each(this.elements.items, (item) => {
      item.style.transform = `translate3d(0, 0, 0)`;

      const offset = getOffset(item);
      item.offset = { ...offset };
      item.extra = 0;
    });
  }

  update() {
    if (!this.containerWidth || this.total < 2) return;

    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    each(this.elements.items, (item) => {
      const position = -this.scroll.current - item.extra;
      const offset = position + item.offset.left + item.offset.width;

      item.isBefore = offset < 0;
      item.isAfter = offset > this.containerWidth;

      if (item.isBefore) {
        item.extra -= this.containerWidth;
        item.isBefore = false;
        item.isAfter = false;
      }
      if (item.isAfter) {
        item.extra += this.containerWidth;
        item.isBefore = false;
        item.isAfter = false;
      }

      item.style.transform = `translate3d(${Math.round(position)}px, 0, 0)`;
    });
  }

  addEventListeners() {
    this.elements.nextButton.addEventListener("click", () => {
      if (this.total > 1) {
        this.scroll.target += this.itemWidth;
      }

      this.resizeMedias();
    });
    this.elements.prevButton.addEventListener("click", () => {
      if (this.total > 1) {
        this.scroll.target -= this.itemWidth;
      }

      this.resizeMedias();
    });

    events.on("resize", this.onResize);
    events.on("update", this.update);
  }

  removeEventListeners() {
    this.elements.nextButton.addEventListener("click", () => {
      if (this.total > 1) {
        this.scroll.target += this.itemWidth;
      }
    });
    this.elements.prevButton.addEventListener("click", () => {
      if (this.total > 1) {
        this.scroll.target -= this.itemWidth;
      }
    });

    events.off("resize", this.onResize);
    events.off("update", this.update);

    each(this.medias, (media) => {
      if (media && media.removeEventListeners) {
        media.removeEventListeners();
      }
    });
  }
}
