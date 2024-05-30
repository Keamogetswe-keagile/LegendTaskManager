import { render } from "react-dom";
import { ITask } from "../../services/interfaces/ITask";
import { TableActions } from "./taskview/table.menu";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskBroadcastContext } from "../LegendTask";
export function TaskTable(tasks: ITask[]) {
  useEffect(() => {
    if (initialLoad == false) {
      setTimeout(() => {
        setInitialLoad(true);
      }, 100);
    }
  });
  const { setTaskInView } = useContext(TaskBroadcastContext);
  const [initialLoad, setInitialLoad] = useState(false);

  if (tasks.tasks.length < 1) {
    return (
      <div className="no-items">
        <h1>No item to show</h1>
        <p>You have added any tasks</p>
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.tasks.map((item, index) => {
          return (
            <tr key={item.ID}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>{new Date(item.date).toString().substring(0, 15)}</td>
              <td>
                <TableActions taskID={item.ID} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
