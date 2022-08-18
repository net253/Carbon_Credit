import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, ConfigEq, Export, Register } from "./page";
import ContentWarp from "./components/wrapper/ContentWarp";
import CallAPI from "./components/CallAPI";
import CallEquation from "./components/CallEquation";

import "react-datepicker/dist/react-datepicker.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <>
      <CallAPI />
      <CallEquation />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ContentWarp content={Home} />} />
        <Route path="/setting" element={<ContentWarp content={ConfigEq} />} />
        <Route path="/export" element={<ContentWarp content={Export} />} />
        <Route path="/register" element={<ContentWarp content={Register} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
