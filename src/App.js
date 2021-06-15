import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Links from "./components/Links";

var ReactRotatingText = require("react-rotating-text");

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#fff",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://source.unsplash.com/Q1p7bh3SHj8")`,
    height: "400px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
  linkContainer: {
    paddingTop: theme.spacing(3),
  },
  linkTitle: {
    fontWeight: "800",
    paddingBottom: theme.spacing(3),
  },
  boxTitle: {
    textShadowColor: `rgba(0, 0, 0, 0.75)`,
    textShadowOffset: `{ width: -1, height: 1 }`,
    textShadowRadius: 15,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className='App'>
      {/* <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <Typography variant='h6' color='primary'>
            Menu
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box className={classes.hero}>
        <Box className={classes.boxTitle}>
          <ReactRotatingText items={["The Linkerator"]} pause='3000' />
        </Box>
      </Box>
      <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <Typography variant='h6' color='primary'>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg' className={classes.linkContainer}>
        <Typography variant='h4' className={classes.linkTitle}>
          Links
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Links />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
