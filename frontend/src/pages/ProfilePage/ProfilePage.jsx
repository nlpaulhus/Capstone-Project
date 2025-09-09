export const ProfilePage = () => {
  return <h1>Profile</h1>;
};

export async function profilePageLoader({ params }) {
  try {
    const currentUser = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((currentUser) => currentUser.data);

    return { currentUser };
  } catch (err) {
    return redirect("/login");
  }
}
