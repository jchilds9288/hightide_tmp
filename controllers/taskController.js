const db = require("../models");

module.exports = {
    
   findAll: (req, res) => {
       console.log(req.params.tasks)
       console.log("findall")
    db.User
        .findOne({_id:req.params.userId})
        .populate("Task")
        // .sort({ points: -1 })
        .select("task")
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   }, 

   findById: (req, res) => {
    db.Task
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
   },

   create: async (req, res) => {
    //    console.log(req)
    console.log('WHERE IS THE USER');
    console.log(req.auth)

    const newTask = await new db.Task(req.body).save()
    console.log(newTask)
    console.log(req.body.userId)
    // db.Task
    //     .create(req.body)
        // .then(dbModel=>{
        const updatedUser = await db.User.findOneAndUpdate({_id: req.body.userId}, {$push: {task: newTask._id}} ).exec()
        // const user = await db.User.findById(req.body.userId).exec()

        console.log(updatedUser)
        // })
        // .then(dbModel => {
        //     console.log('SKIP')
        //     return res.json(dbModel)
        // })
        // .catch(err => res.status(422).json(err));
   },

   update: function(req, res){
    db.Task
        .findOneAndUpdate({_id: req.params.id}, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
   },

   remove: (req, res) => {
    db.Task
        .findById({_id: req.params.taskId})
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   }
}