import { useState } from "react";

import petClasses from "../../css/PetDisplay.module.css";
import formClasses from "../../css/Form.module.css";

import useInput from "../../hook/useInput";
import FormItem from "../FormItem";

const PetForm = (props) => {
  const { cancel, edit } = props;
  const pet = props.pet;

  //set initial Name so that it will work with the useInput hook
  let initName;
  if (edit) {
    initName = pet.name;
  } else {
    initName = "";
  }

  //transform age back into Years from birthyear
  let initAge;
  if (edit) {
    const currYear = new Date().getFullYear();
    initAge = currYear - pet.age;
  }

  //petName is the only form Item that cannot be blank
  const petName = useInput((name) => name.trim() !== "", initName);

  const [image, setImage] = useState(edit ? pet.image : "");
  const [type, setType] = useState(edit ? pet.type : "");
  const [breed, setBreed] = useState(edit ? pet.breed : "");
  const [age, setAge] = useState(edit ? initAge : "");
  const [vet, setVet] = useState(edit ? pet.vet : "");
  const [bday, setBday] = useState(edit ? pet.bday : "");
  const [food, setFood] = useState(edit ? pet.food : "");
  const [notes, setNotes] = useState(edit ? pet.notes : "");

  return (
    <form className={formClasses.petForm}>
      <FormItem
        input={petName}
        id="petName"
        label="Pet Name"
        err="Please enter a Pet Name"
      />
      <div>
        <label htmlFor="imageUrl">Image:</label>
        <input
          className={formClasses.valid}
          placeholder="Image URL"
          id="imageUrl"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={image}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <input
          className={formClasses.valid}
          placeholder="Dog, Cat, Snake, Bird..."
          id="type"
          onChange={(e) => {
            setType(e.target.value);
          }}
          value={type}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="breed">Breed:</label>
        <input
          className={formClasses.valid}
          placeholder="Tabby, Golden Retriever, Hognose..."
          id="breed"
          onChange={(e) => {
            setBreed(e.target.value);
          }}
          value={breed}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          className={formClasses.valid}
          placeholder="Age (in Years)"
          id="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          value={age}
          type="text"
        />
      </div>

      <div>
        <label htmlFor="vet">Vet:</label>
        <input
          className={formClasses.valid}
          placeholder="Vet Address"
          id="vet"
          onChange={(e) => {
            setVet(e.target.value);
          }}
          value={vet}
          type="text"
        />
      </div>

      {/* ADD DATE PICKER FOR BDAY */}

      <div>
        <label htmlFor="food">Food:</label>
        <input
          className={formClasses.valid}
          placeholder="Purina, Simply Beyond, Iams..."
          id="food"
          onChange={(e) => {
            setFood(e.target.value);
          }}
          value={food}
          type="text"
        />
      </div>

      <div className="flex justify-center">
        <label htmlFor="notes">Notes:</label>
        <textarea
          placeholder="Enter any Notes here..."
          id="notes"
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          value={notes}
        />
      </div>

      {edit && <button>Delete Pet</button>}
      {!edit && (
        <button
          onClick={(e) => {
            cancel(false);
          }}
        >
          Cancel Adding Pet
        </button>
      )}
      <button disabled={!petName.isValid}>{edit ? "Edit" : "Add"} Pet</button>
    </form>
  );
};

export default PetForm;
