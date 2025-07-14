import { Component } from "./components";
import { autobind } from "./bind";
import { Project } from "./type";
import { Draggable } from "./dragdrop";

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLElement>
  implements Draggable
{
  private project: Project;
  get persons() {
    if (this.project.numOfPeople === 1) {
      return `${this.project.numOfPeople} person`;
    } else {
      return `${this.project.numOfPeople} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(_: DragEvent) {
    console.log("DragEnd");
  }
  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("p")!.textContent = this.project.description;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
  }
}
