// code to build and initialize DB goes here
const {
  client,
  createLink,
  getAllLinks,
  getLinksByTagName,
  getLinkById,
  updateLink,
} = require("./index");
// const createLink =  require("./links");

async function buildTables() {
  try {
    // drop tables in correct order
    client.query(`
        DROP TABLE IF EXISTS link_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS links;
      `);
    // build tables in correct order
    console.log("Starting to build tables...");
    // create all tables, in the correct order
    // links & tags **
    await client.query(`
      CREATE TABLE links(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        link VARCHAR(255) NOT NULL,
        "createDate" DATE NOT NULL,
        "clickNum" INTEGER,
        comment VARCHAR(255) NOT NULL,
        active boolean DEFAULT true
        
      );
       CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags(
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE("linkId","tagId")
      )
      `);
    console.log("Finished building tables...");
  } catch (error) {
    throw error;
  }
}

const createInitialLinks = async () => {
  console.log("Starting to create initial links...");
  try {
    const linksToCreate = [
      {
        name: "Google",
        link: "https://www.google.com",
        createDate: "2020/08/31",
        clickNum: 12,
        comment: "A search utility tool.",
        tags: ["search"],
      },
      {
        name: "Facebook",
        link: "https://www.facebook.com",
        createDate: "2021/02/14",
        clickNum: 23,
        comment: "A social media website for family and friends.",
        tags: ["social"],
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com",
        createDate: "2020/12/25",
        clickNum: 1,
        comment: "A social networking site for professional relationships",
        tags: ["social", "business"],
      },
    ];
    const links = await Promise.all(linksToCreate.map(createLink));
    console.log("Links created:");
    console.log(links);
    console.log("Finished creating links!");
  } catch (err) {
    console.error("There was a problem creating LINKS");
    throw err;
  }
};

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialLinks();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllLinks");
    const links = await getAllLinks();
    console.log("Result:", links);

    console.log("Calling updateLink on links[0]");
    const updateLinkResult = await updateLink(links[0].id, {
      name: "Instagram",
      link: "http://www.instagram.com",
      comment: "Photo sharing Social Network",
      tags: ["social", "photography"],
    });
    console.log("Result:", updateLinkResult);

    console.log("Calling getLinkById with 1");
    const linkById = await getLinkById(1);
    console.log("Result:", linkById);

    console.log("Calling updateLink on links[1], only updating tags");
    const updateLinkTagsResult = await updateLink(links[1].id, {
      tags: ["social", "networking", "marketplace"],
    });
    console.log("Result:", updateLinkTagsResult);

    console.log("Calling getPostsByTagName with #social");
    const linksWithSocial = await getLinksByTagName("social");
    console.log("Result:", linksWithSocial);

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
