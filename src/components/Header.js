import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AddLink from "./AddLink";
import fonts from "./fonts.css";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://source.unsplash.com/Kj2SaNHG-hg")`,
    height: "400px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    blur: "2px",
  },

  content: {
    display: "center",
    textAlign: "center",
  },
  boxTitle: {
    fontFamily: "Bungee Shade",
    color: "#f6f2ef",
    fontSize: "4rem",
    paddingBottom: "4rem",
  },
}));

const Header = ({ tags, setLinks, setTags }) => {
  const classes = useStyles();

  return (
    <Box className={classes.hero}>
      <Box className={classes.content}>
        <Box className={classes.boxTitle}>
          The Linkerator <br></br>
        </Box>

        <AddLink
          className={classes.addLink}
          tags={tags}
          setTags={setTags}
          setLinks={setLinks}
        />
      </Box>
    </Box>
  );
};

export default Header;
