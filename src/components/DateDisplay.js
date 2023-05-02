import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

import EventBox from "./EventBox";
import EventForm from "./EventForm";

import classes from "../css/EventBox.module.css";

const DUMMY_EVENTS = [
  {
    Id: 1,
    title: "event one",
    time: "8:00 - 10:00 am",
    location: `40 Middle River Rd.
  Stockbridge, GA 30281`,
    petID: "1",
    petName: "Lotus",
    petPhoto:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg",
    notes: "Here are some notes entered by the user",
  },
  {
    Id: 2,
    title: "event two",
    time: "10:00 - 10:30 am",
    location: `9524 Victoria Dr.
    Chambersburg, PA 17201`,
    petID: "2",
    petName: "Topaz",
    petPhoto:
      "https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg",
    notes: "Here are some MORE notes entered by the user",
  },
];

const DateDisplay = (props) => {
  const currDate = new Date().toDateString();
  const [events, setEvents] = useState([]);
  const [eventTrigger, setEventTrigger] = useState("");

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
        return <EventBox event={event} key={event.Id} />;
      })}
      <EventForm />
    </div>
  );
};

export default DateDisplay;
