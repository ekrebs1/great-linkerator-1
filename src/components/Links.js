import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Dropdown from "./Dropdown";
import LinkCard from "./LinkCard";

const useStyles = makeStyles((theme) => ({
  app: {
    background: "#f6f2ef",
  },

  linkContainer: {
    paddingTop: theme.spacing(3),
  },
  linkGrid: {
    paddingTop: theme.spacing(3),
  },
  linkTitle: {
    fontWeight: "800",
    paddingBottom: theme.spacing(2),
  },
}));

const Links = ({ links, setLinks, tags, setTags }) => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Container maxWidth="lg" className={classes.linkContainer}>
        <Dropdown links={links} setLinks={setLinks} />
        <Grid
          container
          className={classes.linkGrid}
          direction="row"
          justify="space-between"
        >
          <LinkCard
            tags={tags}
            setTags={setTags}
            links={links}
            setLinks={setLinks}
          />
        </Grid>
      </Container>
    </div>
  );
};

export default Links;
