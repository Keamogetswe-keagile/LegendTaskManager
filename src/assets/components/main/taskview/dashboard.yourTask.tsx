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
                  return task.status == "Complete";
                }).length
              }
            </td>
          </tr>
          <tr>
            <td>Tasks In Progress</td>
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
                  const dateNowComparison = new Date()
                    .toISOString()
                    .substring(0, 10);
                  const taskDatecomparison = new Date(task.date)
                    .toISOString()
                    .substring(0, 10);
                  console.log(" Comparisons");

                  console.log(taskDatecomparison);
                  console.log(dateNowComparison);
                  const dateStatus: boolean =
                    new Date(taskDatecomparison).getTime() <
                    new Date(dateNowComparison).getTime();
                  if (
                    (task.status == "Pending" ||
                      task.status == "In Progress") &&
                    dateStatus
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
