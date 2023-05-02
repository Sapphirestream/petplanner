import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../../store/authContext";

const PermissionItem = (props) => {
  const { user, permEdit, trigger } = props;
  const { token, url } = useContext(AuthContext);

  const deleteHandler = (e) => {
    e.preventDefault();

    const Id = user.permission.Id;

    axios
      .delete(`${url}/pets/deletePermission/${Id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(`Deleted Permission ${Id}`);
        trigger(Math.random());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li>
      {user.username}
      {permEdit && <button onClick={deleteHandler}> X Remove</button>}
    </li>
  );
};

export default PermissionItem;
