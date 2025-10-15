import axios from "axios";

export const getLoggedInUser = async () => {
  const user = await axios.get("http://localhost:3000/user", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return user.data;
};

export const setLoggedIn = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem("loggedIn", true);
      resolve();
    }, 0);
  });
};
