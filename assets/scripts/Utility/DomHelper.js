export class DOMHelper {
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