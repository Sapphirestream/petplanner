import { useState } from "react";

import EventBox from "./EventBox";
import EventForm from "./EventForm";

import classes from "../css/EventBox.module.css";

const DateDisplay = (props) => {
  const currDate = new Date();
  let tomorrow = new Date(currDate);
  tomorrow.setDate(currDate.getDate() + 1);

  let events = [{ Id: null }];
  if (props.date) {
    events = props.events;
  }

  const { pets, date, trigger } = props;
  const [addEvent, setAddEvent] = useState(false);

  let dateString = "";

  if (currDate.toDateString() === date) {
    dateString = "Today • ";
  }

  if (tomorrow.toDateString() === date) {
    dateString = "Tomorrow • ";
  }

  dateString +=
    new Date(date).toLocaleDateString([], {
      month: "long",
      day: "numeric",
    }) +
    " • " +
    new Date(date).toLocaleDateString([], {
      weekday: "long",
    });

  const emptyEvent = {
    Id: null,
    petId: null,
    completion: false,
    location: null,
    name: "",
    notes: null,
    petEdit: true,
    startTime: new Date(date).setHours(9, 0, 0),
    endTime: null,
  };

  return (
    <div className={classes.dateDisplay}>
      <h2>{dateString}</h2>
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
      {!addEvent && (
        <button
          onClick={(e) => {
            setAddEvent(!addEvent);
          }}
        >
          Add Event
        </button>
      )}
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
