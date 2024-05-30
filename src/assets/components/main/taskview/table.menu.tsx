import { useContext, useEffect } from "react";
import { Action, TaskBroadcastContext } from "../../LegendTask";
import { useRef } from "react";
interface MenuActionprops {
  taskID: number;
}
function Expand(widget: Element) {
  widget.parentElement?.querySelector(".menu")?.classList.toggle("show");
}
export function TableActions({ taskID }: MenuActionprops) {
  const menuWidget = useRef();
  useEffect(() => {
    return () => {};
  });
  const { setTaskInView } = useContext(TaskBroadcastContext);
  return (
    <div>
      <div
        ref={menuWidget}
        className="menu-icon"
        onClick={(e) => {
          e.stopPropagation();
          Expand(menuWidget.current);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div className="menu">
          <input
            type="button"
            value="Edit"
            onClick={() => {
              setTaskInView({ taskID: taskID, action: Action.editTask });
              Expand(menuWidget.current);
            }}
          />
          <input
            type="button"
            value="ViewTask"
            onClick={() => {
              setTaskInView({ taskID: taskID, action: Action.viewTask });
              Expand(menuWidget.current);
            }}
          />
        </div>
      </div>
    </div>
  );
}
