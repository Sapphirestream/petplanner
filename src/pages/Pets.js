import { useState, useContext, useEffect } from "react";
import axios from "axios";

import classes from "../css/PetDisplay.module.css";
import PetDisplay from "../components/Pet Display/PetDisplay";
import PetForm from "../components/Pet Display/PetForm";
import AuthContext from "../store/authContext";

const DUMMY_PETS = [
  {
    Id: 1,
    userId: 1,
    name: "Topaz",
    image:
      "https://www.catster.com/wp-content/uploads/2018/09/Brown-tabby-cat-close-up-outdoors.jpg.optimal.jpg",
    type: "Cat",
    breed: "Tabby",
    vet: "I-20 Animal Medical Center",
    age: "2015",
    bday: "Januaray 7th, 2015", // make this an actual date object
    food: "Beyond Simply Grain Free Wild-Caught Whitefish & Cage-Free Egg Recipe Dry Cat Food",
    notes: "Here are the notes for Topaz",
  },
  {
    Id: 2,
    userId: 2,
    name: "Lotus",
    image:
      "https://www.pumpkin.care/wp-content/uploads/2021/01/Siamese-Hero.jpg",
    type: "Cat",
    breed: "Siamese",
    vet: "I-20 Animal Medical Center",
    age: "2018",
    bday: "August 8th, 2018", // make this an actual date object
    food: "Beyond Simply Grain Free Wild-Caught Whitefish & Cage-Free Egg Recipe Dry Cat Food",
    notes: "Here are the notes for Lotus",
  },
];

const Pets = () => {
  const [showAddPet, setShowAddPet] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [pets, setPets] = useState([]);
  const { token, userId } = useContext(AuthContext);
  const url = "http://localhost:4000";

  useEffect(() => {
    axios
      .get(`${url}/pets/getPets/${userId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        //console.log(res.data.pets[0].weights);
        setPets(res.data.pets);
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [userId, token, trigger]);

  return (
    <div>
      {/* {DUMMY_PETS.map((pet) => {
        return <PetDisplay pet={pet} key={pet.Id} />;
      })} */}
      {pets.map((pet) => {
        return (
          <PetDisplay pet={pet} key={`pet ${pet.Id}`} trigger={setTrigger} />
        );
      })}
      {showAddPet && <PetForm cancel={setShowAddPet} edit={false} />}
      {!showAddPet && (
        <button
          onClick={(e) => {
            setShowAddPet(true);
          }}
        >
          Add Pet
        </button>
      )}
    </div>
  );
};

export default Pets;
