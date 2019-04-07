const router = require("express").Router();
const taskController = require("../../controllers/taskController");

// Matches with "/api/tasks"
router.route("/:userId")
  .get(taskController.findAll)
  .post(taskController.create);
  
// 

// Matches with "/api/tasks/:id"
router.route("/:userId/:taskId")
  .get(taskController.findById)
  .put(taskController.update)
  .delete(taskController.remove);
  

module.exports = router;