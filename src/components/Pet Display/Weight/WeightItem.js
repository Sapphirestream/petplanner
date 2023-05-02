import { useContext, useState } from "react";
import axios from "axios";

import AuthContext from "../../../store/authContext";
import WeightForm from "../Weight/WeightForm";

const WeightItem = (props) => {
  const { token, url } = useContext(AuthContext);

  const { Id, weight, weightDate } = props.weight;
  const { showEdit, trigger } = props;

  const [editRecord, setEditRecord] = useState(false);

  const deleteHandler = (e) => {
    e.preventDefault();

    axios
      .delete(`${url}/pets/deleteWeight/${Id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(`Deleted Record ${Id}`);
        trigger(Math.random());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (e) => {
    e.preventDefault();

    setEditRecord(!editRecord);
  };

  return (
    <>
      <tr>
        <td>{new Date(weightDate).toLocaleDateString()}</td>
        <td>{weight}</td>
        {showEdit && (
          <td>
            <p className="flex margin-zero">
              <button onClick={editHandler}>Edit</button>
              <button onClick={deleteHandler}>Delete</button>
            </p>
          </td>
        )}
      </tr>
      {showEdit && editRecord && (
        <tr>
          <td colSpan="3">
            <WeightForm
              trigger={trigger}
              edit={true}
              weight={props.weight}
              close={setEditRecord}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default WeightItem;
