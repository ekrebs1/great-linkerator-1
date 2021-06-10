const apiRouter = require('express').Router();
const {getAllLinks, getAllTags, createLink, createTags, getAllLinkTags, getLinksByTagName, getLinkById} = require('../db/index')

apiRouter.get("/", (_, res, __) => {
  res.send({
    message: "API is under construction!"
  });
});

// LINKS ROUTERS

apiRouter.get("/links", async (_, res, __) => {
  try {
    const links = await getAllLinks()
  
  res.send({
    links: links
  });} catch (err) {
    throw err
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
    linkData.comment = comment
    if (!name) {
      res.send(next(console.error({message: "Must include name"})));
    }
    if (!link) {
      res.send(next(console.error({message: "Must include link"})));
    }
    if (!comment) {
      res.send(next(console.error({message: "Must include comment"})));
    }

    const newLink = await createLink(linkData);

    res.send({
      message: "Link successfully created!",
      newLink,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

apiRouter.patch("/:linkId", async (req, res, next) => {
  const { linkId } = req.params;
  const { name, link, comment, tags } = req.body;

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

  try {
      const updatedLink = await updateLink(linkId, updateFields);
      res.send({ link: updatedLink });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// TAGS ROUTERS

apiRouter.get("/tags", async (_, res, next) => {
  try {
    const tags = await getAllTags()
  
  res.send({
    tags: tags
  });} catch (err) {
    next(err)
  }
});

apiRouter.post("/tags", async (_, res, next) => {
  try {
    const newTag = await createTags()
    res.send({
      message: "Tag successfully created!",
      newTag
    })
  } catch ({ name, message }) {
    next({ name, message });
  }
})

apiRouter.get("/:tagName/links", async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;
  console.log(req.params)
  try {
    // use our method to get posts by tag name from the db
    const links = await getLinksByTagName(tagName);

    res.send([
     links
    ]);
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message });
  }
});

// LINK TAGS ROUTERS

apiRouter.get("/link_tags", async (_, res, next) => {
  try {
    const linkTags = await getAllLinkTags();
    res.send({
      message: "Link tags successfully retrieved",
      linkTags
    })
  } catch ({ name, message }) {
    next({ name, message });
  }
})
module.exports = {apiRouter};
