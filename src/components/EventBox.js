import React from "react";
import classes from "../css/EventBox.module.css";
import { useState } from "react";

const EventBox = (props) => {
  const [expandPet, setExpandPet] = useState(false);

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
  } = props.event;

  const expandHandler = (event) => {
    event.preventDefault();
    setExpandPet(true);
  };

  const collapseHandler = (event) => {
    event.preventDefault();
    setExpandPet(false);
  };

  return (
    <>
      <div className={classes.eventBox}>
        <div className={classes.holder}>
          <div className={classes.checkbox} />
          <p className={classes.routine}>Routine</p>
        </div>
        <div className={classes.textHolder}>
          <h4>{name}</h4>
          <p>{startTime}</p>
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
          {expandPet ? (
            <button onClick={collapseHandler}>Stop Editing...</button>
          ) : (
            <button onClick={expandHandler}>Edit...</button>
          )}
        </div>
      </div>
    </>
  );
};

export default EventBox;
