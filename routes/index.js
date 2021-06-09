const apiRouter = require('express').Router();
const {getAllLinks, getAllTags, createLink, createTags} = require('../db/index')

apiRouter.get("/", (_, res, __) => {
  res.send({
    message: "API is under construction!"
  });
});

// POSTS ROUTERS

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
    postData.tags = tagArr;
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
  } catch (err) {
    next(err)
  }
})

module.exports = {apiRouter};
