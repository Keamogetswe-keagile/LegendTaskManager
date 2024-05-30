import { useContext, useEffect, useState } from "react";
import { TaskBroadcastContext } from "../../LegendTask";
import Task from "../../../services/Classes/Task";

export function IndividualProgress() {
  const { TaskManagerService } = useContext(TaskBroadcastContext);
  const [content, setContent] = useState(TaskManagerService.current.tasks);
  const tasks: Task[] = TaskManagerService.current.tasks;
  useEffect(() => {
    setTimeout(() => {
      setContent(TaskManagerService.current.tasks);
    }, 200);
  }, []);
  return (
    <div id="individual-progress" className="view screen-only">
      <h1>Your task</h1>
      <p>Your tasks at a glance</p>
      <table className="i-container">
        <tbody>
          <tr>
            <td>Completed tasks</td>
            <td>
              {
                tasks.filter((task: Task) => {
                  return task.status == "Completed";
                }).length
              }
            </td>
          </tr>
          <tr>
            <td>Active tasks</td>
            <td>
              {" "}
              {
                tasks.filter((task: Task) => {
                  return task.status == "In Progress";
                }).length
              }
            </td>
          </tr>
          <tr>
            <td>pending Task</td>
            <td>
              {" "}
              {
                tasks.filter((task: Task) => {
                  return task.status == "Pending";
                }).length
              }
            </td>
          </tr>
          <tr>
            <td>Over due tasks</td>
            <td>
              {" "}
              {
                tasks.filter((task: Task) => {
                  const dateStatus: boolean = new Date(task.date) > new Date();
                  if (
                    task.status == "Pending" ||
                    task.status == "In Progress"
                  ) {
                    return true;
                  }
                  return false;
                }).length
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
