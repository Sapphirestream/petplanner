import classes from "../../css/Carousel.module.css";

const PetSelect = (props) => {
  return (
    <div
      className={classes.circle}
      style={{ backgroundImage: `url(${props.image})` }}
    ></div>
  );
};

export default PetSelect;
