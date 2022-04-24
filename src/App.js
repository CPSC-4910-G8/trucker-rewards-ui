import Login from "./components/Login";
import UserCreate from "./components/UserCreate";
import Profile from "./components/Profile";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Driver from "./components/dashboards/Driver";
import Sponsor from "./components/dashboards/Sponsor";
import ForgotPassword from "./components/Forgotpassword";
import SponsorApplications from "./components/dashboards/SponsorApplications";
import Drivers from "./components/dashboards/DriversList";
import DriverApplications from "./components/dashboards/DriverApplications"
import EditProfile from "./components/EditProfile";
import Applications from "./components/application";
import "./App.css";
import CreateApp from "./components/CreateApplication";
import CreateLanding from "./components/SponsorLanding";
import Points from "./components/DriverPoints";
import Admin from "./components/dashboards/Admin";
import AdminDrivers from "./components/dashboards/AdminDrivers";
import ProfileViewAdmin from "./components/dashboards/ProfileViewAdmin";
import DriverCatalogs from "./components/dashboards/DriverCatalogs";
import Cart from "./components/dashboards/DriverCart.js";
import Catalog from "./components/Catalog";
import Item from "./components/Item";
import OrderSummary from "./components/OrderSummary";
import CatalogList from "./components/CatalogListView";
import Checkout from "./components/checkout/Checkout";
import Sponsors from "./components/dashboards/SponsorList";
import CreationSuccess from "./components/pages/success/CreationSuccess";
import Admins from "./components/dashboards/AdminsList";
import Orders from "./components/Orders";

function App() {
  const theme = createTheme({
    palette: {
      type: "dark",
      text: {
        primary: "#ffffff",
        secondary:"#000000",
      },
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
      background: {
        default: "#404040",
        paper: "#8c8c8c",
      },
    },
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<UserCreate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/driver/dashboard" element={<Driver />} />
          <Route path="/sponsor/dashboard" element={<Sponsor />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/forgotpassword" element = {<ForgotPassword />} />
          <Route path ="/EditProfile" element = {<EditProfile />} />
          <Route path="/sponsor/drivers" element = {<Drivers />} />
          <Route path="/sponsor/applications" element = {<SponsorApplications />} />
          <Route path="/driver/applications" element = {<DriverApplications />} />
          <Route path="/application" element = {<Applications />} />
          <Route path="/createapplication" element = {<CreateApp />} />
          <Route path="/sponsorlanding" element = {<CreateLanding />} />
          <Route path="/driver/points" element={<Points />} />
          <Route path="/admin/drivers" element={<AdminDrivers />} />
          <Route path="/admin/sponsors" element={<Sponsors />} />
          <Route path="/admin/viewuser" element={<ProfileViewAdmin />} />
          <Route path="/driver/catalogs" element={<DriverCatalogs />} />
          <Route path="/driver/cart" element={<Cart />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/item" element={<Item />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="/catalog/list" element = {<CatalogList />} />
          <Route path="/checkout" element = {<Checkout />} />
          <Route path="/account-create/success" element = {<CreationSuccess />} />
          <Route path="/admin/admins" element = {<Admins />} />
          <Route path="/orders" element = {<Orders/>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
