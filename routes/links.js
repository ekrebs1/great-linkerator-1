const express = require("express");
const linksRouter = express.Router();
const {createLink} = require("../db/links")

linksRouter.use((_, __, next) => {
    console.log("A request is being made to /links route");
    next();
  });

  linksRouter.post("/links", async (req, res, next) => {
    const { name, link, createDate, comment } = req.body;
    try {
      if (!name) {
        res.send(next(console.error({message: "Must include name"})));
      }
      if (!link) {
        res.send(next(console.error({message: "Must include link"})));
      }
      if (!comment) {
        res.send(next(console.error({message: "Must include comment"})));
      }

      const newLink = await createLink({ name, link, createDate, comment });
  
      res.send({
        message: "Link successfully created!",
        newLink,
      });
  
      // res.send({ user });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = linksRouter;