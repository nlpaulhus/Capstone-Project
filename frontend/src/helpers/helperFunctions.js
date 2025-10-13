import axios from "axios";

export const getLoggedInUser = async () => {
  const user = await axios.get("http://localhost:3000/user", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return user.data;
};
