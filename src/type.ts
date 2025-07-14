// PROJECT TYPE

enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public numOfPeople: number,
    public status: ProjectStatus
  ) {}
}

export { Project, ProjectStatus };