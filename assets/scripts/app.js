class DOMHelper {
  static clearEventListener(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    // When append element which already part of the DOM, will not be copied but moved
    destinationElement.append(element);
    // Not all browsers support the behavior like explorer,Saffari
    element.scrollIntoView({ behavior: "smooth" });
    // can use sctollTo() || scrollBy too to scroll for maintaining dimension and behavior can be too
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }
  detach() {
    // Be sure the lement exist to delete
    if (this.element) {
      this.element.remove();
      // this.element.parentChild.removeChild(this.element)
    }
  }
  attach() {
    // document.body.append(this.element);
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    // Control the position of the text
    // super("active-projects", true);
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }
  closedTooltip = () => {
    this.detach();
    this.closeNotifier();
  };
  create() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";
    //For easy contents
    // // toolTipElement.textContent = this.text;
    //  toolTipElement.innerHTML = `<h2> More Info </h2>
    // <p> ${this.text}</p> `;

    // For complecated constents
    const toolTipTemplate = document.getElementById("tooltip");
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector("p").textContent = this.text;
    toolTipElement.append(toolTipBody);
    // toolTipElement.addEventListener('click',this.detach.bind(this))

    // Cart position / Dimension
    console.log(this.hostElement.getBoundingClientRect());
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosRight = this.hostElement.offsetRight;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElPosHeight = this.hostElement.offsetHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElPosHeight - parentElementScrolling - 10;
    toolTipElement.style.position = "absolute";
    toolTipElement.style.left = x + "px";
    toolTipElement.style.top = y + "px";

    toolTipElement.addEventListener("click", this.closedTooltip);
    this.element = toolTipElement;
  }
}
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
class projectList {
  projects = [];
  constructor(type) {
    this.type = type;
    this.connectDroppable();

    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new projectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }
  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    list.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });
    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        // list.parentElement.classList.add("droppover");
      }
    });
    list.addEventListener("dragleave", (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });
    list.addEventListener("drop", (event) => {
      const prjId = event.dataTransfer.getData("text/plain");

      // Check the prjects list where the draged project part from
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();
      list.parentElement.classList.remove("droppable");
      event.preventDefault(); // not require but help in case the project will contain more dragable elements
    });
  }
  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);

    console.log(this);
  }

  // To remove the project to be add again in deifferent section
  // switch project will define in the event listener of project item
  switchProject(projectId) {
    // One way
    //  const projectIndex = this.projects.findIndex(p => p.id === projectId );
    //  this.projects.splice(projectIndex,1);
    // Second Way,
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
class App {
  static init() {
    const activeProjectsList = new projectList("active");
    const finishedProjectsList = new projectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      // binding will help to not refer to the wrong instance
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
    // Timer
    // const TimerId = setTimeout(this.startAnalytics, 3000); // 3000ms = 3 Seconds
    // document
    //   .getElementById("stop-analytics-button")
    //   .addEventListener("click", () => {

    //       // Stop the timer npt the interval in the analytics.js file
    //     clearTimeout(TimerId);
    //   });
  }
  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = " assets/scripts/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}
App.init();
