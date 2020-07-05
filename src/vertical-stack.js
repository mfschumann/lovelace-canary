import { VERTICAL_STACK_IN_CARD_STYLE } from "./const";
import { extensionEnabled, moduleEnabled } from "./utils";
import { createModule } from "./module";

const MODULE = "vertical-stack";
const ELEMENT = "hui-vertical-stack-card";

if (moduleEnabled(MODULE)) {
  const applyStyles = async function (element) {
    // exit clause.
    if (!element) return;

    await element.updateComplete;

    if (element.tagName === "HA-CARD") {
      element.style.boxShadow = "none";
      element.style.background = "none";
    }

    // depth search.
    if (element.firstElementChild) {
      await applyStyles(element.firstElementChild);
    }
    if (element.shadowRoot) {
      await applyStyles(element.shadowRoot.firstElementChild);
    }
    // breadth search.
    if (element.nextElementSibling) {
      await applyStyles(element.nextElementSibling);
    }
  };

  createModule(ELEMENT, function () {
    if (
      this._config.in_card === true &&
      extensionEnabled(this._config, "in_card")
    ) {
      // remove space between cards in the stack.
      let styleElement = document.createElement("style");
      styleElement.innerHTML = VERTICAL_STACK_IN_CARD_STYLE;

      // move the stack inside a ha-card element.
      let haCard = document.createElement("ha-card");

      this.shadowRoot.appendChild(styleElement);
      this.shadowRoot.appendChild(haCard);

      let divElement = this.shadowRoot.querySelector("#root");
      haCard.insertBefore(divElement, null);

      // remove style from all ha-card child elements.
      applyStyles(divElement);
    }
  });
}
