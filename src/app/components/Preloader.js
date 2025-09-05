import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";

import Component from "../classes/Component";
import { events } from "../utils/events";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
    });
  }

  /**
   * Events.
   */
  preloadPage(content) {
    const preloadImages = new Promise((res) => {
      imagesLoaded(content, { background: true }, res);
    });

    const preloadFonts = this.loadFonts();

    const preloaderAnimation = this.animatePreloader();

    Promise.all([preloadImages, preloadFonts, preloaderAnimation]).then(() => {
      if (this.element) {
        this.element.parentNode.removeChild(this.element);
      }

      events.emit("loaded");
    });
  }

  loadPage(content) {
    const loadImages = new Promise((res) => {
      imagesLoaded(content, { background: true }, res);
    });

    return new Promise((res) => {
      loadImages.then(() => {
        res();
      });
    });
  }

  loadFonts() {
    const satoshiFont = new FontFaceObserver("ARS Maquette Pro");

    return Promise.all([satoshiFont.load()]);
  }

  /**
   * Animations.
   */
  animatePreloader() {
    return new Promise(async (res) => {
      res();
    });
  }
}
