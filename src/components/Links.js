import React, { useEffect, useState } from "react";
import { getTags } from "../api";
import AddLink from "./AddLink";
import LinkCard from "./LinkCard";

const Links = ({links, setLinks}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
      .then((response) => {
        setTags(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <br />
      <AddLink tags={tags} setTags={setTags} setLinks={setLinks} />
      <LinkCard
        tags={tags}
        setTags={setTags}
        links={links}
        setLinks={setLinks}
      />
    </div>
  );
};

export default Links;
