import { Grid, Link } from "@material-ui/core";
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
          borderRadius: 15,
        }}
      />
      <div
        style={{
          width: "50px",
          height: "50px",
          position: "absolute",
          top: 25,
          right: 25,
          borderRadius: 5,
          transform: "translate(-50%, 0)",
        }}
      >
        <Link
          color="textPrimary"
          href="https://https://fsweb.no/studentweb/index.jsf?inst=FSNTNU"
          variant="body1"
        >
          StudWeb
        </Link>
      </div>
      <Router>
        <DomSwitch>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </DomSwitch>
      </Router>
      <Grid alignItems="center" container direction="column" justify="center">
        <Grid item>
          <div
            style={{
              fontSize: "12px",
              paddingTop: 20,
            }}
          >
            <a
              href="https://github.com/Zenjjim"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              Laget av Zenjjim med ♥
            </a>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Routing;
