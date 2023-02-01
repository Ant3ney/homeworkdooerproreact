import React, { useState, useEffect, useContext } from "react";
import ReadAndAnswer from "components/ReadAndAnswer";
import { Route, Routes } from "react-router-dom";
import { navContext } from "components/Nav";
import StyleBoard from "components/StyleBoard";
import Regurgitator from "components/Regurgitator";
import "./Body.scss";
import Saves from "components/Saves";

export default function Body() {
  return (
    <div className="body">
      <div className="inner_body_container">
        <Routes>
          <Route
            path="/"
            element={<ReadAndAnswer key={Math.round(Math.random() * 100)} />}
          />
          <Route
            path="/styleboard"
            element={<StyleBoard key={Math.round(Math.random() * 100)} />}
          />
          <Route
            path="/regurgitator"
            element={<Regurgitator key={Math.round(Math.random() * 100)} />}
          />
          <Route
            path="/saves"
            element={<Saves key={Math.round(Math.random() * 100)} />}
          />
        </Routes>
      </div>
    </div>
  );
}
