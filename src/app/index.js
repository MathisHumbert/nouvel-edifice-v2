import "../styles/index.scss";
import "./utils/scroll";
import "./classes/WindowEvents";
import "./classes/Gsap";

import AutoBind from "auto-bind";
import { ScrollTrigger } from "gsap/all";
import Stats from "stats.js";

import Router from "./classes/Router";

import Preloader from "./components/Preloader";
import Grid from "./components/Grid";

import Home from "./pages/Home";
import Legals from "./pages/Legals";

import { events } from "./utils/events";

class App {
  constructor() {
    AutoBind(this);

    this.url = window.location.pathname;
    this.lastUrl = window.location.pathname;
    this.isNavigating = true;

    if (import.meta.env.MODE === "development") {
      this.createStats();
      this.createGrid();
    }

    this.init();
  }

  init() {
    this.createPages();
    this.createRouter();
    this.createPreloader();

    this.addEventListeners();

    this.update();
  }

  /**
   * Create.
   */
  createPages() {
    this.pages = {
      home: new Home(),
      legals: new Legals(),
    };

    this.templates = {
      "/": "home",
      "/legals": "legals",
    };

    if (this.url !== "/" && this.url.endsWith("/")) {
      this.url = this.url.slice(0, -1);
    }

    this.template = this.templates[this.url];
    this.page = this.pages[this.template];

    this.page.set();
  }

  createRouter() {
    this.router = new Router(this);
  }

  createPreloader() {
    this.preloader = new Preloader();

    this.preloader.preloadPage(this.page.element);

    events.on("loaded", this.onPreloaded);
  }

  createStats() {
    this.stats = new Stats();

    this.stats.showPanel(0);

    document.body.appendChild(this.stats.dom);
  }

  createGrid() {
    this.grid = new Grid();
  }

  /**
   * Events.
   */
  async onPreloaded() {
    this.page.createPageLoader();

    const waitPageShow = this.page.show(null);

    events.emit("resize");

    await Promise.all([waitPageShow]);

    this.router.onPreloaded();
  }

  /**
   * Loop.
   */
  update() {
    if (this.stats) {
      this.stats.begin();
    }

    if (this.stats) {
      this.stats.end();
    }

    ScrollTrigger.update();
  }

  /***
   * Listeners.
   */
  addEventListeners() {
    events.on("update", this.update.bind(this));
  }
}

new App();
