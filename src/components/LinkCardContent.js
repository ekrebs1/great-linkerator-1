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
    backgroundColor: blue[100],
  },
}));

const LinkCardContent = ({ link, idx }) => {
  const classes = useStyles();
  const [currentClickNum, setCurrentClickNum] = useState(link.clickNum);
  const [expandedId, setExpandedId] = useState(-1);
  const handleExpandClick = (idx) => {
    setExpandedId(expandedId === idx ? -1 : idx);
  };

  const handleClick = (id, link, clickNum) => {
    let newClickNum = (clickNum += 1);
    setCurrentClickNum(newClickNum);
    updateClick(id, newClickNum);
    window.open(link);
  };

  const handleDelete = (id) => {
    deleteLink(id);
  };

  const handleEditPost = () => {
    console.log("Edit");
  };

  const handleDeleteTag = () => {
    console.log("delete tag");
  };
  
  const handleClickTag = () => {
    //search tag
    console.log("tag")
  };

  return (
    <>
      <Card key={link.id} direction='row' className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              style={{ cursor: "pointer" }}
              className={classes.avatar}
              onClick={() => {
                handleClick(link.id, link.link, currentClickNum);
              }}>
              <span role='img' aria-label='link emoji'>
                🔗
              </span>
            </Avatar>
          }
          action={
            <>
            <IconButton aria-label='settings'>
              <DeleteIcon
                onClick={(event) => {
                  event.preventDefault();
                  handleDelete(link.id);
                }}
              />
            </IconButton>
            <IconButton>
              <CreateIcon 
                onClick={handleEditPost}
                />
            </IconButton>
            </>
          }
          title={link.name}
          subheader={link.createDate}
        />
        <CardMedia className={classes.media} image='img' title='link preview' />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            Click count: {currentClickNum}
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
              [classes.expandOpen]: expandedId,
            })}
            onClick={() => handleExpandClick(idx)}
            aria-expanded={expandedId === idx}
            aria-label='show more'>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expandedId === idx} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>Tags:</Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {link.tags[0]
                ? link.tags.map((tags, idx) => {
                    return (
                      <div className='tags' key={idx}>
                        <Chip
                          color='primary'
                          size='small'
                          variant='outlined'
                          className={classes.chip}
                          key={tags.id}
                          label={tags.name}
                          onClick={handleClickTag}
                          onDelete={handleDeleteTag}
                        />
                      </div>
                    );
                  })
                : null}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default LinkCardContent;
