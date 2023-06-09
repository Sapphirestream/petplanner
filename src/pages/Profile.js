import DatePicker from "react-datepicker";
import { useState } from "react";
//import "react-datepicker/dist/react-datepicker.css";
import "../css/react-datepicker.css";

const Profile = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

export default Profile;
