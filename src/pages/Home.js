import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import Carousel from "../components/Carousel/Carousel";
import DateDisplay from "../components/DateDisplay";

const Home = () => {
  const { userId, token, url } = useContext(AuthContext);
  const [pets, setPets] = useState();
  const [events, setEvents] = useState();
  const [dates, setDates] = useState([]);
  const [selectedPet, setSelectedPet] = useState([]);
  const [eventTrigger, setEventTrigger] = useState("");

  //Retrieve Pet Ids
  useEffect(() => {
    if (!userId) {
      console.log("No User Id");
      return;
    } else {
      axios
        .get(`${url}/events/getPetId/${userId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setPets(res.data);
          //set selected pet to All by default
          setSelectedPet(res.data);
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, token]);

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
        //console.log(new Date(res.data[0].startTime).toDateString());

        //always include current day
        let date = [new Date().toDateString()];

        // pull out dates with events
        for (let i = 0; i < res.data.length; i++) {
          let prevDay = new Date().toDateString();
          const day = new Date(res.data[i].startTime).toDateString();

          if (i > 0) {
            prevDay = new Date(res.data[i - 1].startTime).toDateString();
          }

          if (prevDay != day) {
            date.push(day);
          }
        }

        setDates(date);
        console.log("event axios call", eventTrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, token, eventTrigger]);

  return (
    <>
      <Carousel
        pets={pets}
        setSelectedPet={setSelectedPet}
        selectedPet={selectedPet}
      />
      {dates.map((date) => {
        //filter Events for Correct Date
        const dateEvents = events.filter((event) => {
          return new Date(event.startTime).toDateString() == date;
        });

        //filter Events for Selected Pet
        let filteredEvents = [];
        for (let i = 0; i < dateEvents.length; i++) {
          for (let n = 0; n < selectedPet.length; n++) {
            if (selectedPet[n].Id === dateEvents[i].petId) {
              filteredEvents.push(dateEvents[i]);
            }
          }
        }

        if (filteredEvents.length == 0 && date != dates[0]) {
          return;
        }

        return (
          <DateDisplay
            pets={pets}
            events={filteredEvents}
            date={date}
            key={`date${date}`}
            trigger={setEventTrigger}
          />
        );
      })}
    </>
  );
};

export default Home;
