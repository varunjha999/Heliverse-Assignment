import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Team from "./pages/Team";
import TeamContext from "./context/TeamContext";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(newUser));
  }, [newUser]);

  useEffect(() => {
    const savedUser = localStorage.getItem("team");
    if (savedUser) {
      setNewUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <TeamContext.Provider value={{ newUser, setNewUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </BrowserRouter>
    </TeamContext.Provider>
  );
}

export default App;
