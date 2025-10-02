import { Route, createRoutesFromElements, Outlet } from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import {
  LandingPage,
  LandingPageLoader,
} from "../pages/LandingPage/LandingPage";
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
import {
  ProfilePage,
  profilePageLoader,
} from "../pages/ProfilePage/ProfilePage";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<LandingPage />} loader={LandingPageLoader} />
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
    <Route path="/search" element={<SearchPage />} loader={searchPageLoader} />
    <Route
      path="/profile/:listingId"
      element={<ProfilePage />}
      loader={profilePageLoader}
    />
  </Route>
);

export default routes;
