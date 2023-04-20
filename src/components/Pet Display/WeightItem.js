const WeightItem = (props) => {
  const { weight, weightDate } = props.weight;
  const { showEdit } = props;
  return (
    <tr>
      <td>{weightDate}</td>
      <td>{weight}</td>
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

export default WeightItem;
