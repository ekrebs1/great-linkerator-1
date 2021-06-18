import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getLinks } from "./api";
import NavBar from "./components/NavBar";
import Pages from "./components/Pages"
import Header from "./components/Header.js"
import { getTags } from "./api";

export const useStyles = makeStyles((theme) => ({
  app: {
    background: "#fff",
  },
  appBar: {
    background: "#557a95",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://source.unsplash.com/Kj2SaNHG-hg")`,
    height: "400px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    // color: "#fff",
    // fontSize: "4rem",
    blur: "2px",
  },

  linkContainer: {
    paddingTop: theme.spacing(3),
  },
  linkTitle: {
    fontWeight: "800",
    paddingBottom: theme.spacing(3),
  },

  search: {
    display: "flex",
    justifyContent: "flex-end",
  },

  content: {
    display: "center",
    textAlign: "center",
  },
  boxTitle: {
    color: "#fff",
    fontSize: "4rem",
    paddingBottom: "4rem",
  },
  boxSubTitle: {
    color: "#fff",
    fontSize: "1.5rem",
    paddingBottom: "1rem",
  },
  typography: {
    color: "#fff",
  },
}));

const App = () => {
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getTags()
      .then((response) => {
        setTags(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const retrieveLinks = () => {
    getLinks()
      .then((response) => {
        setLinks(response.links);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    retrieveLinks()
  }, []);

  return (
    <div className={classes.app}>
      <header>
        <Header tags={tags} setTags={setTags} setLinks={setLinks} />
        <NavBar 
          tags={tags}
          links={links}
          setLinks={setLinks}
          retrieveLinks={retrieveLinks}  
          />
       </header>
      <main>
        <Pages 
          links={links}
          setLinks={setLinks}
          tags={tags} 
          setTags={setTags}
        />
      </main>
    </div>
  );
};

export default App;


