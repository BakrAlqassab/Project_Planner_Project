import { ProjectItem } from "./ProjectItem";
import {DOMHelper} from '../Utility/DomHelper'
export class ProjectList {
  // projects = [];
  constructor(type) {
    this.type = type;
    this.projects = [];
    this.connectDroppable();

    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
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
