import React from "react";
import { useState } from "react";
import classes from "../css/EventBox.module.css";

import EventForm from "./EventForm";
import Checkbox from "./UI/Checkbox";

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

  const st = new Date(startTime);
  const et = new Date(endTime);

  const startTimeFormat = st.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  //display End Time if it is different
  let endTimeFormat = null;

  if (endTime != null && endTime != startTime) {
    endTimeFormat = et.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    // Display Date if end date is different than start date
    if (st.getDate() != et.getDate() || st.getMonth() != et.getMonth()) {
      endTimeFormat =
        endTimeFormat +
        " (" +
        et.toLocaleDateString([], {
          month: "long",
          day: "numeric",
        }) +
        ")";
    }
  }

  return (
    <div className={classes.eventBox}>
      <div className={classes.eventContent}>
        <div className={classes.holder}>
          <Checkbox canEdit={petEdit} Id={Id} completion={completion} />
          {petEdit ? (
            editPet ? (
              <button
                onClick={() => {
                  setEditPet(!editPet);
                }}
                className="button2"
              >
                Stop Editing
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditPet(!editPet);
                }}
                className="button2"
              >
                Edit...
              </button>
            )
          ) : (
            <button className="hidden"></button>
          )}
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
