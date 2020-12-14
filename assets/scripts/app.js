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
  constructor(closeNotifierFunction) {
// Control the position of the text
    super("active-projects",true);
    // super();
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }
  closedTooltip = () => {
    this.detach();
    this.closeNotifier();
  };
  create() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";
    toolTipElement.textContent = "Beko";
    // toolTipElement.addEventListener('click',this.detach.bind(this))
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
  }

  showMoreInfoHanlder() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  connectMoreInfoNutton() {
    const projectItemElement = document.getElementById(this.id);
    let moreInfoBtn = projectItemElement.querySelector("button:first-of-type");
    moreInfoBtn.addEventListener("click", this.showMoreInfoHanlder);
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

    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new projectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
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
  }
}
App.init();
