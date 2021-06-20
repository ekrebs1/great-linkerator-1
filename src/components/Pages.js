import React from "react";
import { Route } from "react-router-dom";
import Favorites from "./Favorites";
import Links from "./Links";

const Pages = ({ links, setLinks, tags, setTags }) => {
  return (
    <>
      <Route exact path="/favorites">
        <Favorites links={links} />
      </Route>
      <Route exact path="/">
        <Links
          links={links}
          tags={tags}
          setLinks={setLinks}
          setTags={setTags}
        />
      </Route>
    </>
  );
};

export default Pages;
