import classes from "../../css/Carousel.module.css";

const PetSelect = (props) => {
  const { pet, selectedPet, setSelectedPet } = props;

  let activeSelect = `${classes.circle}`;

  if (pet) {
    if (selectedPet.length > 1 && pet.length > 1) {
      activeSelect = `${classes.circle} ${classes.active}`;
    } else if (
      pet[0].Id === selectedPet[0].Id &&
      selectedPet.length === 1 &&
      pet.length === 1
    ) {
      activeSelect = `${classes.circle} ${classes.active}`;
    }
  }

  //Choose Selected Pet
  const selectHandler = (e) => {
    e.preventDefault();

    //add pet button
    if (pet == undefined) {
      return;
    }

    // specific pet select button
    setSelectedPet(pet);
  };

  return (
    <div
      className={activeSelect}
      style={{ backgroundImage: `url(${props.image})` }}
      onClick={selectHandler}
    ></div>
  );
};

export default PetSelect;
