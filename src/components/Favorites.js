import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import LinkCardContent from "./LinkCardContent";

const useStyles = makeStyles((theme) => ({
  favorites: {
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

const Favorites = ({ links, tags, setLinks }) => {
  const classes = useStyles();

  return (
    <div className={classes.favorites}>
      <Container maxWidth="lg" className={classes.linkContainer}>
        {links &&
          links.map((link, idx) => {
            if (link.favorite) {
              return (
                <Grid
                  container
                  key={idx}
                  className={classes.linkGrid}
                  direction="row"
                  justify="space-between"
                >
                  <LinkCardContent
                    key={idx}
                    tags={tags}
                    link={link}
                    links={links}
                    setLinks={setLinks}
                    idx={idx}
                  />
                </Grid>
              );
            } else {
              return null;
            }
          })}
      </Container>
    </div>
  );
};

export default Favorites;
