// code to build and initialize DB goes here
const {
  client,
  createLink,
  createTags,
  getAllLinks,
  getAllTags,
  getLinksByTagName,
  getLinkById,
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
        comment VARCHAR(255) NOT NULL
        
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
        tags: ["search"]
      },
      {
        name: "Facebook",
        link: "https://www.facebook.com",
        createDate: "2021/02/14",
        clickNum: 23,
        comment: "A social media website for family and friends.",
        tags: ["social"]
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com",
        createDate: "2020/12/25",
        clickNum: 1,
        comment: "A social networking site for professional relationships",
        tags: ["social", "business"]
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

// const createInitialTags = async () => {
//   console.log("Starting to create initial tags...");
//   try {
//     const tagsToCreate = [
//       {
//         name: "search",
//       },
//       {
//         name: "social",
//       },
//       {
//         name: "business",
//       },
//     ];
//     const tags = await Promise.all(tagsToCreate.map(createTags));
//     console.log("Links created:");
//     console.log(tags);
//     console.log("Finished creating tags!");
//   } catch (err) {
//     console.error("There was a problem creating TAGS");
//     throw err;
//   }
// };

async function rebuildDB() {
  try {
    client.connect();
    await buildTables()
    await createInitialLinks()
    // await createInitialTags()
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    // console.log("Calling getAllUsers");
    // const links = await getAllLinks();
    // console.log("Result:", links);

    // console.log("Calling updateUser on users[0]");
    // const updateUserResult = await updateUser(users[0].id, {
    //   name: "Newname Sogood",
    //   location: "Lesterville, KY"
    // });
    // console.log("Result:", updateUserResult);

    console.log("Calling getAllLinks");
    const links = await getAllLinks();
    console.log("Result:", links);

    // console.log("Calling updatePost on posts[0]");
    // const updatePostResult = await updatePost(posts[0].id, {
    //   title: "New Title",
    //   content: "Updated Content"
    // });
    // console.log("Result:", updatePostResult);

    console.log("Calling getLinkById with 1");
    const linkById = await getLinkById(1);
    console.log("Result:", linkById);

    // console.log("Calling updatePost on posts[1], only updating tags");
    // const updatePostTagsResult = await updatePost(posts[1].id, {
    // tags: ["#youcandoanything", "#redfish", "#bluefish"]
    // });
    // console.log("Result:", updatePostTagsResult);

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
