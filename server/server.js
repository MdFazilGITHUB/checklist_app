const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const connectDB = require("./config/connectDB");
const taskRoute = require("./routes/taskRoute");
const { getTask, addTask, updateTask, deleteTask } = require("./controllers/taskControllers");

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.get("/get", getTask);
app.post("/add", addTask);
app.put("/update/:id", updateTask);
app.delete("/delete/:id", deleteTask);

app.listen(PORT, () => {
  console.log("Server is running:", PORT);
});
