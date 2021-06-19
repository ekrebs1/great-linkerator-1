import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#557a95",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },

  titles: {
    color: "#fff",
    fontSize: "30px",
    lineHeight: "30px",
    padding: "10px",
    transition: "transform 0.4s ease",
    textDecoration: "none",
    fontFamily: "Roboto",
    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "#0f3e61",
      borderRadius: "20px",
    },
  },
}));

const NavBar = ({ tags, links, setLinks, retrieveLinks }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolBar}>
        <Link to="/" className={classes.titles} onClick={retrieveLinks}>
          Home
        </Link>
        {/* <Link to='/tags' className={classes.titles}>
          Tags
        </Link> */}
        <Link to="/favorites" className={classes.titles}>
          Favorites
        </Link>

        <Search
          className={classes.search}
          links={links}
          setLinks={setLinks}
          reset={retrieveLinks}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
