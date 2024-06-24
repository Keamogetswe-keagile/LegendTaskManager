import { useContext, useEffect } from "react";
import { TaskOperant } from "./taskview/dashboard.taskOperant";
import { IndividualProgress } from "./taskview/dashboard.yourTask";
import { ProjectProgress } from "./taskview/dashboard.projectprogress";

export default function TaskView() {
  useEffect(() => {
    //Gets all the widget which can be activated by an interaction(such as a double click) while they are disabled
    // const disabledInteractive = document.querySelectorAll(".interective");
    // function dbclickHandler(target: Element) {
    //   target.classList.remove("disabled");
    // }
    // disabledInteractive.forEach((element: Element) => {
    //   element.addEventListener("ondbclick", (e: Event) => {
    //     dbclickHandler(e.target);
    //   });
    // });
    // return () => {
    //   disabledInteractive.forEach((element: Element) => {
    //     element.removeEventListener("ondbclick", dbclickHandler);
    //   });
    // };
  });

  return (
    <div id="dashboard">
      <h1 className="print-only flyer-title">Task report</h1>
      <h1 className="screen-only flyer-heading">Dashboard</h1>
      <div className="collection">
        <ProjectProgress />

        <IndividualProgress />
        <TaskOperant />
      </div>
    </div>
  );
}
