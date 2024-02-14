const sql = require("../db");

const getCategory = async (req, res) => {
  const data = await sql`SELECT * FROM category`;
  res.send(data);
};

const postCategory = async (req, res) => {
  const { category, icon, userid } = req.body;

  try {
    const user = await sql`SELECT * FROM users WHERE id = ${userid}`;
    // const category = await sql`SELECT * FROM category WHERE id = ${categoryId}`;
    if (user.length === 0) {
      return res.status(400).send("User not found");
    }
    const categoryData = await sql`
        INSERT INTO category(category_image, name, description, createdAt, updatedAt,userid)
        VALUES (${icon}, ${category}, 'Category description', NOW(), NOW(),${userid})
      `;
    res.status(201).send({ message: "Successfully created" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { getCategory, postCategory };
