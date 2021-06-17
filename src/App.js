import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Links from "./components/Links";
import Search from "./components/Search";
import { getLinks } from "./api";
import AddLink from "./components/AddLink";
var ReactRotatingText = require("react-rotating-text");

const useStyles = makeStyles((theme) => ({
  app: {
    background: "#fff",
  },
  appBar: {
    background: "#557a95",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
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
    // color: "#fff",
    // fontSize: "4rem",
    blur: "2px",
  },

  linkContainer: {
    paddingTop: theme.spacing(3),
  },
  linkTitle: {
    fontWeight: "800",
    paddingBottom: theme.spacing(3),
  },

  search: {
    display: "flex",
    justifyContent: "flex-end",
  },

  content: {
    display: "center",
    textAlign: "center",
  },
  boxTitle: {
    color: "#fff",
    fontSize: "4rem",
    paddingBottom: "4rem",
  },
  boxSubTitle: {
    color: "#fff",
    fontSize: "1.5rem",
    paddingBottom: "1rem",
  },
  typography: {
    color: "#fff",
  },
}));

const App = () => {
  const [tags, setTags] = useState([]);
  const [links, setLinks] = useState([]);
  const classes = useStyles();

  const retrieveLinks = () => {
    getLinks()
      .then((response) => {
        setLinks(response.links);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    retrieveLinks()
  }, []);

  return (
    <div className={classes.app}>
      <Box className={classes.hero}>
        <Box className={classes.content}>
          <Box className={classes.boxTitle}>
            Hello, World! <br></br>
          </Box>
          <Box className={classes.boxSubTitle}>Create a Link!</Box>
          <AddLink
            className={classes.addLink}
            tags={tags}
            setTags={setTags}
            setLinks={setLinks}
          />
        </Box>
      </Box>
      <AppBar className={classes.appBar} position='static'>
        <Toolbar className={classes.toolBar}>
          <Typography
            className={classes.typography}
            variant='h6'
            color='primary'>
            🔗 The Great Linkerator
          </Typography>

          <Search
            className={classes.search}
            links={links}
            setLinks={setLinks}
            reset={retrieveLinks}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg' className={classes.linkContainer}>
        <Typography variant='h4' className={classes.linkTitle}>
          Links
        </Typography>
        <Grid container direction='row' justify='space-between'>
          <Links className={classes.links} links={links} setLinks={setLinks} />
        </Grid>
      </Container>
    </div>
  );
};

export default App;
