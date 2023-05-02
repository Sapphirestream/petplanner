import { useState } from "react";

import WeightItem from "./WeightItem";
import WeightForm from "./WeightForm";
import classes from "../../../css/PetDisplay.module.css";

const WeightTable = (props) => {
  const [weightEdit, setWeightEdit] = useState(false);
  const [weightAdd, setWeightAdd] = useState(false);

  const { trigger, weight, petId, canEdit } = props;

  return (
    <div className={classes.expandBox}>
      <h4> Weight History </h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            {weightEdit && <th className={classes.editRow}>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {weight.map((weight) => {
            return (
              <WeightItem
                weight={weight}
                showEdit={weightEdit}
                trigger={trigger}
                key={`weight${weight.Id}${weight.petId}`}
              />
            );
          })}
        </tbody>
      </table>
      {weightAdd && (
        <WeightForm
          petId={petId}
          trigger={trigger}
          edit={false}
          close={setWeightAdd}
        />
      )}
      {canEdit && (
        <div>
          <button
            onClick={(e) => {
              setWeightAdd(!weightAdd);
            }}
          >
            {!weightAdd ? "Add Record" : "Stop Adding"}
          </button>
          <button
            onClick={(e) => {
              setWeightEdit(!weightEdit);
            }}
          >
            {!weightEdit ? "Edit Records" : "Stop Editing"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WeightTable;
