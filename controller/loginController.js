const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (users.length === 0) {
      return res.status(400).send("User not found");
    }

    const result = await bcrypt.compare(password, users[0].password);

    if (result) {
      const token = jwt.sign({ userId: users[0].id }, secretKey, {
        expiresIn: "10h",
      });
      const tokened = { token, id: users[0].id };
      return res.json(tokened);
    }

    return res.status(400).send("Incorrect password");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { postLogin };
