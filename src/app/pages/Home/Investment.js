import gsap from "gsap";
import Component from "../../classes/Component";
import { each } from "../../utils/dom";
import { easeOut, expoOut } from "../../utils/easing";

export default class Investment extends Component {
  constructor() {
    super({
      element: ".home__investment__list",
      elements: {
        items: ".home__investment__item",
        titles: ".home__investment__item h3",
      },
    });

    this.currentItem = 0;

    each(this.elements.items, (item) => {
      item.subListElement = item.querySelectorAll(".home__investment__sublist");
      item.descriptionElements = item.querySelectorAll(
        ".home__investment__subitem__description"
      );
      item.isOpen = false;

      item.headerElements = item.querySelectorAll(
        ".home__investment__subitem__header"
      );

      each(item.headerElements, (header) => (header.isOpen = false));

      gsap.set(item.subListElement, {
        height: 0,
        marginTop: 0,
      });
      gsap.set(item.descriptionElements, { height: 0, marginBottom: 0 });
    });
  }

  openSubList(item) {
    item.isOpen = true;
    item.children[0].children[0].textContent = "- ";
    gsap.to(item.subListElement, {
      height: "auto",
      marginTop: "3.2rem",
      ease: easeOut,
      duration: 0.5,
    });
  }

  closeSubList(item) {
    item.isOpen = false;
    item.children[0].children[0].textContent = "+ ";
    gsap.to(item.subListElement, {
      height: 0,
      marginTop: 0,
      ease: easeOut,
      duration: 0.5,
    });
  }

  openSubItem(header, description) {
    header.isOpen = true;
    header.children[1].textContent = "-";
    gsap.to(description, {
      height: "auto",
      marginBottom: "6.4rem",
      ease: easeOut,
      duration: 0.5,
    });
  }

  closeSubItem(header, description) {
    header.isOpen = false;
    header.children[1].textContent = "+";
    gsap.to(description, {
      height: 0,
      marginBottom: 0,
      ease: easeOut,
      duration: 0.5,
    });
  }

  addEventListeners() {
    each(this.elements.titles, (title, index) => {
      const item = this.elements.items[index];

      title.addEventListener("click", () => {
        if (item.isOpen) {
          this.closeSubList(item);
        } else {
          this.openSubList(item);
        }
      });

      each(item.headerElements, (header, headerIndex) => {
        const description = item.descriptionElements[headerIndex];

        header.addEventListener("click", () => {
          if (header.isOpen) {
            this.closeSubItem(header, description);
          } else {
            this.openSubItem(header, description);
          }
        });
      });
    });
  }

  removeEventListeners() {
    each(this.elements.titles, (title, index) => {
      const item = this.elements.items[index];

      title.removeEventListener("click", () => {
        if (item.isOpen) {
          this.closeSubList(item);
        } else {
          this.openSubList(item);
        }
      });

      each(item.headerElements, (header, headerIndex) => {
        const description = item.descriptionElements[headerIndex];

        header.removeEventListener("click", () => {
          if (header.isOpen) {
            this.closeSubItem(header, description);
          } else {
            this.openSubItem(header, description);
          }
        });
      });
    });
  }
}
