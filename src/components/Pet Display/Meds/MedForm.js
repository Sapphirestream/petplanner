import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../store/authContext";
import useInput from "../../../hook/useInput";

import FormItem from "../../FormItem";

import classes from "../../../css/Form.module.css";

const MedForm = (props) => {
  const { petId, meds, close, trigger } = props;
  const { url, token, userId } = useContext(AuthContext);

  //Input States & Validation
  const name = useInput((name) => name.trim() !== "", meds.name);
  const official = useInput((input) => true, meds.official);
  const dosage = useInput((input) => true, meds.dosage);
  const freq = useInput((input) => true, meds.freq);
  const [notes, setNotes] = useState(meds.notes);

  const submitHandler = (e) => {
    e.preventDefault();

    const medication = {
      petId: petId,
      name: name.value,
      official: official.value === "" ? null : official.value,
      dosage: dosage.value === "" ? null : dosage.value,
      freq: freq.value === "" ? null : freq.value,
      notes: notes === "" ? null : notes,
    };

    console.log(url);
    if (meds.Id) {
      //EDIT MEDICATION
      axios
        .put(`${url}/pets/editMed/${meds.Id}`, medication, {
          headers: { authorization: token },
        })
        .then((res) => {
          close();
          trigger(Math.random());
        })
        .catch((err) => console.log(err));
    } else {
      //ADD MEDICATION
      axios
        .post(`${url}/pets/addMed`, medication, {
          headers: { authorization: token },
        })
        .then(() => {
          close();
          trigger(Math.random());
        })
        .catch((err) => console.log(err));
    }

    console.log(medication);
  };

  return (
    <div>
      <form
        className={`${classes.petForm} ${classes.formHolder}`}
        onSubmit={submitHandler}
      >
        <FormItem
          input={name}
          id="name"
          label="Name"
          placeholder="Medication Name"
          err="Please enter a medication name"
        />
        <FormItem
          input={official}
          id="official"
          label="Official"
          placeholder="Official Medication Name"
        />
        <FormItem
          input={dosage}
          id="dosage"
          label="Dosage"
          placeholder="5mg, 10mg..."
        />
        <FormItem
          input={freq}
          id="freq"
          label="Frequency"
          placeholder="Saturdays, Mornings and Evenings, Once a Month..."
        />
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
          <button onClick={close}>Cancel</button>
          <button onClick={submitHandler} disabled={!name.isValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedForm;
