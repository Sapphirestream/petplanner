import React from "react";
import { useState } from "react";
import classes from "../css/EventBox.module.css";

import EventForm from "./EventForm";

const EventBox = (props) => {
  const [editPet, setEditPet] = useState(false);
  const { trigger } = props;

  const {
    Id,
    completion,
    location,
    name,
    notes,
    petEdit,
    petId,
    petImage,
    petName,
    reminders,
    startTime,
    endTime,
  } = props.event;

  const startTimeFormat = new Date(startTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  let endTimeFormat = null;

  if (endTime != null && endTime != startTime) {
    endTimeFormat = new Date(endTime).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const expandHandler = (event) => {
    event.preventDefault();
    setEditPet(true);
  };

  const collapseHandler = (event) => {
    event.preventDefault();
    setEditPet(false);
  };

  return (
    <div className={classes.eventBox}>
      <div className={classes.eventContent}>
        <div className={classes.holder}>
          <div className={classes.checkbox} />
          {false && <p className={classes.routine}>Routine</p>}
        </div>
        <div className={classes.textHolder}>
          <h4>{name}</h4>
          <p>
            {startTimeFormat}
            {endTimeFormat && ` - ${endTimeFormat}`}
          </p>
          <p>{location}</p>
          <p>{notes}</p>
        </div>
        <div className={classes.holder}>
          <div>
            <div
              className={classes.petIcon}
              style={{ backgroundImage: `url(${petImage})` }}
            />
            <p>{petName}</p>
          </div>
          {editPet ? (
            <button onClick={collapseHandler} className="button2">
              Stop Editing...
            </button>
          ) : (
            <button onClick={expandHandler} className="button2">
              Edit...
            </button>
          )}
        </div>
      </div>
      {editPet && (
        <EventForm
          edit={true}
          event={props.event}
          pets={props.pets}
          trigger={trigger}
          close={setEditPet}
        />
      )}
    </div>
  );
};

export default EventBox;
