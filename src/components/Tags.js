import { useEffect, useState } from "react";
import { getTags } from "./api";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Paper } from "@material-ui/core/Chip";

const Tags = () => {
  const [tags, setTags] = useState();

  useEffect(() => {
    getTags().then(({ data }) => {
      if (data.length) {
        setTags(data);
      }
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }));

  const classes = useStyles();

  return (
    <Paper component='ul' className={classes.root}>
      {tags &&
        tags.map((tag) => {
          return (
            <li key={tag.id}>
              <Chip label={tag.name} className={classes.chip} />
            </li>
          );
        })}
    </Paper>
  );
};

export default Tags;
