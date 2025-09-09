import gsap from "gsap";

import Component from "../../classes/Component";

export default class Contact extends Component {
  constructor() {
    super({
      element: ".home__footer__form",
      elements: {
        name: "#name",
        phone: "#phone",
        email: "#email",
        message: "#message",
        checkbox: "#checkbox",
        button: ".home__footer__submit",
        helper: ".home__footer__help__message",
      },
    });
  }

  /**
   * Events.
   */
  async onSubmit(e) {
    e.preventDefault();

    const { value: name } = this.elements.name;
    const { value: phone } = this.elements.phone;
    const { value: email } = this.elements.email;
    const { value: message } = this.elements.message;

    console.log(`
        Contact de ${name}
        Téléphone: ${phone}
        Email: ${email}
        Message: ${message}
        `);

    return;

    this.elements.button.classList.add("loading");

    fetch("https://email-server-mathis-humbert.vercel.app/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "formulaire@nouvel-edifice.fr",
        to: [
          "contact@nouvel-edifice.fr",
          "e.carreira@impactcommunication.fr",
          "mathishumbert71@gmail.com",
          "tdorpe@maison17.fr",
          "h.perrin@impactcommunication.fr",
        ],
        subject: `NOUVEL ÉDIFICE - Contact de ${name}`,
        text: `
        Contact de ${name}
        Téléphone: ${phone}
        Email: ${email}
        Message: ${message}
        `,
      }),
    })
      .then(() => this.onMailSend(true))
      .catch(() => this.onMailSend(false));
  }

  onMailSend(success) {
    this.elements.name.value = "";
    this.elements.phone.value = "";
    this.elements.email.value = "";
    this.elements.message.value = "";
    this.elements.checkbox.checked = "false";

    if (success) {
      this.elements.helper.textContent =
        "Votre message a été envoyé avec succès";
    } else {
      this.elements.helper.textContent =
        "Votre message n'a pas été envoyé, veuillez ressayer";
    }

    gsap.delayedCall(6, () => {
      this.elements.helper.textContent = "";
      this.elements.button.classList.remove("loading");
    });
  }

  /***
   * Listeners.
   */
  addEventListeners() {
    this.element.addEventListener("submit", (e) => this.onSubmit(e));
  }

  removeEventListeners() {
    this.element.addEventListener("submit", (e) => this.onSubmit(e));
  }
}
