import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import Carousel from "../components/Carousel/Carousel";
import DateDisplay from "../components/DateDisplay";

const Home = () => {
  const { userId, token, url } = useContext(AuthContext);
  const [pets, setPets] = useState();

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
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, token]);

  return (
    <>
      <Carousel pets={pets} />
      <DateDisplay pets={pets} />
    </>
  );
};

export default Home;
