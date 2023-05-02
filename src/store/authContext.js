import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

// check when token expires
const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

//grab stored values from local storage
const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedUser = localStorage.getItem("userId");

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedUser,
  };
};

export const AuthContextProvider = (props) => {
  //if stored data, set token and userId
  const localData = getLocalData();
  const url = "http://localhost:4000";

  let initialToken;
  let initialUser;
  if (localData) {
    initialToken = localData.token;
    initialUser = localData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUser);

  //clear state and local storage on Logout
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // receive axios results from login page
  const login = (token, expTime, userId) => {
    console.log("Logging In");
    setToken(token);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("exp", expTime);
    localStorage.setItem("userId", userId);

    const remainingTime = calculateRemainingTime(expTime);

    logoutTimer = setTimeout(logout, remainingTime);
  };

  //return values for use in other components
  const contextValue = {
    token,
    login,
    logout,
    userId,
    url,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
