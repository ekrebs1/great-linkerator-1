import { Chip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import EditModal from "./EditModal";
import ShareModal from "./ShareModal";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";
import React, { useState } from "react";
import { deleteLink, getLinksByTag, updateClick, updateFavorite } from "../api";

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
    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "#0f3e61",
    },
  },
}));
const LinkCardContent = ({ link, idx, tags, setLinks, links }) => {
  const classes = useStyles();
  const [clickNum, setClickNum] = useState(link.clickNum);
  const [onTag, setOnTag] = useState(false);
  const [expandedId, setExpandedId] = useState(-1);
  const [isFavorite, setIsFavorite] = useState(link.favorite);
  const [favIconColor, setFavIconColor] = useState(
    isFavorite ? { color: "#cd5f66" } : { color: "grey" }
  );
  const [editState, setEditState] = useState(false);
  const handleExpandClick = (idx) => {
    setExpandedId(expandedId === idx ? -1 : idx);
  };
  const handleClick = (id, link, clickNum) => {
    let newClickNum = (clickNum += 1);
    updateClick(id, newClickNum);
    setClickNum(newClickNum);
    window.open(link);
    window.location.reload();
  };
  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      const activeLinks = links.filter((fLink) => fLink.id !== link.id);
      setLinks(activeLinks);
    } catch (err) {
      throw err;
    }
  };
  const handleFavorite = async (id, boo) => {
    try {
      await updateFavorite(id, boo);
      setIsFavorite(true);
      setFavIconColor({ color: "#cd5f66" });
    } catch (err) {
      throw err;
    }
  };
  const handleUnfavorite = async (id, boo) => {
    try {
      await updateFavorite(id, boo);
      setIsFavorite(false);
      setFavIconColor({ color: "grey" });
    } catch (err) {
      throw err;
    }
  };
  const handleEditPost = () => {
    setEditState(true);
  };

  const handleClickTag = async (tagName) => {
    try {
          if (onTag === false) {
      let linksByTag = await getLinksByTag(tagName);
      setLinks(linksByTag[0]);
      setOnTag(true);
    }
    } catch (err) {
      throw err
    }

  };

  return (
    link.active && (
      <>
        <Card key={link.id} direction='row' className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label='recipe'
                style={{ cursor: "pointer" }}
                className={classes.avatar}
                onClick={() => {
                  handleClick(link.id, link.link, clickNum);
                }}>
                <span role='img' aria-label='link emoji'>
                  🔗
                </span>
              </Avatar>
            }
            action={
              <>
                <Tooltip title='Delete link'>
                  <IconButton
                    aria-label='delete link'
                    onClick={() => {
                      handleDelete(link.id);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Edit link'>
                  <IconButton aria-label='edit link' onClick={handleEditPost}>
                    <CreateIcon />
                    {editState && <EditModal link={link} setLinks={setLinks} />}
                  </IconButton>
                </Tooltip>
              </>
            }
            title={link.name}
            subheader={link.createDate}
          />
          <CardMedia
            className={classes.media}
            image='img'
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
            <Tooltip title='Favorite'>
              <IconButton 
                aria-label='add to favorites'
                onClick={() => {
                  if (isFavorite === false) {
                    handleFavorite(link.id, true);
                  }
                  if (isFavorite === true) {
                    handleUnfavorite(link.id, false);
                  }
                }}
                >
                <FavoriteIcon
                  style={favIconColor}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Share'>
              <IconButton aria-label='share'>
                <ShareModal link={link} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Expand tags'>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expandedId,
                })}
                onClick={() => handleExpandClick(idx)}
                aria-expanded={expandedId === idx}
                aria-label='show more'>
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
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
                            onClick={(event) => {
                              handleClickTag(tags.name);
                            }}
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
    )
  );
};
export default LinkCardContent;
