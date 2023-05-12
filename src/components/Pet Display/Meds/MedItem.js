import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../../store/authContext";
import classes from "../../../css/PetDisplay.module.css";

const MedItem = (props) => {
  const { petId, name, official, dosage, freq, notes, Id } = props.med;
  const { showEdit, setMeds, setMedsForm, trigger } = props;
  const { userId, token, url } = useContext(AuthContext);

  //set Form to current Medication to Edit
  const setMedsHandler = (e) => {
    e.preventDefault();

    const currentMed = {
      petId: petId,
      Id: Id,
      name: name,
      official: official != null ? official : "",
      dosage: dosage != null ? dosage : "",
      freq: freq != null ? freq : "",
      notes: notes != null ? notes : "",
    };

    setMeds(currentMed);
    setMedsForm(true);
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    axios
      .delete(`${url}/pets/deleteMed/${Id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(`Deleted Medication ${Id}`);
        trigger(Math.random());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td> {name}</td>
      <td> {official}</td>
      <td> {dosage}</td>
      <td> {freq}</td>
      <td> {notes}</td>
      {showEdit && (
        <td>
          <p className="flex margin-zero">
            <button onClick={setMedsHandler} className="button2">
              Edit
            </button>
            <button onClick={deleteHandler} className="button2">
              Delete
            </button>
          </p>
        </td>
      )}
    </tr>
  );
};

export default MedItem;
