import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Switch as DomSwitch } from "react-router-dom";
import logo from "SnittetLogo.png";
import Landing from "views/Landing";
function Routing() {
  return (
    <>
      <img
        alt="logo"
        src={logo}
        style={{
          width: "50px",
          height: "50px",
          position: "absolute",
          top: 25,
          left: 25,
        }}
      />
      <Router>
        <DomSwitch>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </DomSwitch>
      </Router>
      <div
        style={{
          fontSize: "12px",
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Laget av:{" "}
        <a
          href="https://github.com/Zenjjim"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
        >
          @Zenjjim
        </a>
      </div>
    </>
  );
}

export default Routing;
