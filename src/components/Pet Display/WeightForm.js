import { useState } from "react";
import useInput from "../../hook/useInput";
import FormItem from "../FormItem";
import DatePicker from "react-datepicker";

import "../../css/react-datepicker.css";
import classes from "../../css/Form.module.css";

const WeightForm = (props) => {
  const weight = useInput((weight) => weight.trim() !== "");
  const [startDate, setStartDate] = useState(new Date());

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
        <label className={classes.calLabel}>Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          className={classes.calender}
        />
      </div>
      <button>Add Record</button>
    </form>
  );
};

export default WeightForm;
