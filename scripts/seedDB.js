const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/hightidedb"
);

const taskSeed = [
    {
    title: "Do Push Ups, Sit Ups, and Pull Ups",
    points: 3,
    taskAccomplished: false
    },
    {
    title: "Reach out to a Friend",
    points: 5,
    taskAccomplished: false
    },
    {
    title: "Go out to lunch with a biz Contact",
    points: 3,
    taskAccomplished: false
    },
    {
    title: "Play Fetch with hatch",
    points: 1,
    taskAccomplished: false
    },
    {
    title: "Eat a Vegetable",
    points: 1,
    taskAccomplished: false
    },
    {
    title: "Cook Dinner",
    points: 5,
    taskAccomplished: false
    },
    {
    title: "Go see a Movie",
    points: 1,
    taskAccomplished: false
    },
];

db.Task
    .remove({})
    .then(() => db.Task.collection.insertMany(taskSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });