import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useSetStudies } from "contexts/StudiesContext";
import React, { useState } from "react";
import { getStudie, getStudies, IMinStudy } from "service/service";

const Searchbar = () => {
  const [studies, setStudies] = useSetStudies();
  const [search, setSearch] = useState<IMinStudy[]>([]);
  const [loading, setLoading] = useState(false);

  const searchStudie = async (text: string) => {
    setLoading(true);
    const results = await getStudies(text);
    setSearch(results);
    setLoading(false);
  };

  const addStudie = (text: string | null) => {
    if (text !== null) {
      const code = text.split("-")[0].trim();
      getStudie(code).then((res) => {
        setStudies([
          ...studies,
          {
            code: res.data.code,
            norwegian_name: res.data.norwegian_name,
            credit: res.data.credit,
            taught_in_autumn: res.data.taught_in_autumn,
            average: res.data.average,
            currentGrade: null,
          },
        ]);
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
        (option: {code: string, norwegian_name: string}) => `${option.code} - ${option.norwegian_name}`
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ ...params.InputProps, type: "search" }}
          label="Finn fag"
          margin="normal"
          style={{ width: "350px" }}
          variant="outlined"
        />
      )}
    />
  );
};

export default Searchbar;
