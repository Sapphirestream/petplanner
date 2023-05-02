import { useState, useContext } from "react";
import axios from "axios";

import useInput from "../../../hook/useInput";
import classes from "../../../css/Form.module.css";
import AuthContext from "../../../store/authContext";

const PermissionForm = (props) => {
  const permInput = useInput((name) => name.trim() !== "");
  const [canEdit, setCanEdit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { petId, trigger, close } = props;

  const { token, url } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const permission = {
      username: permInput.value,
      petId: petId,
      owner: false,
      edit: canEdit,
    };

    axios
      .post(`${url}/pets/addPermission`, permission, {
        headers: { authorization: token },
      })
      .then(() => {
        permInput.reset();
        close(false);
        trigger(Math.random());
      })
      .catch((err) => {
        if (err.response.data) {
          setErrorMsg(err.response.data);
        } else {
          console.log(err);
        }
      });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="permUsername">Add User: </label>
        <input
          className={permInput.hasError ? classes.invalid : classes.valid}
          placeholder="Username"
          id="permUsername"
          onChange={permInput.valueChangeHandler}
          onBlur={permInput.inputBlurHandler}
          value={permInput.value}
          type="text"
        />

        <input
          type="checkbox"
          id="permEditCheck"
          value={canEdit}
          onChange={() => {
            setCanEdit((state) => {
              return !state;
            });
          }}
        />
        <label htmlFor="permEditCheck">Can Edit?</label>

        <button disabled={!permInput.isValid}>Add</button>
      </form>
      {permInput.hasError && (
        <p className={classes["error-text"]}>Please Enter a Valid Username</p>
      )}
      {errorMsg && <p className={classes["error-text"]}>{errorMsg}</p>}
    </>
  );
};

export default PermissionForm;
