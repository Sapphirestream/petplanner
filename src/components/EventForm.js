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
  let pets = [];
  const { event, edit } = props;
  if (props.pets) {
    pets = props.pets;
  }

  //Input States
  const name = useInput((name) => name.trim() !== "", event.name);
  const [selectedPet, setSelectedPet] = useState();
  const [startTime, setStartTime] = useState(
    event.startTime ? new Date(event.startTime) : null
  );
  const [endTime, setEndTime] = useState(
    event.endTime ? new Date(event.endTime) : null
  );
  const [loc, setLoc] = useState(event.location ? event.location : "");
  const [notes, setNotes] = useState("");

  //creating placeholder for calender input
  const calPH = `${new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })} - ${new Date().toLocaleDateString([], {
    month: "short",
    day: "numeric",
  })}`;

  //Style differences
  let classVar = "addEvent";
  if (edit) {
    classVar = "editEvent";
  }

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
    <form
      className={`${classes.formHolder} ${classes.eventForm} ${classes[classVar]}`}
    >
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
          {pets.map((pet) => {
            return (
              <option value={pet.Id} key={pet.Id}>
                {pet.name}
              </option>
            );
          })}
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
