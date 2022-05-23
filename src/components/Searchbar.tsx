import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useSnackbar from "contexts/SnackbarContext";
import { useSetStudies } from "contexts/StudiesContext";
import React, { useState } from "react";
import { getStudie, getStudies } from "service/service";
import { IMinStudy, IStudies } from "utils/types";

const Searchbar = () => {
  const [studies, setStudies] = useSetStudies();
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState<IMinStudy[]>([]);
  const [loading, setLoading] = useState(false);

  const searchStudie = async (text: string) => {
    if (text !== null && text.length > 1) {
      setLoading(true);
      const results: IMinStudy[] = await getStudies(text);
      // @ts-ignore
      setSearch(results);
      setLoading(false);
    }
  };

  const addStudie = (text: string | null) => {
    if (text !== null && text.length > 1) {
      const code = text.split("-")[0].trim();
      getStudie(code).then((res) => {
        if (!studies.some((studie: IStudies) => studie.code === code)) {
          const addedStudies = [
            ...studies,
            {
              code: res.data.code,
              norwegian_name: res.data.norwegian_name,
              credit: res.data.credit,
              taught_in_autumn: res.data.taught_in_autumn,
              average: res.data.average,
              grade: true,
              currentGrade: null,
            },
          ];
          const sortedStudies = addedStudies.sort((a, b) => {
            const codeA = a.code.toUpperCase();
            const codeB = b.code.toUpperCase();
            if (codeA < codeB) {
              return -1;
            }
            if (codeA > codeB) {
              return 1;
            }
            return 0;
          });
          setStudies(sortedStudies);
        } else {
          showSnackbar("error", "Faget er allerede lagt til");
        }
      });
    }
  };

  return (
    <Autocomplete
      clearOnBlur
      freeSolo
      loading={loading}
      onChange={(e, value) => addStudie(value)}
      onInputChange={(e, value) => searchStudie(value.toUpperCase())}
      options={search.map(
        (option: IMinStudy) => `${option.code} - ${option.norwegian_name}`
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ ...params.InputProps, type: "input" }}
          label="Finn fagkode"
          margin="normal"
          style={{ width: "350px" }}
          variant="outlined"
        />
      )}
    />
  );
};

export default Searchbar;
