import { useLoaderData } from "react-router-dom";
import axios from "axios";

export const DashboardPage = () => {
  const { user } = useLoaderData();

  return <h1>Welcome back, {user.firstname}!</h1>;
};

export async function dashboardLoader() {
  try {
    const user = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((user) => user.data);

    return { user };
  } catch (err) {
    return redirect("/login");
  }
}
