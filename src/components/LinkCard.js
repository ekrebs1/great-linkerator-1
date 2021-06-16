import React, { useState, useEffect } from "react";
import { getLinks, deleteLink, updateClick } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { Chip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LinkCardContent from "./LinkCardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 60,
    display: "row",
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
    backgroundColor: blue[100],
  },
}));

const LinkCard = ({ links, setLinks }) => {
  
  useEffect(() => {
    deleteLink()
      .then((response) => {
        setLinks(response.links);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setLinks]);

  return (
    <div style={{ marginTop: "50px" }}>
      {links &&
        links.map((link, idx) => {
          return <LinkCardContent link={link} idx={idx} />;
        })}
    </div>
  );
};

export default LinkCard;
