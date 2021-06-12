import React, { useState, useEffect } from "react";
import { getLinks } from "../api";
import Tags from "./Tags";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddLink from "./AddLink";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 60,
    display: "row",
  },
  media: {
    height: 0,
    paddingTop: "10.25%", // 16:9 // increase after configuring img
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[100],
  },
}));

const Links = () => {
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState("");
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response.links);
        console.log(response.links);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  //write a teardown function for deleting links

  return (
    <div style={{ marginTop: "50px" }}>
    <AddLink setLinks={setLinks} />
      {links &&
        links.map((link) => {
          return (
            <Card key={link.id} direction='row' className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.avatar}>
                    🔗
                  </Avatar>
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={link.name}
                subheader={link.createDate}
              />
              <CardMedia
                className={classes.media}
                image="img"
                title='link preview'
              />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Click count: {link.clickNum}
                </Typography>
                <Typography variant='body1' color='textSecondary' component='p'>
                  {link.comment}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label='share'>
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'>
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                  <Typography paragraph>Tags:</Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'>
                    <Tags />
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
    </div>
  );
};

export default Links;
