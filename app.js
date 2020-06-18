const express = require("express");
const App = express();
const cors = require("cors");
const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
const subCategories = require("./routes/subCategories");
const users = require("./routes/users");
const hours = require("./routes/hours");
const access = require("./routes/access");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verifyToken = require("./routes/verifyToken");
const verifyRole = require("./routes/verifyRole");
dotenv.config();
mongoose
  .connect(process.env.DEV_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("successfully connected to database"))
  .catch((error) => console.log(error));

//middlewares
App.use(cors());
App.use(express.json());
App.use("", access);
App.use(verifyToken);
App.use(verifyRole);
App.use("/api/users", users);
App.use("/api/projects", projects);
App.use("/api/subCategories", subCategories);
App.use("/api/tasks", tasks);
App.use("/api/hours", hours);

App.listen(5000, () => console.log("Server running on port 5000"));
