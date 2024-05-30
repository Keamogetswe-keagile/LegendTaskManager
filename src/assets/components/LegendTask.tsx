import React, { createContext, useRef } from "react";
import TaskManager from "../services/services";
import { TaskTable } from "./main/main.table";
import TaskView from "./main/Dashboard";
import { useState } from "react";

export const TaskBroadcastContext = createContext({});
export const Action = {
  addTask: "addTask",
  viewTask: "viewTask",
  editTask: "editTask",
};

export default function LegendTask() {
  const TaskManagerService = useRef(TaskManager);
  const [taskInView, setTaskInView] = useState({ taskID: "", action: "" });

  const [projectIdState, setProjectIdd] = useState(1);
  //Retriving tasks from API using TaskManager which is essentially a service
  TaskManagerService.current.RefreshTask();

  return (
    <>
      <TaskBroadcastContext.Provider
        value={{
          taskInView,
          setTaskInView,
          TaskManagerService,
          projectIdState,
        }}
      >
        <TaskView />

        <div className="task-section">
          <div className="head ">
            <h1 className="flyer-heading">
              <span className="print-only">Your </span>Tasks
            </h1>{" "}
            <input
              className="dark"
              type="button"
              value="Add task"
              onClick={() => {
                setTaskInView({ taskID: "", action: Action.addTask });
              }}
            />
          </div>
          <TaskTable tasks={TaskManagerService.current.tasks} />;
        </div>
      </TaskBroadcastContext.Provider>
    </>
  );
}
