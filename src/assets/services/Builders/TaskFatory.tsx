import { ITask } from "../interfaces/ITask";
import Task from "../Classes/Task";
//Task class won't be exposed to the global scope

class TaskFactory {
  name: string;
  description: string;
  date: Date;
  status: string;
  ID: number;
  projectID: number;
  constructor(name: string) {
    // if (name?.trim() == "") {
    //   throw new Error("Task name is invalid!");
    // }
    this.name = name; //.trim();
    this.description = "";
    this.ID = -1;
    this.status = "Pending";
  }
  setTaskStatus(status: string) {
    this.status = status;
    return this;
  }
  setProjectId(ID: number) {
    this.projectID = ID;
    return this;
  }
  setTaskDescription(description: string) {
    this.description = description;
    return this;
  }
  setDueDate(date: Date) {
    const dateNow = new Date();
    if (date < dateNow) {
      throw new Error("You can not set create tasks with past dates");
    }
    this.date = date;
    return this;
  }
  createTask() {
    return new Task(
      this.ID,
      this.name,
      this.description,
      this.date,
      this.status,
      this.projectID
    );
  }
}
export default TaskFactory;
