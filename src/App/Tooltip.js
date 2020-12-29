import {Component} from './Component'

export class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    // Control the position of the text
    // super("active-projects", true);
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.closedTooltip = () => {
    this.detach();
    this.closeNotifier();
  };
    this.create();
  }

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