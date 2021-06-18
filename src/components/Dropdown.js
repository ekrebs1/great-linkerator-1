import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 150,
  },
}));

const Dropdown = ({ links, setLinks }) => {
  const classes = useStyles();

  const handleSort = () => {
    let linksClicks = [...links].sort((a, b) => {
      return parseInt(b.clickNum) - parseInt(a.clickNum);
    });

    setLinks(linksClicks);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort by...</InputLabel>
        <Select onChange={handleSort}>
          <MenuItem value={handleSort}>Click Count</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;
