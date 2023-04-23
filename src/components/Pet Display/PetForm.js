import { useState, useContext } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import formClasses from "../../css/Form.module.css";
import "../../css/react-datepicker.css";

import useInput from "../../hook/useInput";
import FormItem from "../FormItem";
import AuthContext from "../../store/authContext";

const PetForm = (props) => {
  const { token, userId } = useContext(AuthContext);
  const { cancel, edit } = props;
  const pet = props.pet;
  const defaultImage =
    "https://www.maisonette.gr/wp-content/uploads/2018/01/pet-icon.png";

  //set initial Name so that it will work with the useInput hook
  let initName;
  if (edit) {
    initName = pet.name;
  } else {
    initName = "";
  }

  //transform age back into Years from birthyear
  let initAge;
  const currYear = new Date().getFullYear();
  if (edit) {
    initAge = currYear - pet.age;
  }

  //petName is the only form Item that cannot be blank
  const petName = useInput((name) => name.trim() !== "", initName);

  //set Initial input based on editing or adding a pet
  const [image, setImage] = useState(edit ? pet.image : "");
  const [type, setType] = useState(
    edit ? (pet.type != null ? pet.type : "") : ""
  );
  const [breed, setBreed] = useState(
    edit ? (pet.breed != null ? pet.breed : "") : ""
  );
  const [bday, setBday] = useState(edit ? pet.bday : null);
  const [age, setAge] = useState(edit ? (pet.age != null ? initAge : "") : "");
  const [vet, setVet] = useState(edit ? (pet.vet != null ? pet.vet : "") : "");
  const [food, setFood] = useState(
    edit ? (pet.food != null ? pet.food : "") : ""
  );
  const [notes, setNotes] = useState(
    edit ? (pet.notes != null ? pet.notes : "") : ""
  );

  const [ageDisable, setAgeDisable] = useState(false);

  //set and Disable Age if Birthday is entered
  const bdayHandler = (date) => {
    if (date) {
      setBday(date);
      setAgeDisable(true);

      setAge(currYear - date.getFullYear());
    } else {
      setBday(null);
      setAgeDisable(false);
    }
  };

  //SUBMIT FORM
  const submitHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:4000";

    //create pet object // turn empty strings into nulls
    const pet = {
      name: petName.value,
      image: image === "" ? defaultImage : image,
      type: type === "" ? null : type,
      breed: breed === "" ? null : breed,
      bday,
      age: age === "" ? null : currYear - age,
      vet: vet === "" ? null : vet,
      food: food === "" ? null : food,
      notes: notes === "" ? null : notes,
      userId: edit ? null : userId,
    };

    if (edit) {
      axios
        .put(`${url}/pets/editPet/${props.pet.Id}`, pet)
        .then((res) => {
          console.log(res);
          cancel(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${url}/pets/addPet`, pet, { headers: { authorization: token } })
        .then(() => {
          cancel(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form className={`${formClasses.petForm} ${formClasses.formHolder}`}>
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

      {/* DATE PICKER FOR BDAY */}
      <div className="flex">
        <label className={formClasses.calLabel}>Birthday:</label>
        <DatePicker
          selected={bday}
          onChange={(date) => bdayHandler(date)}
          className={formClasses.calender}
          placeholderText="Enter Birthday OR Age"
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          disabled={ageDisable}
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
      <div>
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
        <button disabled={!petName.isValid} onClick={submitHandler}>
          {edit ? "Edit" : "Add"} Pet
        </button>
      </div>
    </form>
  );
};

export default PetForm;
