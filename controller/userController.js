const sql = require("../db");

const getUsers = async (req, res) => {
  const data = await sql`SELECt * FROM users;`;
  res.send(data);
};

const postUsersSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const data = await sql`
      INSERT INTO users(email, name, password, avatarImg, createdAt, updatedAt)
      VALUES (${email}, ${name}, ${encryptedPassword}, 'img', NOW(), NOW())
    `;

    const token = jwt.sign({ userId: data[0].id }, secretKey, {
      expiresIn: "10h",
    });

    res.status(201).send({ message: "Successfully created", token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { getUsers, postUsersSignup };
