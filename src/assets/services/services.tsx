import { ITask } from "./interfaces/ITask";
import TaskFactory from "./Builders/TaskFatory";
import Task from "./Classes/Task";
import { TaskDataSanitizer } from "./TaskDataSanitizer";
const TaskManager = ((TaskDataSanitizer) => {
  const Tasks: ITask[] = [];
  const UserDetails = {};
  //loadBatch();
  //This will return a unique id

  function loadBatch() {
    const request = new XMLHttpRequest();
    const URL = "http://localhost:3000/tasks";
    request.open("get", encodeURI(URL));
    console.log(encodeURI(URL));
    request.send();
    request.onload = () => {
      const { tasks, user } = TaskDataSanitizer.parseTaskRawData(
        JSON.parse(request.responseText)
      );
      UserDetails.name = user.name;
      UserDetails.surname = user.surname;
      UserDetails.email = user.email;
      Tasks.splice(0, Tasks.length);
      console.log("found someething; ", user);
      for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        Tasks.push(element);
      }
    };
  }
  function addTask(task: ITask) {
    const request = new XMLHttpRequest();
    const URL =
      "http://localhost:3000/addtask?" +
      `projectID=${task.projectID}&name=${task.name}&description=${task.description}&status=${task.status}&date=${task.date}`;

    request.open("get", encodeURI(URL));
    request.send();
    request.onload = () => {
      task.ID = request.response;
      Tasks.push(task);
    };
  }

  function deleteTask(ID: number) {
    const taskIndex = findTask(ID);
    if (taskIndex) {
      Tasks.splice(taskIndex, 1);
    } else {
      throw new Error("Task not found!");
    }
  }
  function setUpTask(name: string): TaskFactory {
    const taskFactoryInstance = new TaskFactory(name);
    Object.assign(taskFactoryInstance, { addTask });
    return taskFactoryInstance;
  }
  function findTask(ID: number): number | false {
    let foundIndex: number | false = false;
    Tasks.map((task, index) => {
      if (task.ID == ID) {
        foundIndex = index;
      }
    });
    return foundIndex;
  }

  return {
    RefreshTask: loadBatch,
    tasks: Tasks,
    deleteTask: deleteTask,
    setUpTask: setUpTask,
    addTask: addTask,
    getTask: (ID: number) => {
      return Tasks[findTask(ID)];
    },
    user: UserDetails,
  };
})(TaskDataSanitizer);
export default TaskManager;
