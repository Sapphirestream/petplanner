import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../store/authContext";

import classes from "../css/Form.module.css";
import useInput from "../hook/useInput";
import FormItem from "../components/FormItem";

const Login = () => {
  const username = useInput((name) => name.trim() !== "");
  const password = useInput((pw) => pw.trim() !== "");
  const [errorMessage, setErrorMessage] = useState(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  let formIsValid = false;

  if (username.isValid && password.isValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:4000";
    const body = { username: username.value, password: password.value };

    axios
      .post(`${url}/auth/login`, body)
      .then((res) => {
        const { token, exp, userId } = res.data;
        authCtx.login(token, exp, userId);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMessage(err.response.data);
      });

    username.reset();
    password.reset();
  };

  return (
    <main>
      <h2>Welcome!</h2>
      <form
        className={`${classes.login} ${classes.formHolder}`}
        onSubmit={submitHandler}
      >
        {errorMessage && (
          <p className={classes["error-text"]}>{errorMessage}</p>
        )}
        <FormItem
          input={username}
          id="username"
          label="Username"
          err="Please enter a username"
        />
        <FormItem
          input={password}
          id="password"
          label="Password"
          err="Please enter a password"
          type="password"
        />
        <button disabled={!formIsValid}>Log In</button>
      </form>
      <Link to="/register">Need to Register?</Link>
    </main>
  );
};

export default Login;
