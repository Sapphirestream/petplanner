import { useState } from "react";

import EventBox from "./EventBox";
import EventForm from "./EventForm";

import classes from "../css/EventBox.module.css";

const emptyEvent = {
  Id: null,
  petId: null,
  completion: false,
  location: null,
  name: "",
  notes: null,
  petEdit: true,
  startTime: null,
  endTime: null,
};

const DateDisplay = (props) => {
  const currDate = new Date().toDateString();
  let events = [{ Id: null }];
  if (props.events) {
    events = props.events;
  }

  const { pets, date, trigger } = props;
  const [addEvent, setAddEvent] = useState(false);

  return (
    <div className={classes.dateDisplay}>
      <h4>{date}</h4>
      {events.map((event) => {
        return (
          <EventBox
            event={event}
            key={event.Id}
            pets={pets}
            trigger={trigger}
          />
        );
      })}
      <button
        onClick={(e) => {
          setAddEvent(!addEvent);
        }}
      >
        Add Event
      </button>
      {addEvent && (
        <EventForm
          edit={false}
          event={emptyEvent}
          pets={pets}
          trigger={trigger}
          close={setAddEvent}
        />
      )}
    </div>
  );
};
export default DateDisplay;
