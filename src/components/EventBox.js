import React from "react";
import classes from "../css/EventBox.module.css";
import { useState } from "react";

const EventBox = (props) => {
  const [expandPet, setExpandPet] = useState(false);

  const { title, time, location, petID, petName, notes, petPhoto } =
    props.event;

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
          <h4>{title}</h4>
          <p>{time}</p>
          <p>{location}</p>
          {expandPet && <p>{notes}</p>}
        </div>
        <div className={classes.holder}>
          <div>
            <div
              className={classes.petIcon}
              style={{ backgroundImage: `url(${petPhoto})` }}
            />
            <p>{petName}</p>
          </div>
          {expandPet ? (
            <button onClick={collapseHandler}>Show Less...</button>
          ) : (
            <button onClick={expandHandler}>Show More...</button>
          )}
        </div>
      </div>
    </>
  );
};

export default EventBox;
