import { Avatar, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useSetStudies } from "contexts/StudiesContext";
import React from "react";
import { grades } from "utils/const";
import { IStudies } from "utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.text.primary,
      height: theme.spacing(8),
      width: theme.spacing(8),
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

const GradePicker = ({ id, studie }: { id: number; studie: IStudies }) => {
  const classes = useStyles();

  const [studies, setStudies] = useSetStudies();

  const pickGrade = (score: number) => {
    const newStudies = [...studies];
    newStudies[id] = { ...studie, currentGrade: score };
    setStudies(newStudies);
  };

  return (
    <Grid
      alignItems="center"
      container
      direction="row"
      item
      justify="space-evenly"
    >
      {grades.map(({ grade, color, score }) => (
        <Grid item key={grade}>
          <Avatar
            className={classes.avatar}
            onClick={() => pickGrade(score)}
            style={{
              background: `linear-gradient(135deg, ${
                studie.currentGrade === null
                  ? color
                  : studie.currentGrade === score
                  ? color
                  : "rgba(97,96,106"
              },0.9) 30%, rgba(255,255,255,0.2) 100%)`,
              boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.5)",
            }}
          >
            <Typography variant="body1">{grade}</Typography>
          </Avatar>
        </Grid>
      ))}
    </Grid>
  );
};

export default GradePicker;
