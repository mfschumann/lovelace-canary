import { fireEvent } from "card-tools/src/event.js";

customElements.whenDefined("hui-glance-card").then(() => {
  const GlanceCard = customElements.get("hui-glance-card");

  const getAlignment = function(alignment) {
    switch (alignment) {
      case "center":
        return "space-evenly";
      case "right":
        return "flex-end";
      default:
        return "flex-start";
    }
  };

  GlanceCard.prototype.firstUpdated = function() {
    if (this._config.align) {
      this.shadowRoot.querySelector(
        ".entities"
      ).style.justifyContent = getAlignment(this._config.align);
    }
  };

  fireEvent("ll-rebuild", {});
});
