import React from "react";
import LinkCardContent from "./LinkCardContent";

const Favorites = ({links, tags, setLinks}) => {
    return (
        <>
          {links &&
            links.map((link, idx) => {
              if (link.favorite) {  
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
              } else {
                  return null;
              }
            })}
        </>
      );
}

export default Favorites