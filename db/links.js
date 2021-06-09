const {
    client
    // other db methods 
  } = require('./index');

const createLinks = async ({name, link, createDate, comment}) => {
    try {
        const {
            rows: [links],
          } = await client.query(
            `
              INSERT INTO links(name, link, "createDate", comment)
              VALUES($1, $2, $3, $4)
              ON CONFLICT (name, link) DO NOTHING
              RETURNING *;
           `,
            [username, hashedPassword]
          );
          delete user.password;
          return user;
    } catch (err) {
        console.error("Could not create links in links.js [createLinks()]")
        throw err
    }
}