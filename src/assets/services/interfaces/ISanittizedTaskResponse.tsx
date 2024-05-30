import IProject from "./Project";
import ITaskBatch from "./TaskBatch";
import IUserDetails from "./UserDetails";
import { ITask } from "./ITask";
export default interface ISanittizedTaskResponse {
  projects: IProject[];
  user: IUserDetails;
  tasks: ITask[];
}
