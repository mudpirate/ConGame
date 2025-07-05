import React from "react";
import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameDetails from "./pages/GamesDetails";
import Games from "./pages/Games";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddGame from "./pages/owner/AddGame";
import ManageBookings from "./pages/owner/ManageBookings";
import ManageGame from "./pages/owner/ManageGame";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "monospace",
            borderRadius: "10px",
          },
          success: {
            style: {
              background: "#22c55e",
              color: "white",
            },
            iconTheme: {
              primary: "#22c55e",
              secondary: "white",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "white",
            },
          },
        }}
      />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamedetails/:id" element={<GameDetails />} />
        <Route path="/games" element={<Games />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="addgame" element={<AddGame />} />
          <Route path="managebookings" element={<ManageBookings />} />
          <Route path="managegames" element={<ManageGame />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="text-white text-center py-20">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
