import "./styles/success-screen.css";
import Utils from "./utils";

export default class SuccessScreen extends H5P.EventDispatcher {
  constructor(
    { successScreenImage = {}, successMessage = "" },
    behaviouralSettings = {},
    parent
  ) {
    super();

    this.wrapper = document.createElement("div");
    this.wrapper.className = "h5p-questionnaire-success";
    this.wrapper.setAttribute("tabindex", "-1");
    this.wrapper.classList.add("hide");

    const centeredElements = document.createElement("div");
    centeredElements.className = "h5p-questionnaire-success-center";
    this.wrapper.appendChild(centeredElements);

    const successIcon = document.createElement("div");
    successIcon.className = "h5p-questionnaire-success-icon";

    // Add image instead of icon
    if (successScreenImage.params && successScreenImage.params.file) {
      successIcon.classList.add("image");
      const image = H5P.newRunnable(
        successScreenImage,
        parent.contentId,
        H5P.jQuery(successIcon),
        undefined,
        { parent: parent }
      );
      image.on("loaded", () => {
        this.trigger("imageLoaded");
      });
    } else {
      successIcon.classList.add("standard-icon");
    }

    const successText = document.createElement("div");
    successText.className = "h5p-questionnaire-success-message";
    successText.innerHTML = successMessage;

    centeredElements.appendChild(successIcon);
    centeredElements.appendChild(successText);

    const backButtonLabel = behaviouralSettings.enableEditRights
      ? "Edit Answers"
      : "View Answers";

    if (behaviouralSettings.enableViewRights) {
      this.wrapper.appendChild(
        Utils.createButton(backButtonLabel, "previous", this)
      );
    }

    /**
     * Show success screen, returns true on success
     * @return {boolean} True on success
     */
    this.show = function () {
      this.wrapper.classList.remove("hide");
      this.wrapper.focus();
    };

    this.hide = function () {
      this.wrapper.classList.add("hide");
    };
  }

  /**
   * Attach to container
   * @param  {HTMLElement} container
   */
  attachTo(container) {
    container.appendChild(this.wrapper);
  }
}
