import gsap from "gsap";

import Component from "../classes/Component";
import { lenis } from "../classes/Lenis";
import { expoOut } from "../utils/easing";
import { events } from "../utils/events";

export default class Booklet extends Component {
  constructor() {
    super({
      element: ".booklet",
      elements: {
        close: ".booklet__close",
        form: ".booklet__form",
        name: "#name",
        phone: "#phone",
        email: "#email",
        futursProprio: "#futurs-propriétaires",
        investisseurs: "#investisseurs",
        proprioFonciers: "#propriétaires-fonciers",
        message: "#message",
        confirm: "#confirm",
        submit: ".booklet__form__submit",
        helper: ".booklet__form__help__message",
      },
    });

    this.addEventListeners();
  }

  closeBooklet() {
    gsap.to(this.element, {
      opacity: 0,
      duration: 0.7,
      ease: expoOut,
      onComplete: () => {
        lenis.start();

        gsap.set(this.element, {
          display: "none",
        });
      },
    });
  }

  showBooklet() {
    lenis.stop();

    gsap.set(this.element, {
      display: "flex",
    });
    gsap.to(this.element, {
      opacity: 1,
      duration: 0.7,
      ease: expoOut,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const { value: name } = this.elements.name;
    const { value: phone } = this.elements.phone;
    const { value: email } = this.elements.email;
    const futursProprio = this.elements.futursProprio.checked;
    const investisseurs = this.elements.investisseurs.checked;
    const proprioFonciers = this.elements.proprioFonciers.checked;
    const { value: message } = this.elements.message;

    console.log(`
        Contact de ${name}
        Téléphone: ${phone}
        Email: ${email}
        Profil: ${
          [
            futursProprio && "Futurs propriétaires",
            investisseurs && "Investisseurs",
            proprioFonciers && "Propriétaires fonciers",
          ]
            .filter(Boolean)
            .join(", ") || "Non spécifié"
        }
        Message: ${message}
        `);

    return;

    this.elements.submit.classList.add("loading");

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
        Profil: ${
          [
            futursProprio && "Futurs propriétaires",
            investisseurs && "Investisseurs",
            proprioFonciers && "Propriétaires fonciers",
          ]
            .filter(Boolean)
            .join(", ") || "Non spécifié"
        }
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
    this.elements.futursProprio.checked = "false";
    this.elements.investisseurs.checked = "false";
    this.elements.proprioFonciers.checked = "false";
    this.elements.message.value = "";
    this.elements.confirm.checked = "false";

    if (success) {
      this.elements.helper.textContent =
        "Votre message a été envoyé avec succès";
    } else {
      this.elements.helper.textContent =
        "Votre message n'a pas été envoyé, veuillez ressayer";
    }

    gsap.delayedCall(6, () => {
      this.elements.helper.textContent = "";
      this.elements.submit.classList.remove("loading");
    });
  }

  /***
   * Listeners.
   */
  addEventListeners() {
    this.element.addEventListener("click", (e) => {
      if (e.target == this.element) {
        this.closeBooklet();
      }
    });

    this.elements.close.addEventListener("click", () => this.closeBooklet());

    this.elements.form.addEventListener("submit", (e) => this.onSubmit(e));

    events.on("show_booklet", this.showBooklet);
  }
}
