import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 60,
  },
  media: {
    height: 0,
    paddingTop: ".25%", // 16:9 // increase after configuring img
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(0deg)",
  },
  avatar: {
    backgroundColor: "#557a95",
  },
}));

const Tags = ({ tags }) => {
  const classes = useStyles();
  return (
    <>
      <h1>Tags</h1>
      {tags.tags
        ? tags.tags.map((tag) => {
            return (
              <div className="tags">
                <Chip
                  color="primary"
                  size="small"
                  variant="outlined"
                  className={classes.chip}
                  key={tag.id}
                  label={tag.name}
                />
              </div>
            );
          })
        : null}
    </>
  );
};

export default Tags;
