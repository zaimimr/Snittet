import { Grid, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import { useSetStudies } from "contexts/StudiesContext";
import React from "react";
import { IStudies } from "utils/types";

import GradePicker from "./GradePicker";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      background:
        "radial-gradient(100% 450.27% at 0% 0%, rgba(219, 219, 219, 0.42) 0%, rgba(219, 219, 219, 0.06) 100%);",
      padding: 12,
      position: "relative",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    clear: {
      color: theme.palette.error.main,
      position: "absolute",
      right: 0,
      top: 0,
      "&:hover": {
        cursor: "pointer",
        color: "#4EB9B6",
      },
    },
  })
);

const Card = ({ id, studie }: { id: number; studie: IStudies }) => {
  const classes = useStyles();
  const [studies, setStudies] = useSetStudies();

  const clearStudie = () => {
    const newStudies = [...studies];
    newStudies.splice(id, 1);
    setStudies(newStudies);
  };

  return (
    <Grid item lg={3} md={4}>
      <Paper className={classes.root}>
        <Grid container spacing={1}>
          <div className={classes.clear} onClick={() => clearStudie()}>
            <ClearIcon />
          </div>
          <Grid
            alignItems="flex-start"
            container
            direction="row"
            item
            justify="flex-start"
          >
            <Grid item>
              <Typography style={{ overflow: "hidden" }} variant="h3">
                {studie.code}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {studie.taught_in_autumn ? "Høst" : "Vår" }
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{ overflow: "hidden" }}>
            <Typography display={"block"} noWrap>
              {studie.norwegian_name}
            </Typography>
          </Grid>
          <Grid
            alignItems="center"
            container
            direction="row"
            item
            justify="space-between"
          >
            <Grid item>
              <Typography gutterBottom>
                {studie.credit.toFixed(1)} stp.
              </Typography>
            </Grid>
            <Grid item>
              <Typography>avg: {studie.average.toFixed(1)}</Typography>
            </Grid>
          </Grid>
          <GradePicker id={id} studie={studie} />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Card;
