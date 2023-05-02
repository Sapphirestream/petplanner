import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import axios from "axios";

import useInput from "../hook/useInput";
import FormItem from "../components/FormItem";
import AuthContext from "../store/authContext";

import "../css/react-datepicker.css";
import classes from "../css/Form.module.css";

const EventForm = (props) => {
  //Input States
  const name = useInput((name) => name.trim() !== "");
  const [selectedPet, setSelectedPet] = useState("1");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loc, setLoc] = useState("");
  const [notes, setNotes] = useState("");

  //creating placeholder for calender input
  const currTime = new Date().toLocaleTimeString().split(":");
  const currM = new Date().toLocaleTimeString().split(" ");
  const currDate = new Date().toDateString().split(" ");

  let calPH = `${currTime[0]}:${currTime[1]} ${currM[1]} - ${currDate[1]} ${currDate[2]}`;

  const { token, userId, url } = useContext(AuthContext);

  //Submit form
  const submitHandler = (e) => {
    e.preventDefault();

    const event = {
      name: name.value,
      petId: selectedPet,
      startTime: startTime,
      endTime: endTime,
      completion: false,
      reminders: false,
      location: loc != "" ? loc : null,
      notes: notes != "" ? notes : null,
    };

    console.log(event);

    axios
      .post(`${url}/events/addEvent`, event, {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={`${classes.formHolder} ${classes.eventForm}`}>
      {/* NAME */}
      <FormItem input={name} id="eventName" label="Title" />

      {/* PET SELECTION */}

      <div>
        <label>Pet: </label>
        <select
          className={classes.valid}
          value={selectedPet}
          onChange={(e) => setSelectedPet(e.target.value)}
        >
          <option value="1">Topaz</option>
          <option value="2">Lotus</option>
        </select>
      </div>

      {/* START TIME  */}

      <div className="flex">
        <label className={classes.calLabel}>Start Time: </label>
        <DatePicker
          id="startTime"
          selected={startTime}
          onChange={(date) => {
            setStartTime(date);
            endTime == startTime && setEndTime(date);
          }}
          showTimeSelect
          dateFormat="h:mm aa - MMM d"
          placeholderText={`${calPH}`}
          minDate={subDays(new Date(), 0)}
          className={classes.calender}
        />
      </div>

      {/* END TIME */}

      <div className="flex">
        <label className={classes.calLabel}>End Time: </label>
        <DatePicker
          id="endTime"
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          dateFormat="h:mm aa - MMM d"
          placeholderText={`${calPH}`}
          minDate={subDays(startTime, 0)}
          className={classes.calender}
        />
      </div>

      {/* LOCATION  */}

      <div>
        <label>Location:</label>
        <input
          className={classes.valid}
          placeholder="Address..."
          value={loc}
          onChange={(e) => {
            setLoc(e.target.value);
          }}
        />
      </div>

      {/* NOTES  */}

      <div>
        <label>Notes:</label>
        <textarea
          placeholder="Notes..."
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
      </div>

      {/* BUTTONS */}

      <div>
        <button type="reset">Cancel</button>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </form>
  );
};

export default EventForm;
