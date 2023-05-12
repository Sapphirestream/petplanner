import { useState } from "react";
import classes from "../../../css/PetDisplay.module.css";
import MedItem from "./MedItem";
import MedForm from "./MedForm";

//Add Med prop
const blankMed = {
  name: "",
  official: "",
  dosage: "",
  freq: "",
  notes: "",
  Id: null,
};

const MedTable = (props) => {
  const [medsAdd, setMedsAdd] = useState(false);
  const [medsEdit, setMedsEdit] = useState(false);
  const [medsForm, setMedsForm] = useState(false);
  const [meds, setMeds] = useState(blankMed);

  const { canEdit, petId, trigger } = props;

  // Add Medication Button & Cancel Button(MedFrom)
  const AddMedHandler = (e) => {
    e && e.preventDefault();

    //Kicks user out of Editing mode so that they do not accidently erase their new medication by starting to edit an existing medication
    setMedsEdit(false);

    // Add and Form states should both open and close at the same time. When opened, the Form should be reset so that any previous entries or edits are whiped
    if (medsAdd) {
      setMedsAdd(false);
      setMedsForm(false);
    } else {
      setMeds(blankMed);
      setMedsAdd(true);
      setMedsForm(true);
    }
  };

  //Add Edit Handler
  const EditMedHandler = (e) => {
    e.preventDefault();

    //Form opening is handeled by the specific MedItem and therefore should start out closed
    //Add and Edit cannot be open at the same time because they use the same Form
    setMedsAdd(false);
    setMedsForm(false);

    if (medsEdit) {
      setMedsEdit(false);
    } else {
      setMedsEdit(true);
    }
  };

  // Close Edit form individually without exiting Edit mode entirely
  const FormClose = (e) => {
    setMedsForm(false);
  };

  //display if there are no items
  const blankTable = (
    <tr className={classes.blank}>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      {medsEdit && <td></td>}
    </tr>
  );

  return (
    <div className={classes.expandBox}>
      <h4>Medication</h4>
      <table>
        <thead>
          <tr>
            <th> Name</th>
            <th> Official</th>
            <th> Dosage</th>
            <th> Frequency</th>
            <th> Notes</th>
            {medsEdit && <th className={classes.editRow}> Edit </th>}
          </tr>
        </thead>
        <tbody>
          {props.meds.map((med) => {
            return (
              <MedItem
                med={med}
                key={`med${med.Id}${med.petId}`}
                showEdit={medsEdit}
                setMeds={setMeds}
                setMedsForm={setMedsForm}
                trigger={trigger}
              />
            );
          })}
          {props.meds.length === 0 && blankTable}
        </tbody>
      </table>

      {medsForm && (
        <MedForm
          petId={petId}
          meds={meds}
          key={meds.Id}
          close={medsAdd ? AddMedHandler : FormClose}
          trigger={trigger}
        />
      )}

      {canEdit && (
        <div>
          <button onClick={AddMedHandler}>
            {!medsAdd ? "Add Medication" : "Stop Adding"}
          </button>
          <button onClick={EditMedHandler}>
            {!medsEdit ? "Edit Medication" : "Stop Editing"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MedTable;
