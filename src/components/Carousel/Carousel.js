import { useState } from "react";
import classes from "../../css/Carousel.module.css";

import PetSelect from "./PetSelect";

const DUMMY_PETS = [
  {
    id: "cat",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg",
  },
  {
    id: "dog",
    image:
      "https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg",
  },
  {
    id: "snake",
    image: "https://www.awsfzoo.com/media/Corn-Snake-Website-906x580.jpg",
  },
];

const Carousel = (props) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const { pets, selectedPet, setSelectedPet } = props;

  const extendCarouselHandler = (event) => {
    event.preventDefault();
    setShowCarousel((prevState) => {
      return !prevState;
    });
  };

  return (
    <div
      className={`${classes.carousel} ${
        showCarousel ? classes.shown : classes.hidden
      }`}
    >
      {!showCarousel && (
        <button
          className={`${classes.extendBtn}`}
          onClick={extendCarouselHandler}
        >
          Choose Pet v
        </button>
      )}

      {showCarousel && (
        <>
          <div className={classes.petSelectHold}>
            <PetSelect
              pet={pets}
              setSelectedPet={setSelectedPet}
              image={"https://cdn-icons-png.flaticon.com/512/5110/5110754.png"}
              selectedPet={selectedPet}
              isPet={false}
            />
            {pets.map((pet) => {
              return (
                <PetSelect
                  pet={[pet]}
                  image={pet.image}
                  key={pet.Id}
                  petId={pet.Id}
                  selectedPet={selectedPet}
                  setSelectedPet={setSelectedPet}
                  isPet={true}
                />
              );
            })}
            <PetSelect
              image={"https://cdn-icons-png.flaticon.com/512/992/992651.png"}
              isPet={false}
            />
          </div>
          <button
            className={`${classes.extendBtn}`}
            onClick={extendCarouselHandler}
          >
            Collapse Pets ^
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
