import LegendTask from "./assets/components/LegendTask";
import Login from "./assets/components/login";

import { useState } from "react";
import TaskManager from "./assets/services/services";

function App() {
  const [state, setState] = useState("login");
  const userData = TaskManager.user;
  if (state == "main") {
    return <LegendTask />;
  } else {
    return <Login setState={setState} user={userData} />;
  }
}
export default App;
