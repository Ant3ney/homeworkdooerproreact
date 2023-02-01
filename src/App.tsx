import React from "react";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import { NavProvider } from "components/Nav";
import Nav from "components/Nav";
import { SaveProvider } from "components/Saves";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavProvider>
          <SaveProvider>
            <Nav />
            <Body />
          </SaveProvider>
        </NavProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
