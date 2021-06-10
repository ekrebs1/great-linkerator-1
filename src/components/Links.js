import React, { useState, useEffect } from "react";
import { getLinks } from "../api";
// import Tags from "./Tags";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "40.25%", // 16:9
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
    backgroundColor: red[500],
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
        setLinks(response.links); // should this be response or response.links?!?!
        console.log(response.links);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  return (
    <>
      {links &&
        links.map((link) => {
          return (
            <Card direction="row" className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    🔗
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={link.name}
                subheader={link.createDate}
              />
              <CardMedia
                className={classes.media}
                image=""
                title="link preview"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Click count: {link.clickNum}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  {link.comment}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Tags:</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {/* <Tags /> */}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
    </>
  );
};

export default Links;
