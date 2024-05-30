import { useContext, useRef } from "react";
import { TaskBroadcastContext } from "../../LegendTask";
import { ITask } from "../../../services/interfaces/ITask";

function AddtaskView() {
  const { TaskManagerService,  projectIdState } =
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
          value="Commit"
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
  if (taskInView.action == "") {
    return (
      <OperantBody>
        <NoItemsView />
      </OperantBody>
    );
  } else if (taskInView.action == "addTask") {
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
  }
  return (
    <div className="no-items">
      <h3>Action error</h3>
      <p>Sominthing went wrong</p>
    </div>
  );
}
