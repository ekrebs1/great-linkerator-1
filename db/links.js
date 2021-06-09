const {
    client
    // other db methods 
  } = require('./index');

const createLink = async ({name, link, createDate, comment}) => {
    try {
        const {
            rows: [links],
          } = await client.query(
            `
              INSERT INTO links(name, link, "createDate", comment)
              VALUES($1, $2, $3, $4)
              ON CONFLICT (name) DO NOTHING
              RETURNING *;
           `,
            [name, link, createDate, comment]
          );

          return links;
    } catch (err) {
        console.error("Could not create links in links.js [createLink()]")
        throw err
    }
}

module.exports = createLink