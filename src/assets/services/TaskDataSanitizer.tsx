import ITaskRawData from "./interfaces/ITaskRawData";
import ISanittizedTaskResponse from "./interfaces/ISanittizedTaskResponse";
import IProject from "./interfaces/Project";
import ITaskBatch from "./interfaces/TaskBatch";
import { ITask } from "./interfaces/ITask";
import IUserDetails from "./interfaces/UserDetails";
export const TaskDataSanitizer = (() => {
  "use strict";
  const projectRegistry = new Set();

  function parseTaskRawData(data: ITaskRawData[]): ISanittizedTaskResponse {
    let user: IUserDetails = composeUserDetails(data[0]);
    //Each time this function is called projects and taks are reinitialised
    const projects: IProject[] = [];
    const TaskIDRegistry = new Set();
    const tasks: ITask[] = [];

    //looping over task in their raw format
    //Composition function help to sanitise data by presenting it to the client in its usable form
    data.map((dataSegment) => {
      const project = composeProject(dataSegment);
      const task = composeTask(dataSegment);
      //If the a projectID is not registered then it will be.
      //if projectId is registered then it will be ignored.
      if (!projectRegistry.has(dataSegment.projectID)) {
        projects.push(project);
        projectRegistry.add(dataSegment.projectID);
      }

      if (!TaskIDRegistry.has(task.ID)) {
        tasks.push(task);
        TaskIDRegistry.add(task.ID);
      }
    });

    return {
      projects: projects,
      tasks: tasks,
      user: user,
    };
  }
  function composeProject({
    projectID,
    projectName,
    clientEmail,
    enterprise,
  }: ITaskRawData): IProject {
    return {
      ID: projectID,
      name: projectName,
      clientEmail: clientEmail,
      enterprise: enterprise,
    };
  }
  function composeTask({
    taskName,
    taskDescription,
    taskDate,
    taskStatus,
    taskID,
    projectID,
  }: ITaskRawData): ITask {
    return {
      ID: taskID,
      name: taskName,
      description: taskDescription,
      date: new Date(taskDate).toString().substring(0, 15),
      status: taskStatus,
      projectID: projectID,
    };
  }
  function composeUserDetails({
    employeeEmail,
    employeeName,
    employeeSurname,
  }: ITaskRawData): IUserDetails {
    return {
      email: employeeEmail,
      name: employeeName,
      surname: employeeSurname,
    };
  }

  return { parseTaskRawData: parseTaskRawData };
})();
