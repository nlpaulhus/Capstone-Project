import {
  Route,
  createRoutesFromElements,
  Outlet,
  useNavigation,
} from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginLandingPage from "../pages/LoginLandingPage/LoginLandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import { NetworkPage, networkLoader } from "../pages/NetworkPage/NetworkPage";
import {
  YourServicesPage,
  yourServicesLoader,
} from "../pages/YourServicesPage/YourServices";
import {
  DashboardPage,
  dashboardLoader,
} from "../pages/DashboardPage/DashboardPage";
import { SearchPage, searchPageLoader } from "../pages/SearchPage/SearchPage";

const Layout = () => {
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
    <Route path="/login/email" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route
      path="/yourNetwork"
      element={<NetworkPage />}
      loader={networkLoader}
    />
    <Route
      path="/yourServices/"
      element={<YourServicesPage />}
      loader={yourServicesLoader}
    />
    <Route
      path="/dashboard"
      element={<DashboardPage />}
      loader={dashboardLoader}
    />
    <Route
      path="/search/:servicename"
      element={<SearchPage />}
      loader={searchPageLoader}
    />
  </Route>
);

export default routes;
