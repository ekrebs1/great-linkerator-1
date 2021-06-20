import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 150,
  },
}));

const Dropdown = ({ links, setLinks }) => {
  const classes = useStyles();

  const handleSortClicks = () => {
    let linksClicks = [...links].sort((a, b) => {
      return b.clickNum - a.clickNum;
    });

    setLinks(linksClicks);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort by...</InputLabel>
        <Select onChange={handleSortClicks}>
          <MenuItem value={handleSortClicks}>Click Count</MenuItem>

        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;
