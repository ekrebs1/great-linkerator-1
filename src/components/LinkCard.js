import React, { useEffect } from "react";
import { deleteLink } from "../api";
import LinkCardContent from "./LinkCardContent";

const LinkCard = ({ links, setLinks, tags }) => {
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
      {links &&
        links.map((link, idx) => {
          return (
            <LinkCardContent
              key={idx}
              tags={tags}
              link={link}
              links={links}
              setLinks={setLinks}
              idx={idx}
            />
          );
        })}
    </>
  );
};

export default LinkCard;
