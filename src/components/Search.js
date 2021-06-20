import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import React, { useState } from "react";

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

const Search = ({ links, setLinks, reset, tags }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    let filteredLinks = links.filter((link) => {
      return link.link.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.tags.filter((tag) => {
          return tag.name.toLowerCase().includes(searchQuery.toLowerCase());
        }).length > 0
        ? link
        : "";
    });
    setLinks(filteredLinks);
    setSearchQuery("");
  };

  const handleOnChange = (event) => {
    const keywords = event.target.value;
    setSearchQuery(keywords);
  };

  const handleReset = (event) => {
    reset();
  };

  return (
    <div>
      <BootstrapInput
        placeholder="Search..."
        id="bootstrap-input"
        onChange={handleOnChange}
        value={searchQuery}
      />
      <Tooltip title="Search">
        <IconButton aria-label="search" onClick={handleSearchSubmit}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset">
        <IconButton aria-label="reset" onClick={handleReset}>
          <UndoIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Search;
