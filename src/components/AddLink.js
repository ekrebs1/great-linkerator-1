import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core/";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { createLinks } from "../api";
import Tooltip from '@material-ui/core/Tooltip';

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

const AddLink = ({ setLinks }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [tags, setTags] = useState([]);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateLink = async (event) => {
    event.preventDefault();
    const { newLink } = await createLinks(
      name,
      link,
      createDate,
      comment,
      tags
    );
    setLinks((prevLinks) => {
      return [...prevLinks, newLink];
    });
    handleClose();
    setName("");
    setLink("");
    setComment("");
    setCreateDate("");
    setTags([]);
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
          type="text"
          label="comment"
          placeholder="comment"
          value={comment}
          onInput={(event) => {
            setComment(event.target.value);
          }}
        />
        <TextField
          type="url"
          label="url"
          placeholder="url"
          value={link}
          onInput={(event) => {
            setLink(event.target.value);
          }}
        />
        <TextField
          type="date"
          label=""
          value={createDate}
          onInput={(event) => {
            setCreateDate(event.target.value);
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
     <div>
       
      <Tooltip title="Create Link" aria-label="add">
        <Fab onClick={handleOpen} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="create-activity-name"
          aria-describedby="create-activity-description"
        >
          {body}
        </Modal>
    </div>
  );
};

export default AddLink;
