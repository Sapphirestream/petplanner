import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import Carousel from "../components/Carousel/Carousel";
import DateDisplay from "../components/DateDisplay";

const Home = () => {
  const [eventTrigger, setEventTrigger] = useState();
  const { userId, token, url } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) {
      console.log("No User Id");
      return;
    } else {
      axios
        .get(`${url}/pets/getPets/${userId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          //setPets(res.data.pets);
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, token, eventTrigger]);

  return (
    <>
      <Carousel />

      <DateDisplay />
    </>
  );
};

export default Home;
