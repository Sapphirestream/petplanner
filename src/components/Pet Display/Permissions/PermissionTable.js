import { useState, useEffect, useContext } from "react";
import classes from "../../../css/PetDisplay.module.css";

import PermissionForm from "../Permissions/PermissionForm";
import PermissionItem from "../Permissions/PermissionItem";

const PermissionTable = (props) => {
  const { permissions, trigger, petId, isOwner } = props;

  //Seperate out Permissions into Owners, Editors & Viewers
  const owner = permissions.filter((perm) => {
    return perm.permission.owner === true;
  });

  const editors = permissions.filter((perm) => {
    return perm.permission.owner === false && perm.permission.edit === true;
  });

  const viewers = permissions.filter((perm) => {
    return perm.permission.owner === false && perm.permission.edit === false;
  });

  const showEditors = editors != 0 ? true : false;
  const showViewers = viewers != 0 ? true : false;

  // States for showing Editing Viewports
  const [permEdit, setPermEdit] = useState(false);
  const [permAdd, setPermAdd] = useState(false);

  return (
    <div className={`${classes.expandBox} ${classes.permBox}`}>
      <div className="flex">
        <h4>Owner: </h4>
        <p>{owner[0].username}</p>
      </div>
      {/* EDITORS */}
      {showEditors && <h4>Can Edit: </h4>}
      {showEditors && (
        <ul>
          {editors.map((user) => (
            <PermissionItem
              key={`edit${user.Id}`}
              user={user}
              permEdit={permEdit}
              trigger={trigger}
            />
          ))}
        </ul>
      )}
      {/* VIEWERS */}
      {showViewers && <h4>Can View:</h4>}
      {showViewers && (
        <ul>
          {viewers.map((user) => (
            <PermissionItem
              key={`view${user.Id}`}
              user={user}
              permEdit={permEdit}
              trigger={trigger}
            />
          ))}
        </ul>
      )}

      {permAdd && (
        <PermissionForm petId={petId} trigger={trigger} close={setPermAdd} />
      )}

      {/* BUTTONS  */}

      {isOwner && (
        <div>
          <button
            onClick={() => {
              setPermAdd(!permAdd);
            }}
            type="button"
          >
            {permAdd ? "Stop Adding" : "Add Permissions"}
          </button>
          <button
            onClick={() => {
              setPermEdit(!permEdit);
            }}
          >
            {permEdit ? "Stop Removing" : "Remove Permissions"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PermissionTable;
