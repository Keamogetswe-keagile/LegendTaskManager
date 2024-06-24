import { useContext, useEffect, useState } from "react";
import { TaskBroadcastContext } from "../../LegendTask";
interface IProjectStats {
  Completed: string;
  Pending: number;
  Overall: number;
  projectManager: string;
  projectName: string;
  enterprise: string;
  clientEmail: string;
}
export function ProjectProgress() {
  const { TaskManagerService } = useContext(TaskBroadcastContext);
  const user = TaskManagerService.current.user;
  //Dummy data to simulate the API response
  const [projectStats, setProjectStats] = useState({
    Completed: 11,
    Pending: 3,
    Overall: 13,
    projectManager: "CollinZimba@gmial.com",
    projectName: "Aplhonse waer ERP",
    enterprise: "Alphonse wear",
    clientEmail: "Nora@Alphomse.com",
  });
  // useEffect(() => {
  //   fetch("http://localhost:3000/projectstats?projectID=1")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => {
  //       setProjectStats(result[0]);
  //     });
  // }, []);
  const {
    Completed,
    Pending,
    Overall,
    projectManager,
    projectName,
    enterprise,
    clientEmail,
  } = projectStats;

  return (
    <div>
      <div className="card-view">
        <h3 className="mt print-only flyer-heading">Project details</h3>
        <div>
          <small className="flyer-normal">
            project name <span className="print-only">:</span>{" "}
          </small>
          <h2 className="flyer-normal">{projectName}</h2>
        </div>

        <span className="mt flyer-heading print-only order-1">
          Project Overview
        </span>
        <div className="detail">
          <div className="fragment">
            <p>{Overall}</p>
            <span>overall tasks</span>
          </div>
          <div className="fragment">
            <p>{Completed}</p>
            <span>Complete tasks</span>
          </div>
          <div className="fragment">
            <p>{Pending}</p>
            <span>Pendng tasks</span>
          </div>
        </div>
        <div className="bottom-line">
          <div className="pair">
            <span>Client: </span>
            <span>{clientEmail}</span>
          </div>
          <span className="space"></span>
          <div className="pair">
            <span>Enterprice: </span>
            <span>{enterprise}</span>
          </div>
        </div>
      </div>
      <div className="profile">
        <div className="screen-only img-wrapper">
          <img src="/user.svg" />
        </div>
        <div className="text-content">
          <span className="print-only flyer-heading">Employee details</span>
          <h4 className="flyer-normal">
            <span className="print-only">Name: </span>
            {user.name + " " + user.surname}
          </h4>
          <span>
            <span className="print-only">Email: </span>
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
