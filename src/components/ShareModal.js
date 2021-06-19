import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const ShareModal = ({ link }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (navigator.share) {
      navigator
        .share({
          title: link.name,
          text: link.comment,
          url: link.link,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => {
          console.log(`Couldn't share because of`, err.message);
        });
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <ShareIcon
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <TextField
            style={{ overflow: "scroll", width: "250px" }}
            required
            id="standard-basic"
            label="SHARE URL"
            defaultValue={link.link}
          />
        </Typography>
      </Popover>
    </div>
  );
};

export default ShareModal;
