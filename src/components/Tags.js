import { useEffect, useState } from "react";
import { getLinks } from "../api";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Paper } from "@material-ui/core";
import TagList from "./TagList"

const Tags = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response.links);
        // console.log(response.links);
      })
      .catch((error) => {
        console.error(error);
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
      {links.map((link) => {
        return <TagList key={link.id} link={link}/>
      })}
    </Paper>
  );
};

export default Tags;
