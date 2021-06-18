import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { green } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import UndoIcon from "@material-ui/icons/Undo";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const Search = ({ links, setLinks, reset }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    let filteredLinks = links.filter((link) => {
      return link.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setLinks(filteredLinks);
  };

  const handleOnChange = (event) => {
    const keywords = event.target.value;
    setSearchQuery(keywords);
    console.log(searchQuery);
  };

  const handleReset = (event) => {
    console.log("reset");
    reset();
  };

  return (
    <div>
      <BootstrapInput
        placeholder='Search...'
        id='bootstrap-input'
        onChange={handleOnChange}
      />
      <IconButton aria-label='search'>
        <SearchIcon onClick={handleSearchSubmit} />
      </IconButton>
      <IconButton aria-label='search'>
        <UndoIcon onClick={handleReset} />
      </IconButton>
    </div>
  );
};

export default Search;
