class projectItem {
  hasActiveTooltip = false;
  constructor(id, updateProjectListFunction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectMoreInfoNutton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  showMoreInfoHanlder() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });

    // Not for use but for learn
    item.addEventListener("dragend", (event) => {
      // Here can update the UI or move the Data arround
      console.log(event);
    });
  }

  connectMoreInfoNutton() {
    const item = document.getElementById(this.id);
    const projectItemElement = document.getElementById(this.id);
    let moreInfoBtn = projectItemElement.querySelector("button:first-of-type");
    moreInfoBtn.addEventListener("click", this.showMoreInfoHanlder.bind(this));
  }
  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    // To select last button on the div
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListener(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    console.log("Type:::");
    console.log(type);
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }
  update(updateProjectListFn, type) {
    this.updateProjectListHandler = updateProjectListFn;
    // Update the eventListener
    this.connectSwitchButton(type);
  }
}