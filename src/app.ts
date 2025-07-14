import { ProjectStatus } from "./type";
import { validate, Validatable } from "./validation";
import { Component } from "./components";
import { ProjectList, projectState } from "./lists";
import { autobind } from "./bind";


// ProjectInput
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    this.descriptionInputElement = <HTMLTextAreaElement>(
      this.element.querySelector("#description")!
    );
    this.configure();
  }

  _validation(tile: string, description: string, people: number): boolean {
    return (
      tile.trim().length === 0 ||
      people === 0 ||
      description.trim().length === 0
    );
  }
  _gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  clearInputs() {
    this.titleInputElement.innerText = "";
    this.peopleInputElement.innerText = "";
    this.descriptionInputElement.innerText = "";

  }
  @autobind
  _submitHandler(event: Event) {
    event.preventDefault();
    const userGather = this._gatherUserInput();
    if (Array.isArray(userGather)) {
      const [enteredTitle, enteredDescription, enteredPeople] = userGather;
      projectState.addProject(enteredTitle, enteredDescription, enteredPeople);
      this.clearInputs();
      console.log(
        `${enteredTitle}, ${enteredPeople}, ${enteredDescription} - status: ${ProjectStatus}`
      );
    }
  }
  configure() {
    this.element.addEventListener("submit", this._submitHandler);
  }
  renderContent() {}
}

const prjtInput = new ProjectInput();

const pl1 = new ProjectList("active");
const pl2 = new ProjectList("finished");
