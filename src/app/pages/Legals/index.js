import Page from "../../classes/Page";

export default class Legals extends Page {
  constructor() {
    super({
      id: "legals",
      classes: { active: "legals--active" },
      element: ".legals",
      elements: {},
    });
  }

  /**
   * Create.
   */
  create() {
    super.create();
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
    super.addEventListeners();
  }

  removeEventListeners() {
    super.removeEventListeners();
  }

  /**
   * Loop.
   */
  update(event) {
    super.update(event);
  }
}
