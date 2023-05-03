import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

import EventBox from "./EventBox";
import EventForm from "./EventForm";

import classes from "../css/EventBox.module.css";

const emptyEvent = {
  Id: null,
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
  const [events, setEvents] = useState([]);
  const [eventTrigger, setEventTrigger] = useState("");
  const { pets, event } = props;

  const { token, userId, url } = useContext(AuthContext);

  //Retrieve Events
  useEffect(() => {
    if (!userId) {
      console.log("No User Id");
      return;
    }
    axios
      .get(`${url}/events/getEvents/${userId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        //sort event by earliest start time
        res.data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        setEvents(res.data);
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [userId, token, eventTrigger]);

  return (
    <div className={classes.dateDisplay}>
      <h4>{currDate}</h4>
      {events.map((event) => {
        return <EventBox event={event} key={event.Id} pets={pets} />;
      })}
      <EventForm edit={false} event={emptyEvent} pets={pets} />
    </div>
  );
};

export default DateDisplay;
