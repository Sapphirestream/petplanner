import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "../css/Form.module.css";
import useInput from "../hook/useInput";
import FormItem from "../components/FormItem";
import AuthContext from "../store/authContext";

const Register = (props) => {
  // create input value and function calls for the forms
  const username = useInput((name) => name.trim() !== "");
  const email = useInput((email) => email.includes("@"));
  const firstName = useInput((name) => name.trim() !== "");
  const lastName = useInput((name) => name.trim() !== "");
  const password = useInput((pw) => pw.trim().length >= 8);
  const repeatPassword = useInput((pw) => pw.trim() === password.value);

  //displays error message from axios call
  const [errorMessage, setErrorMessage] = useState(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  //check if form is valid before allowing submission
  let formIsValid = false;

  if (
    username.isValid &&
    email.isValid &&
    firstName.isValid &&
    lastName.isValid &&
    password.isValid &&
    repeatPassword.isValid
  ) {
    formIsValid = true;
  }

  //submit form to backend
  const submitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:4000";
    const body = {
      username: username.value,
      email: email.value,
      firstname: firstName.value,
      lastname: lastName.value,
      password: password.value,
    };

    axios
      .post(`${url}/auth/register`, body)
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
    email.reset();
    firstName.reset();
    lastName.reset();
    password.reset();
    repeatPassword.reset();
  };

  return (
    <main>
      <h2>Welcome!</h2>
      <form className={classes.login} onSubmit={submitHandler}>
        {errorMessage && (
          <p className={classes["error-text"]}>{errorMessage}</p>
        )}
        <FormItem
          input={username}
          id="username"
          label="Username"
          err="Please enter a valid username"
        />

        <FormItem
          input={email}
          id="email"
          label="Email"
          err="Please enter a valid email address"
        />

        <FormItem
          input={firstName}
          id="firstname"
          label="First Name"
          err="Please enter a valid first name"
        />

        <FormItem
          input={lastName}
          id="lastname"
          label="Last Name"
          err="Please enter a valid last name"
        />

        <FormItem
          input={password}
          id="password"
          label="Password"
          err="Please enter a password at least 8 characters long"
          type="password"
        />

        <FormItem
          input={repeatPassword}
          id="repeatPassword"
          label="Password"
          err="Please enter the same password"
          type="password"
          placeholder="Repeat Password"
        />

        <button disabled={!formIsValid}>Register!</button>
      </form>
      <Link to="/login">Need to Login?</Link>
    </main>
  );
};

export default Register;
