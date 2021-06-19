import React from "react";
import LinkCardContent from "./LinkCardContent";

const LinkCard = ({ links, setLinks, tags }) => {

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
