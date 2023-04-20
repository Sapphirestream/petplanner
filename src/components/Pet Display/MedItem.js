import classes from "../../css/PetDisplay.module.css";

const MedItem = (props) => {
  const {
    petId,
    name,
    official,
    dosage,
    startDate,
    endDate,
    frequency,
    notes,
  } = props.med;

  const { showEdit } = props;

  return (
    <tr>
      <td> {name}</td>
      <td> {official}</td>
      <td> {dosage}</td>
      <td> {startDate}</td>
      <td> {endDate}</td>
      <td> {frequency}</td>
      <td> {notes}</td>
      {showEdit && (
        <td>
          <p className="flex margin-zero">
            <button>Edit</button>
            <button>Delete</button>
          </p>
        </td>
      )}
    </tr>
  );
};

export default MedItem;
