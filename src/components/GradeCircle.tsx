import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useSetStudies } from "contexts/StudiesContext";
import React, { useEffect, useState } from "react";
import { IStudies } from "utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      borderRadius: "100%",
      background:
        "radial-gradient(86.5% 86.5% at 6% 21.5%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 100%);",
      position: "relative",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      width: "250px",
      backdropFilter: "blur(12px)",
    },
    grades: {
      marginTop: "3em",
    },
  })
);

const GradeCircle = () => {
  const classes = useStyles();

  const [studies] = useSetStudies();

  const [currentGrade, setCurrentGrade] = useState(0.0);
  const [currentGradeLetter, setCurrentGradeLetter] = useState("-");

  useEffect(() => {
    let sumOfGrades = 0.0;
    let sumOfStudyPoints = 0;
    if (studies.length) {
      studies.forEach((studie: IStudies) => {
        if (studie.currentGrade) {
          sumOfGrades += studie.currentGrade * studie.credit;
          sumOfStudyPoints += studie.credit;
        }
      });
    }
    const averageGrade = sumOfGrades / sumOfStudyPoints || 0.0;
    if (averageGrade >= 4.5) {
      setCurrentGradeLetter("A");
    } else if (averageGrade < 4.5 && averageGrade >= 3.5) {
      setCurrentGradeLetter("B");
    } else if (averageGrade < 3.5 && averageGrade >= 2.5) {
      setCurrentGradeLetter("C");
    } else if (averageGrade < 2.5 && averageGrade >= 1.5) {
      setCurrentGradeLetter("D");
    } else if (averageGrade < 1.5 && averageGrade >= 0.5) {
      setCurrentGradeLetter("E");
    } else if (averageGrade < 0.5) {
      setCurrentGradeLetter("F");
    } else {
      setCurrentGradeLetter("-");
    }
    setCurrentGrade(averageGrade);
  }, [studies]);

  return (
    <Grid
      alignItems="center"
      className={classes.root}
      container
      direction="column"
      item
      justify="center"
    >
      <Grid className={classes.grades} item>
        <Typography align="center" variant={"h1"}>
          {currentGrade.toFixed(1)}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          align="center"
          variant={"h2"}
        >
          {currentGradeLetter}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GradeCircle;
