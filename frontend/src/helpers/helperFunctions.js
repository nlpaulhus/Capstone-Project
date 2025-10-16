import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getLoggedInUser = async () => {
  const user = await axios.get(`${API_URL}/user`, {
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
