import { useRef, useState } from "react";

interface ISetState {
  setState: Function;
  user: any;
}
export default function Login({ setState, user }: ISetState) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitCallback() {
    const users = new Map();
    users.set("mrkkeagile@gmail.com", {
      password: "pass",
      name: "Keamgetswe",
      surname: "Keagile",
      email: email,
    });

    users.set("collinzimba@gmail.com", {
      password: "colpass",
      name: "Collin",
      surname: "Zimba",
      email: email,
    });
    const userLoggingIn = users.get(email.trim().toLowerCase());
    if (password == userLoggingIn.password) {
      user.name = userLoggingIn.name;
      user.surname = userLoggingIn.surname;
      user.email = userLoggingIn.email;

      setState("main");
    } else {
      console.error("Incorrect password");
    }
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
              Already have an account? <a>Log in</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
