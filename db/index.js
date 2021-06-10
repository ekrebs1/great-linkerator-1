// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/linkerator-db";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
// database methods

// +++++++++++ FUNCTIONS FOR LINKS ++++++++++++ //

const createLink = async ({ name, link, createDate, clickNum, comment, tags = [] }) => {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
            INSERT INTO links(name, link, "createDate", "clickNum", comment)
            VALUES($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
         `,
      [name, link, createDate, clickNum, comment]
    );
      const tagList = await createTags(tags)
      return await addTagsToLink(links.id, tagList);

  } catch (err) {
    console.error("Could not create links in index.js [createLink()]");
    throw err;
  }
};

async function getLinkById(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(`
        SELECT *
        FROM links
        WHERE id=${linkId};
      `);

    if (!link) {
      throw {name: "LinkNotFoundError",
      message: "Could not find a link with that linkId"}
    }

    const { rows: tags } = await client.query(`
      SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagId"
      WHERE link_tags."linkId"=$1;
    `, [linkId])
    link.tags = tags;
    return link
    

  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  // select and return an array of all routines, include their activities
  try {
    const { rows: id } = await client.query(`
    SELECT id 
    FROM links;
  `);

    const links = await Promise.all(id.map((link) => getLinkById(link.id)));
    return links;
  } catch (error) {
    throw error;
  }
}

async function updateLink(linkId, fields = {}) {
  // read off the tags & remove that field 
  const { tags } = fields; // might be undefined
  delete fields.tags;

  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      await client.query(`
        UPDATE links
        SET ${ setString }
        WHERE id=${ linkId }
        RETURNING *;
      `, Object.values(fields));
    }

    // return early if there's no tags to update
    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    // make any new tags that need to be made
    const tagList = await createTags(tags);
    const tagListIdString = tagList.map(
      tag => `${ tag.id }`
    ).join(', ');

    // delete any link_tags from the database which aren't in that tagList
    await client.query(`
      DELETE FROM link_tags
      WHERE "tagId"
      NOT IN (${ tagListIdString })
      AND "linkId"=$1;
    `, [linkId]);

    // and create link_tags as necessary
    await addTagsToLink(linkId, tagList);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

// +++++++++++ FUNCTIONS FOR TAGS ++++++++++++ //

const createTags = async (tagList) => {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");
  try {
    await client.query(
      `
        INSERT INTO tags(name)
        VALUES(${insertValues})
        ON CONFLICT (name) DO NOTHING
     `, tagList);

     const { rows } = await client.query (`
     SELECT * FROM tags
     WHERE name
     IN (${selectValues});
     `, tagList)

     return rows

  } catch (err) {
    console.error("Could not create tags in index.js [createTag()]");
  }
};

const getAllTags = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM tags;
  `);

    return rows;
  } catch (error) {
    throw error;
  }
};

// +++++++++++ FUNCTIONS FOR ADDING TAGS TO LINKS ++++++++++++ //

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);
  } catch (error) {
    throw error;
  }
}

async function addTagsToLink(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map(
      tag => createLinkTag(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}


async function getLinksByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(`
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tags.name=$1;
    `, [tagName]);

    return await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));
  } catch (error) {
    throw error;
  }
} 

async function getAllLinkTags() {
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM link_tags;
    `)

    return rows
  } catch (err) {
    console.err("Could not get all link tags!")
    throw err
  }
}

// export
module.exports = {
  client,
  createLink,
  createTags,
  getAllLinks,
  getAllTags,
  getLinkById,
  addTagsToLink,
  getLinksByTagName,
  getAllLinkTags,
  updateLink

};
