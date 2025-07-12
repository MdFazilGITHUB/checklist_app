const app = require("express");
const {
  getTask,
  addTask,
  updateTask,
  deleteTask
} = require("../controllers/taskControllers");
const router = app.Router();

router.get("/get", getTask);
router.post("/add", addTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
