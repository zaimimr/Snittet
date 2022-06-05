import { Grid } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Switch as DomSwitch } from "react-router-dom";
import Landing from "views/Landing";
function Routing() {
  return (
    <>
 
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
              Laget med 💗 av Zenjjim 
            </a>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Routing;
