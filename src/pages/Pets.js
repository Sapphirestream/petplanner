import { useState } from "react";

import classes from "../css/PetDisplay.module.css";
import PetDisplay from "../components/Pet Display/PetDisplay";
import PetForm from "../components/Pet Display/PetForm";

const DUMMY_PETS = [
  {
    id: 1,
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
    id: 2,
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

  return (
    <div>
      {DUMMY_PETS.map((pet) => {
        return <PetDisplay pet={pet} key={pet.id} />;
      })}
      {showAddPet && <PetForm userId={1} cancel={setShowAddPet} edit={false} />}
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
