import { useRef, useState } from "react";

interface ISetState {
  setState: Function;
}
export default function Login({ setState }: ISetState) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitCallback() {
    const formData = new FormData();
    formData.set("username", email);
    formData.set("password", password);

    const request = new XMLHttpRequest();
    const url = encodeURI(
      `http://localhost:3000/login?username=${email}&password=${password}`
    );
    console.log(url);
    request.open("GET", url);
    request.send();
    request.onload = () => {
      const response = JSON.parse(request.responseText);
      console.log(response.status);
      if (response.status == "successful") {
        setState("main");
      }
    };
  }
  return (
    <>
      <div className="form-container">
        <div className="form-head">
          <h3>Login</h3>
          <p>Enter your email to login to your account</p>
        </div>
        <div>
          <div className="segment">
            <small>Email</small>
            <input
              type="text"
              name="username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="segment">
            <small>Password</small>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="off-stack top right">Forgot your password</span>
          </div>
          <div className="segment">
            <input
              className="dark"
              type="button"
              value="Login"
              onClick={submitCallback}
            />
          </div>
          <div className="segment">
            <input className="light" type="button" value="Login with Google" />
          </div>
          <div className="segment">
            <p>
              Don't have accont? <a>Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
