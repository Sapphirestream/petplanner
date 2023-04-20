import classes from "../../css/PetDisplay.module.css";
import { useState } from "react";
import MedItem from "./MedItem";
import WeightItem from "./WeightItem";
import PetForm from "./PetForm";

const DUMMY_MEDICATION = [
  {
    petId: 1,
    id: 1,
    name: "Kitty Pills",
    official: "Focalin longName",
    dosage: "10mg",
    startDate: "April 2020",
    endDate: "September 10th, 2024",
    frequency: "once a week",
    notes: "notes",
  },
  {
    petId: 1,
    id: 1,
    name: "Second Pills",
    official: "Focalin longName",
    dosage: "20mg",
    startDate: "April 2020",
    endDate: "September 10th, 2024",
    frequency: "Twice a day",
    notes: "notes for pills ",
  },
];

const DUMMY_WEIGHT = [
  { petId: 1, weight: "12lb", weightDate: "August 2nd, 2022", id: 1 },
  { petId: 1, weight: "12.5lb", weightDate: "May 2nd, 2022", id: 2 },
];

const PetDisplay = (props) => {
  const { image, name, breed, type, bday, vet, food, notes, age } = props.pet;

  const [editPet, setEditPet] = useState(false);
  const [meds, setMeds] = useState(false);
  const [medsEdit, setMedsEdit] = useState(false);
  const [weight, setWeight] = useState(false);
  const [weightEdit, setWeightEdit] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [permissionsEdit, setPermissionsEdit] = useState(false);

  return (
    <div className={classes.displayBox}>
      <div className="flex">
        <div className={classes.picBox}>
          <img src={image} className={classes.petPic} />
        </div>
        <div className={classes.infoBox}>
          <h3>{name}</h3>
          <p>
            {breed} {type}
          </p>
          <p>{2023 - age} years old </p>
          <p>Vet: {vet}</p>
          <p>Birthday: {bday}</p>
          <p>Food: {food}</p>
          <p>Notes: {notes}</p>
          <div>
            <button>Show Permissions</button>
            <button
              onClick={(e) => {
                setMeds(!meds);
              }}
            >
              Show Medication
            </button>
            <button
              onClick={(e) => {
                setWeight(!weight);
              }}
            >
              Show Weight History
            </button>
            {!editPet && (
              <button
                onClick={(e) => {
                  setPermissions(false);
                  setWeight(false);
                  setMeds(false);
                  setEditPet(true);
                }}
              >
                Edit Pet
              </button>
            )}
            {editPet && (
              <button
                onClick={(e) => {
                  setEditPet(false);
                }}
              >
                {" "}
                Cancel Editing Pet
              </button>
            )}
          </div>
        </div>
      </div>
      {meds && (
        <div className={classes.expandBox}>
          <h4>Medication</h4>
          <table>
            <tr>
              <th> Name</th>
              <th> Official</th>
              <th> Dosage</th>
              <th> Start Date</th>
              <th> End Date</th>
              <th> Frequency</th>
              <th> Notes</th>
              {medsEdit && <th className={classes.editRow}> Edit </th>}
            </tr>
            {DUMMY_MEDICATION.map((med) => {
              return (
                <MedItem med={med} key={med.id + 10} showEdit={medsEdit} />
              );
            })}
          </table>
          <div>
            <button>Add Medication</button>
            <button
              onClick={(e) => {
                setMedsEdit(!medsEdit);
              }}
            >
              {!medsEdit ? "Edit Medication" : "Stop Editing"}
            </button>
          </div>
        </div>
      )}

      {weight && (
        <div className={classes.expandBox}>
          <h4> Weight History </h4>
          <table>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              {weightEdit && <th className={classes.editRow}>Edit</th>}
            </tr>
            {DUMMY_WEIGHT.map((weight) => {
              return (
                <WeightItem
                  weight={weight}
                  showEdit={weightEdit}
                  key={weight.id + 100}
                />
              );
            })}
          </table>
          <div>
            <button>Add Record</button>
            <button
              onClick={(e) => {
                setWeightEdit(!weightEdit);
              }}
            >
              {!weightEdit ? "Edit Records" : "Stop Editing"}
            </button>
          </div>
        </div>
      )}

      {editPet && <PetForm cancel={setEditPet} pet={props.pet} edit={true} />}
    </div>
  );
};

export default PetDisplay;
