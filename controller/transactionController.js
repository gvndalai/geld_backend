const sql = require("../db");

const getTransaction = async (req, res) => {
  const data = await sql`SELECT * FROM transaction`;
  res.send(data);
};
const postTransaction = async (req, res) => {
  const { time, payee, date, amount, note, type, userId, category } = req.body;

  try {
    // const userId = req.user.userId;
    // console.log("userId", user);
    // const categoryId = req.category.id;
    const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
    // const category = await sql`SELECT * FROM category WHERE id = ${categoryId}`;
    if (user.length === 0) {
      return res.status(400).send("User not found");
    }

    // if (category.length === 0) {
    //   return res.status(400).send("Category not found");
    // }

    const transactionData = await sql`
        INSERT INTO transaction(userId, name, amount, transactionType, description, transactionDate, transactionTime, createdAt, updatedAt, categoryid)
        VALUES (${userId}, ${payee}, ${amount}, ${type}, ${note}, ${date}, ${time}, NOW(), NOW(), ${category})
      `;

    res.status(201).send({ message: "Successfully created" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
};

module.exports = { getTransaction, postTransaction };
