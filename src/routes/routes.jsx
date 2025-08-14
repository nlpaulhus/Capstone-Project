import {
  Route,
  createRoutesFromElements,
  Outlet,
  useNavigation,
} from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginLandingPage from "../pages/LoginLandingPage/LoginLandingPage";

const Layout = () => {
  const navigation = useNavigation();

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<LandingPage />} />
    <Route path="/login" element={<LoginLandingPage />} />
  </Route>
);

export default routes;
