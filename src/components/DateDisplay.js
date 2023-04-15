import EventBox from "./EventBox";

import classes from "../css/EventBox.module.css";

const DUMMY_EVENTS = [
  {
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

  return (
    <div className={classes.dateDisplay}>
      <h4>{currDate}</h4>
      <EventBox event={DUMMY_EVENTS[0]} />
      <EventBox event={DUMMY_EVENTS[1]} />
    </div>
  );
};

export default DateDisplay;
