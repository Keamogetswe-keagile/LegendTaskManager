import { useContext, useEffect, useRef, useState } from "react";
import { TaskBroadcastContext } from "../../LegendTask";
import { ITask } from "../../../services/interfaces/ITask";

function AddtaskView() {
  const { TaskManagerService, projectIdState, setChange } =
    useContext(TaskBroadcastContext);

  const taskName = useRef();
  const taskDescription = useRef();
  const taskDate = useRef();

  function commit(TaskManagerService) {
    const taskBuilder = TaskManagerService.setUpTask(taskName.current.value)
      .setTaskDescription(taskDescription.current.value)
      .setDueDate(taskDate.current.value)
      .setProjectId(projectIdState);
    const addRef = taskBuilder.addTask;
    addRef(taskBuilder.createTask());
    setChange(true);
  }

  return (
    <>
      <div className="segment">
        <small>Task name:</small>
        <input type="text" name="taskName" ref={taskName} />
      </div>
      <div className="segment">
        <small>Task Description:</small>
        <textarea name="" rows="2" ref={taskDescription}></textarea>
      </div>
      <div className="segment">
        <small>Task name:</small>
        <input type="date" name="" ref={taskDate} />
      </div>
      <div className="segment">
        <input
          className="dark"
          type="button"
          value="Add task"
          onClick={() => {
            commit(TaskManagerService.current);
          }}
        />
      </div>
    </>
  );
}
function ViewTaskView() {
  const { TaskManagerService, taskInView } = useContext(TaskBroadcastContext);
  const task = TaskManagerService.current.getTask(taskInView.taskID);
  return (
    <>
      <div className="segment">
        <small>Task Name</small>
        <span>{task.name}</span>
      </div>
      <div className="segment">
        <small>Task Description</small>
        <span className="description">{task.description}</span>
      </div>
      <div className="segment">
        <small>Date</small>
        <span className="">{task.date}</span>
      </div>
      <div className="segment">
        <small>status</small>
        <span className="status">{task.status}</span>
      </div>
    </>
  );
}
function EditTask() {
  useEffect(() => {
    taskName.current.value = task.name;
    taskDate.current.value = task.date.toISOString().substr(0, 10);
    taskDescription.current.value = task.description;
    Object.values(taskStatus.current.children).map((child, index) => {
      if (child.innerHTML == task.status) {
        taskStatus.current.selectedIndex = index;
      }
    });
  });
  const { TaskManagerService, projectIdState, setTaskInView, taskInView } =
    useContext(TaskBroadcastContext);
  const task = TaskManagerService.current.tasks[taskInView.taskID];
  //converting task date into a date object
  task.date = new Date();
  const taskName = useRef();
  const taskDescription = useRef();
  const taskDate = useRef();
  const taskStatus = useRef();

  function commit(TaskManagerService) {
    task.name = taskName.current.value;
    task.date = new Date(taskDate.current.value).toISOString().substring(0, 10);
    console.log("Date: broken  ", task.date);
    task.status = taskStatus.current.value;
    task.description = taskDescription.current.value;
    //   taskStatus.current.selectedIndex
    // ];
    console.log(task.status);
    setTaskInView("");
  }
  return (
    <>
      <div className="segment">
        <small>Task name:</small>
        <input type="text" name="taskName" ref={taskName} />
      </div>
      <div className="segment">
        <small>Task status:</small>
        <select name="status" ref={taskStatus}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="In Review">In Review</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <div className="segment">
        <small>Task Description:</small>
        <textarea
          name="taskDescription"
          rows="2"
          ref={taskDescription}
        ></textarea>
      </div>
      <div className="segment">
        <small>Task name:</small>
        <input type="date" name="taskDate" ref={taskDate} />
      </div>
      <div className="segment flex">
        <input
          className="dark"
          type="button"
          value="Edit task"
          onClick={() => {
            commit(TaskManagerService.current);
          }}
        />
        <button
          className="dark"
          onClick={() => {
            const deleted = TaskManagerService.current.deleteTask(task.ID);
            if (deleted) {
              setTaskInView("");
            }
          }}
        >
          <img width={20} src="trash.svg" alt="" />
        </button>
      </div>
    </>
  );
}
function NoItemsView() {
  return (
    <div className="no-items">
      <h3>No task is select</h3>
      <p>click on a task</p>
    </div>
  );
}
function OperantBody({ children }) {
  return (
    <div id="task-action">
      <h1>Task action</h1>
      <div className="fields">{children}</div>
    </div>
  );
}
export function TaskOperant() {
  const { taskInView } = useContext(TaskBroadcastContext);

  if (taskInView.action == "addTask") {
    return (
      <OperantBody>
        <AddtaskView />
      </OperantBody>
    );
  } else if (taskInView.action == "viewTask") {
    return (
      <OperantBody>
        <ViewTaskView />
      </OperantBody>
    );
  } else if (taskInView.action == "editTask") {
    return (
      <OperantBody>
        <EditTask />
      </OperantBody>
    );
  }
  return (
    <OperantBody>
      <NoItemsView />
    </OperantBody>
  );
}
