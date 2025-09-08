import Component from "../../classes/Component";

import { each, getOffset } from "../../utils/dom";
import { events } from "../../utils/events";
import { lerp } from "../../utils/math";

export default class AchievementsMedia extends Component {
  constructor({ element }) {
    super({
      element: element,
      elements: {
        slider: ".home__achievements__medias__inner",
        items: "figure",
        prevButton: ".home__achievements__medias_prev",
        nextButton: ".home__achievements__medias_next",
      },
    });

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

  onNextClick() {
    this.scroll.target += this.itemWidth;
  }

  update() {
    if (!this.containerWidth) return;

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
    this.elements.nextButton.addEventListener(
      "click",
      () => (this.scroll.target += this.itemWidth)
    );
    this.elements.prevButton.addEventListener(
      "click",
      () => (this.scroll.target -= this.itemWidth)
    );

    events.on("resize", this.onResize);
    events.on("update", this.update);
  }

  removeEventListeners() {
    this.elements.nextButton.removeEventListener(
      "click",
      () => (this.scroll.target += this.itemWidth)
    );
    this.elements.prevButton.removeEventListener(
      "click",
      () => (this.scroll.target -= this.itemWidth)
    );

    events.off("resize", this.onResize);
    events.off("update", this.update);
  }
}
