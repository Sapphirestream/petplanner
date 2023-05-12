import { useState, useContext } from "react";
import useInput from "../../../hook/useInput";
import FormItem from "../../FormItem";
import DatePicker from "react-datepicker";
import axios from "axios";

import "../../../css/react-datepicker.css";
import classes from "../../../css/Form.module.css";
import AuthContext from "../../../store/authContext";

const WeightForm = (props) => {
  const { token, url } = useContext(AuthContext);
  const { edit, close, trigger } = props;

  // set starting Weight Inputs based on Editing or Adding
  const weight = useInput(
    (w) => w.trim().replace(/\D+/g, "") !== "",
    edit ? `${props.weight.weight}` : ""
  );
  const [startDate, setStartDate] = useState(
    edit ? new Date(props.weight.weightDate) : new Date()
  );

  //Form Validation
  let formIsValid = false;
  let dateClass = `${classes.calender}`;

  if (startDate == null) {
    dateClass = `${classes.invalid}`;
  }

  if (weight.isValid && startDate != null) {
    formIsValid = true;
  }

  // Add Weight Record
  const submitHandler = (e) => {
    e.preventDefault();

    const weightItem = {
      weight: weight.value.trim().replace(/[^0-9.]/g, ""),
      weightDate: startDate,
      petId: edit ? props.weight.petId : props.petId,
    };

    if (!edit) {
      // ADD RECORD
      axios
        .post(`${url}/pets/addWeight`, weightItem, {
          headers: { authorization: token },
        })
        .then(() => {
          weight.reset();
          trigger(Math.random());
        })
        .catch((err) => console.log(err));
    } else {
      //EDIT RECORD
      axios
        .put(`${url}/pets/editWeight/${props.weight.Id}`, weightItem, {
          headers: { authorization: token },
        })
        .then((res) => {
          close(false);
          trigger(Math.random());
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form className={`${classes.sideForm} ${classes.weightForm}`}>
      <FormItem
        input={weight}
        id="weight"
        label="Weight"
        err="Please enter a number"
        placeholder="Weight (lbs)"
      />

      <div className="flex">
        <label>Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          className={dateClass}
        />
      </div>
      <button disabled={!formIsValid} onClick={submitHandler} className="right">
        {edit ? "Edit Record" : "Add Record"}
      </button>

      <button
        className="right"
        onClick={(e) => {
          e.preventDefault();
          close(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default WeightForm;
