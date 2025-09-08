import Page from "../../classes/Page";

import Achievements from "./Achievements";
import Investment from "./Investment";
import Manifesto from "./Manifesto";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      classes: { active: "home--active" },
      element: ".home",
      elements: {
        navVideo: ".home__nav__video",
        navIcon: ".home__nav__icon",
      },
    });
  }

  /**
   * Create.
   */
  create() {
    super.create();

    this.manifesto = new Manifesto();
    this.achievements = new Achievements();
    this.investment = new Investment();

    this.elements.navVideo.addEventListener("ended", () => {
      gsap.to(this.elements.navVideo, {
        opacity: 0,
        ease: "expo.out",
        duration: 1.2,
      });
      gsap.to(this.elements.navIcon, {
        opacity: 1,
        ease: "expo.out",
        duration: 1.2,
      });
    });
  }

  /**
   * Animations.
   */
  show() {
    let tl = null;

    return super.show(tl);
  }

  hide() {
    let tl = null;

    return super.hide(tl);
  }

  /**
   * Events
   */
  onResize(event) {
    super.onResize(event);
  }

  /**
   * Listeners.
   */
  addEventListeners() {
    this.manifesto.addEventListeners();
    this.achievements.addEventListeners();
    this.investment.addEventListeners();

    super.addEventListeners();
  }

  removeEventListeners() {
    this.manifesto.removeEventListeners();
    this.achievements.removeEventListeners();
    this.investment.removeEventListeners();

    super.removeEventListeners();
  }

  /**
   * Loop.
   */
  update(event) {
    super.update(event);
  }
}
