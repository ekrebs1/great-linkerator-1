import React, { useState } from "react";
import AddLink from "./AddLink";
import LinkCard from "./LinkCard";

const Links = () => {

  const [links, setLinks] = useState([]);

  return (
    <div style={{ marginTop: "50px" }}>
    <AddLink setLinks={setLinks} />
    <LinkCard links={links} setLinks={setLinks} />
    </div>
  );
};

export default Links;