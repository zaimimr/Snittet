import { Container, Grid, Typography } from "@material-ui/core";
import Card from "components/Card";
import GradeCircle from "components/GradeCircle";
import Searchbar from "components/Searchbar";
import { useSetStudies } from "contexts/StudiesContext";
import React, { useEffect } from "react";
import { IStudies } from "utils/types";

const Landing = () => {
  const [studies, setStudies] = useSetStudies();

  useEffect(() => {
    const storage_studies = localStorage.getItem("studies")
    if (storage_studies) {
      setStudies(JSON.parse(storage_studies))
    }
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          alignItems="center"
          container
          direction="column"
          justify="center"
          spacing={8}
        >
          <GradeCircle />
          <Searchbar />
          <Grid
            alignItems="center"
            container
            direction="row"
            item
            justify="center"
            spacing={4}
          >
            {studies?.length ? (
              studies.map((studie: IStudies, index: number) => (
                <Card id={index} key={index} studie={studie} />
              ))
            ) : (
                <Typography color="error">Ingen fag er valgt</Typography>
              )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
