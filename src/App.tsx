import LegendTask from "./assets/components/LegendTask";
import Login from "./assets/components/login";

import { useState } from "react";

function App() {
  session;
  const [state, setState] = useState("login");

  //Checing if the user is logged in
  let status;
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/");
  request.send();
  request.onload = () => {
    status = JSON.parse(request.responseText).status;
    console.log(status);
    if (!status == "visiter") {
      setState("main");
    }
  };

  if (state == "main") {
    return <LegendTask />;
  } else {
    return <Login setState={setState} />;
  }
}
export default App;
