import { Button, Modal, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { patchLink } from "../api";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditModal = ({ links, link, setLinks }) => {
  const [name, setName] = useState(link.name);
  const [newLink, setLink] = useState("");
  const [url, setUrl] = useState(link.link);
  const [comment, setComment] = useState(link.comment);
  const [tags, setTags] = useState(link.tags.tags);
  const [id, setId] = useState(link.id);
  const [clickNum, setClickNum] = useState(link.clickNum);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateLink = async (event) => {
    event.preventDefault();
    await patchLink(id, name, url, comment, clickNum, tags);
    setLinks(links);
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form noValidate autoComplete="off" onSubmit={handleCreateLink}>
        <TextField
          type="text"
          label="name"
          placeholder="name"
          value={name}
          onInput={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          type="url"
          label="url"
          placeholder="url"
          value={url}
          onInput={(event) => {
            setLink(event.target.value);
          }}
        />
        <TextField
          type="text"
          label="comment"
          placeholder="comment"
          value={comment}
          onInput={(event) => {
            setComment(event.target.value);
          }}
        />
        <TextField
          type="text"
          label="tags"
          value={tags}
          onInput={(event) => {
            setTags(event.target.value);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-activity-name"
      aria-describedby="create-activity-description"
    >
      {body}
    </Modal>
  );
};

export default EditModal;
