import { Project, ProjectStatus } from "./type";

// PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}


export class ProjectState extends State<Project> {
  _projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random.toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this._projects.push(newProject);
    this.updateProject();
  }

  moveProject(projectId: string, newState: ProjectStatus) {
    const project = this._projects.find((project) => project.id === projectId);
    if (project) {
      project.status = newState;
      this.updateProject();
    }
  }
  updateProject() {
    for (const listenerFn of this.listeners) {
      listenerFn(this._projects.slice());
    }
  }
}
