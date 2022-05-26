import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useSetStudies } from "contexts/StudiesContext";
import React, { useEffect, useState } from "react";
import { IStudies } from "utils/types";
import { scoreToGrade } from "utils/utils";

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
    shadow: {
      width: "200px",
      height: "10px",
      backgroundColor: "#1C1C1C",
      borderRadius: "50%",
      filter: "blur(15px)",
    },
  })
);

const GradeCircle = () => {
  const classes = useStyles();

  const [studies] = useSetStudies();

  const [currentGrade, setCurrentGrade] = useState(0.0);
  const [currentStudyPoints, setCurrentStudyPoints] = useState(0.0);
  const [currentGradeLetter, setCurrentGradeLetter] = useState("-");

  useEffect(() => {
    let sumOfGrades = 0.0;
    let sumOfStudyPoints = 0;
    let sumOfStudyPointsTotal = 0;
    if (studies.length) {
      studies.forEach((studie: IStudies) => {
        if (studie.currentGrade !== null) {
          if (studie.grade) {
            if (typeof studie.currentGrade === 'number') {
              sumOfGrades += studie.currentGrade * studie.credit;
              sumOfStudyPoints += studie.credit;
            }
          }
          if (studie.currentGrade !== 0 && studie.currentGrade !== "fail") {
            sumOfStudyPointsTotal += studie.credit;
          }
        }
      });
    }
    const averageGrade = sumOfGrades / sumOfStudyPoints || 0.0;
    setCurrentGradeLetter(scoreToGrade(averageGrade));
    setCurrentGrade(averageGrade);
    setCurrentStudyPoints(sumOfStudyPointsTotal)
  }, [studies]);

  return (
    <>
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
            {currentGradeLetter}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant={"h2"}>
            {currentGrade.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center">
            {`${currentStudyPoints} stp.`}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.shadow} />
    </>
  );
};

export default GradeCircle;
