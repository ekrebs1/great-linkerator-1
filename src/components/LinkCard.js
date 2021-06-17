import React, { useState, useEffect } from "react";
import { getLinks, deleteLink, updateClick } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import LinkCardContent from "./LinkCardContent";


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
    <>
      {links ?
        links.map((link, idx) => {
          return <LinkCardContent setLinks={setLinks} links={links} link={link} idx={idx} />;
        }) : <p>No Links Bookmarked!</p>}
    </>
  );
};

export default LinkCard;
