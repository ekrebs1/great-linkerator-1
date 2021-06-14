import React, { useState, useEffect } from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getLinkTags } from "../api";

const TagList = ({ link }) => {
  const [targetLink, setTargetLink] = useState(link);
  // const [targetTag, setTargetTag] = useState([])
  const [linkTags, setLinkTags] = useState();

  useEffect( () => {
    getLinkTags()
    .then((response) => {
      setLinkTags(response);
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [setLinkTags])

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

  return link.tags.map((tag) => {
      linkTags.map((linkTag) => {
          if (linkTag.tagId === tag.id) {
              return (
                <li key={tag.id}>
                  <Chip label={tag.name} className={classes.chip} />
                </li>
              );
          }
      })
    }
  );
};
export default TagList;
