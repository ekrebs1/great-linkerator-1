const apiRouter = require("express").Router();
const {
  getAllLinks,
  getAllTags,
  createLink,
  createTags,
  getAllLinkTags,
  getLinksByTagName,
  getLinkById,
  updateLink,
} = require("../db/index");

apiRouter.get("/", (_, res, __) => {
  res.send({
    message: "API is under construction!",
  });
});

// LINKS ROUTERS

apiRouter.get("/links", async (_, res, __) => {
  try {
    const links = await getAllLinks();

    res.send({
      links: links,
    });
  } catch ({ name, message }) {
    next({ name: "LinkGetError", message: "Unable to get links!" });
  }
});

apiRouter.post("/links", async (req, res, next) => {
  const { name, link, createDate, comment, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const linkData = {};

  if (tagArr.length) {
    linkData.tags = tagArr;
  }

  try {
    linkData.name = name;
    linkData.link = link;
    linkData.createDate = createDate;
    linkData.comment = comment;
    if (!name) {
      res.send(next(console.error({ message: "Must include name" })));
    }
    if (!link) {
      res.send(next(console.error({ message: "Must include link" })));
    }
    if (!comment) {
      res.send(next(console.error({ message: "Must include comment" })));
    }

    const newLink = await createLink(linkData);

    res.send({
      message: "Link successfully created!",
      newLink,
    });
  } catch ({ name, message }) {
    next({ name: "LinkCreateError", message: "Unable to create new link!" });
  }
});

apiRouter.patch("/:linkId", async (req, res, next) => {
  const { linkId } = req.params;
  const { name, link, comment, tags, clickNum, favorite } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (name) {
    updateFields.name = name;
  }

  if (link) {
    updateFields.link = link;
  }

  if (comment) {
    updateFields.comment = comment;
  }

  if (clickNum) {
    updateFields.clickNum = clickNum;
  }

  if (favorite === true || favorite === false) {
    updateFields.favorite = favorite;
  }

  try {
    const updatedLink = await updateLink(linkId, updateFields);
    res.send({ updatedLink });
  } catch ({ name, message }) {
    next({ name: "LinkUpdateError", message: "Unable to update link info!" });
  }
});


apiRouter.delete("/:linkId", async (req, res, next) => {
  try {
    const link = await getLinkById(req.params.linkId);
    if (link.active) {
      const updatedLink = await updateLink(link.id, { active: false });
      res.send({ link: updatedLink });
    } else {
      res.send({
        name: "LinkInactiveError",
        message: "This link is already deleted!",
      });
    }
  } catch ({ name, message }) {
    next({ name: "LinkUpdateError", message: "Unable to update link info!" });
  }
});

// TAGS ROUTERS

apiRouter.get("/tags", async (_, res, next) => {
  try {
    const tags = await getAllTags();

    res.send({
      tags: tags,
    });
  } catch ({ name, message }) {
    next({ name: "TagGetError", message: "Unable to get tags!" });
  }
});

apiRouter.post("/tags", async (_, res, next) => {
  try {
    const newTag = await createTags();
    res.send({
      message: "Tag successfully created!",
      newTag,
    });
  } catch ({ name, message }) {
    next({ name: "TagCreateError", message: "Unable to create new tag!" });
  }
});

apiRouter.get("/:tagName/links", async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;
  try {
    // use our method to get posts by tag name from the db
    const links = await getLinksByTagName(tagName);

    res.send([links]);
  } catch ({ name, message }) {
    next({ name: "LinkByTagError", message: "Unable to get links by tag!" });
  }
});

// LINK TAGS ROUTERS

apiRouter.get("/link_tags", async (_, res, next) => {
  try {
    const linkTags = await getAllLinkTags();
    res.send({
      message: "Link tags successfully retrieved",
      linkTags,
    });
  } catch ({ name, message }) {
    next({ name: "LinkTagGetError", message: "Unable to get link_tags!" });
  }
});
module.exports = { apiRouter };
