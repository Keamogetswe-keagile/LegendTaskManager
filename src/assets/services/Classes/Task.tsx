export default class Task implements ITask {
  name: string;
  projectID: number;
  description: string;
  date: Date;
  ID: number;
  status: "In Progress" | "Pending" | "Completed";

  constructor(
    ID: number,
    name: string,
    description: string,
    date: Date,
    status: "In Progress" | "Pending" | "Completed",
    projectID: number
  ) {
    this.name = name;
    this.ID = ID;
    this.description = description;
    this.date = date;
    this.status = status;
    this.projectID = projectID;
  }
  completeTask() {
    this.status = "Completed";
  }
}
