import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import classes from "../css/PetDisplay.module.css";
import PetDisplay from "../components/Pet Display/PetDisplay";
import PetForm from "../components/Pet Display/PetForm";
import AuthContext from "../store/authContext";
import Modal from "../components/UI/Modal";

// const DUMMY_PETS = [
//   {
//     Id: 1,
//     userId: 1,
//     name: "Topaz",
//     image:
//       "https://www.catster.com/wp-content/uploads/2018/09/Brown-tabby-cat-close-up-outdoors.jpg.optimal.jpg",
//     type: "Cat",
//     breed: "Tabby",
//     vet: "I-20 Animal Medical Center",
//     age: "2015",
//     bday: "Januaray 7th, 2015", // make this an actual date object
//     food: "Beyond Simply Grain Free Wild-Caught Whitefish & Cage-Free Egg Recipe Dry Cat Food",
//     notes: "Here are the notes for Topaz",
//   },
//   {
//     Id: 2,
//     userId: 2,
//     name: "Lotus",
//     image:
//       "https://www.pumpkin.care/wp-content/uploads/2021/01/Siamese-Hero.jpg",
//     type: "Cat",
//     breed: "Siamese",
//     vet: "I-20 Animal Medical Center",
//     age: "2018",
//     bday: "August 8th, 2018", // make this an actual date object
//     food: "Beyond Simply Grain Free Wild-Caught Whitefish & Cage-Free Egg Recipe Dry Cat Food",
//     notes: "Here are the notes for Lotus",
//   },
// ];

const blankPet = {
  petId: null,
  name: "",
  image: "",
  type: "",
  breed: "",
  bday: null,
  age: "",
  vet: "",
  food: "",
  notes: "",
};

const Pets = () => {
  const [showAddPet, setShowAddPet] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [ownedPets, setOwnedPets] = useState([]);
  const [viewPets, setViewPets] = useState([]);
  const { token, userId, url, log } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/pets/getPets`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        //setPets(res.data.pets);

        const owner = res.data.pets.filter((perm) => {
          return perm.permission.owner === true;
        });

        const viewers = res.data.pets.filter((perm) => {
          return perm.permission.owner === false;
        });

        setOwnedPets(owner);
        setViewPets(viewers);
      })
      .then((res) => {})
      .catch((err) => {
        console.log("ERROR FROM GET PETS CALL");
        console.log(err.response);
        navigate("/login");
      });
  }, [userId, token, trigger]);

  return (
    <>
      {ownedPets.map((pet) => {
        return (
          <PetDisplay pet={pet} key={`pet ${pet.Id}`} trigger={setTrigger} />
        );
      })}
      {viewPets.map((pet) => {
        return (
          <PetDisplay pet={pet} key={`pet ${pet.Id}`} trigger={setTrigger} />
        );
      })}
      {showAddPet && (
        <PetForm
          cancel={setShowAddPet}
          edit={false}
          trigger={setTrigger}
          pet={blankPet}
        />
      )}
      {!showAddPet && (
        <div className={classes.addPetBtn}>
          <button
            onClick={(e) => {
              setShowAddPet(true);
            }}
          >
            Add Pet
          </button>
        </div>
      )}
    </>
  );
};

export default Pets;
