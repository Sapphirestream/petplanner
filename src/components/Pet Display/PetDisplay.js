import classes from "../../css/PetDisplay.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import AuthContext from "../../store/authContext";

import MedTable from "./Meds/MedTable";
import PetForm from "./PetForm";
import WeightTable from "./Weight/WeightTable";
import PermissionTable from "./Permissions/PermissionTable";

// const DUMMY_MEDICATION = [
//   {
//     petId: 1,
//     Id: 1,
//     name: "Kitty Pills",
//     official: "Focalin longName",
//     dosage: "10mg",
//     freq: "once a week",
//     notes: "notes",
//   },
//   {
//     petId: 1,
//     Id: 2,
//     name: "Second Pills",
//     official: "Focalin longName",
//     dosage: "20mg",
//     freq: "Twice a day",
//     notes: "notes for pills ",
//   },
// ];

// const DUMMY_WEIGHT = [
//   { petId: 1, weight: "12lb", weightDate: "August 2nd, 2022", Id: 1 },
//   { petId: 1, weight: "12.5lb", weightDate: "May 2nd, 2022", Id: 2 },
// ];

const PetDisplay = (props) => {
  const {
    Id,
    image,
    name,
    breed,
    type,
    bday,
    vet,
    food,
    notes,
    age,
    medications,
  } = props.pet;

  // Call data from SQL DB
  const { trigger } = props;

  // View States for Tables
  const [editPet, setEditPet] = useState(false);
  const [meds, setMeds] = useState(false);
  const [weight, setWeight] = useState(false);
  const [viewPermissions, setViewPermissions] = useState(false);

  // Fetch Permissions Tables for Each Pet
  const { token, userId, url } = useContext(AuthContext);
  const [permTrigger, setPermTrigger] = useState("");
  const [permissions, setPermissions] = useState("");

  //set current Permission Powers
  const [isOwner, setIsOwner] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  //retrieve Permissions
  useEffect(() => {
    axios
      .get(`${url}/pets/getPerm/${Id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setPermissions(res.data[0].users);

        //Find Current User Permissions
        const currUserPerm = res.data[0].users.filter((user, i) => {
          return user.Id == userId;
        });

        setIsOwner(currUserPerm[0].permission.owner);
        setCanEdit(currUserPerm[0].permission.edit);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Id, token, permTrigger]);

  return (
    <div className={classes.displayBox}>
      <div className="flex">
        <div className={classes.picBox}>
          <img
            src={image}
            className={classes.petPic}
            alt={`${name}'s Avatar`}
          />
        </div>
        <div className={classes.infoBox}>
          <h3>{name}</h3>
          <p>
            {breed} {type}
          </p>
          <p>{age !== null && `${2023 - age} years old`}</p>
          {vet != null && <p>Vet: {vet}</p>}
          {bday != null && (
            <p>Birthday: {new Date(bday).toLocaleDateString()}</p>
          )}
          {food != null && <p>Food: {food}</p>}
          {notes != null && <p>Notes: {notes}</p>}

          {/* BUTTONS  */}

          <div>
            <button
              onClick={(e) => {
                setViewPermissions(!viewPermissions);
              }}
            >
              {viewPermissions ? "Hide" : "Show"} Permissions
            </button>
            <button
              onClick={(e) => {
                setMeds(!meds);
              }}
            >
              {meds ? "Hide" : "Show"} Medication
            </button>
            <button
              onClick={(e) => {
                setWeight(!weight);
              }}
            >
              {weight ? "Hide" : "Show"} Weight History
            </button>
            {canEdit && !editPet && (
              <button
                onClick={(e) => {
                  setViewPermissions(false);
                  setMeds(false);
                  setWeight(false);
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
                Cancel Editing Pet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PERMISSION */}

      {viewPermissions && (
        <PermissionTable
          trigger={setPermTrigger}
          permissions={permissions}
          petId={Id}
          isOwner={isOwner}
        />
      )}

      {/* MEDICATION */}

      {meds && (
        <MedTable
          meds={medications}
          trigger={trigger}
          petId={Id}
          canEdit={canEdit}
        />
      )}

      {/* WEIGHT RECORDS  */}

      {weight && (
        <WeightTable
          weight={props.pet.weights}
          trigger={trigger}
          petId={Id}
          canEdit={canEdit}
        />
      )}

      {/* EDIT PETS  */}

      {editPet && (
        <PetForm
          cancel={setEditPet}
          pet={props.pet}
          edit={true}
          trigger={trigger}
        />
      )}
    </div>
  );
};

export default PetDisplay;
