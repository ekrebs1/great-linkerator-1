import React from "react";
import LinkCard from "./LinkCard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dropdown from "./Dropdown";

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

const Links = ({ links, setLinks, tags, setTags }) => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='lg' className={classes.linkContainer}>
        <Typography variant='h4' className={classes.linkTitle}>
          Links
        </Typography>
        <Dropdown links={links} setLinks={setLinks} />
        <Grid container direction='row' justify='space-between'>
          <LinkCard
            tags={tags}
            setTags={setTags}
            links={links}
            setLinks={setLinks}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Links;
