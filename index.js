const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
const dotenv = require("dotenv");
// const morgan = require("morgan");
const { verifyToken } = require("./middleware/auth");
const { postLogin } = require("./controller/loginController");
const {
  postCategory,
  getCategory,
} = require("./controller/categoryController");
const {
  postTransaction,
  getTransaction,
} = require("./controller/transactionController");
const { getUsers, postUsersSignup } = require("./controller/userController");

// Load environmental variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
// app.use(helmet());
// app.use(morgan("dev")); // Logging middleware

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", getUsers);
app.post("/signup", postUsersSignup);
app.get("/dashboard", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "user not exist" });
  }

  const { email, id } = req.user;
  res.json({ message: `Welcome, ${email}, ${id}` });
});
app.post("/login", postLogin);
app.get("/category", getCategory);
app.post("/category", postCategory);
app.get("/transaction", getTransaction);
app.post("/transaction", verifyToken, postTransaction);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
