import { useState, useContext } from "react";
import { animated, useSpring } from "react-spring";
import axios from "axios";

import AuthContext from "../../store/authContext";
import classes from "../../css/EventBox.module.css";

const Checkbox = (props) => {
  const { Id, canEdit, completion } = props;

  const [isChecked, setIsChecked] = useState(completion);
  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const { url, userId, token } = useContext(AuthContext);

  //checkmark Animations
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#03045e" : "#fff",
  });

  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
  });

  const checkHandler = () => {
    setIsChecked((state) => {
      axios
        .put(
          `${url}/events/markComplete/${Id}`,
          { completion: !state },
          { headers: { authorization: token } }
        )
        .then((res) => {
          //console.log(res.data);
        })
        .catch((err) => console.log(err));

      return !state;
    });
  };

  return (
    <label>
      <input
        type="checkbox"
        onChange={checkHandler}
        className={classes.hideDefaultCheck}
      />

      <animated.svg
        className={`${classes.checkbox}`}
        style={checkboxAnimationStyle}
        aria-hidden="true"
        viewBox="-1 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L12 1"
          strokeWidth="2"
          stroke="#fff"
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
        />
      </animated.svg>
    </label>
  );
};

export default Checkbox;

// checkmark styles from https://dev.to/tomdohnal/custom-checkbox-in-react-animated-and-accessible-3jk9
