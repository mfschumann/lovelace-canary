import { hasOldTemplate } from "card-tools/src/old-templates";
import { DEFAULT_SECONDARY_INFO } from "./const";
import { hasTemplate } from "card-tools/src/templates";
import { provideHass } from "card-tools/src/hass";
import { extensionEnabled, moduleEnabled } from "./utils";
import { createModule } from "./module";

const MODULE = "generic-entity-row";
const ELEMENT = "hui-generic-entity-row";

if (moduleEnabled(MODULE)) {
  createModule(ELEMENT, function () {
    if (
      this.config.secondary_info &&
      extensionEnabled(this.config, "secondary_info")
    ) {
      // ensure we don't overwrite the default secondary info behaviour.
      if (!DEFAULT_SECONDARY_INFO.includes(this.config.secondary_info)) {
        if (
          typeof this.config.secondary_info === "object" ||
          hasOldTemplate(this.config.secondary_info) ||
          hasTemplate(this.config.secondary_info)
        ) {
          // create secondary info element to track state changes.
          let secondaryInfoElement = document.createElement("secondary-info");

          secondaryInfoElement.template = {
            template: this.config.secondary_info,
            variables: { config: this.config, entity: this.config.entity },
            entity_ids: this.config.entity_ids,
          };

          this.shadowRoot.appendChild(secondaryInfoElement);

          provideHass(secondaryInfoElement);
        } else {
          // set the secondary info to plain text.
          let secondaryInfoDiv = this.shadowRoot.querySelector(".secondary");
          if (secondaryInfoDiv) {
            secondaryInfoDiv.innerHTML = this.config.secondary_info;
          }
        }
      }
    }
  });
}
