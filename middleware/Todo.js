const Todo = require("../models/Todo");

exports.getTodoById = (req, res, next, todoId) => {
  // we will get todoId from the router.param
  // we will use .findById() method to find the todo which has id==todoId
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    // we will store that todo in req.todo
    req.todo = todo;
    // Because this is a middleware we have to call the next()
    next();
  });
};

exports.getAllTodos = (req, res) => {
  // simply use .find() method and it will return all the todos
  Todo.find()
    .sort("-createdAt")
    .exec((err, todos) => {
      // error checking
      if (err || !todos) {
        return res.status(400).json({
          error: "Something went wrong in finding all todos",
        });
      }
      // return all the todos in json format
      res.json(todos);
    });
};

exports.getTodo = (req, res) => {
 
  return res.json(req.todo);
};

exports.createTodo = (req, res) => {
  // we will get json data from the frontend i.e. req.body
  const todo = new Todo(req.body);

  // create a todo instance by passing 'task' field from 'req.body'
  todo.save((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    // todo is created
    // send the created todo as a json response
    res.json({ task });
  });
};

exports.updateTodo = (req, res) => {
  // take req.todo from getTodoById() middleware and
  // fetch the todo that user wants to update
  const todo = req.todo;
  todo.task = req.body.task;

  todo.save((err, t) => {
    if (err || !t) {
      return res.status(400).json({
        error: "something went wrong while updating",
      });
    }
    res.json(t);
  });
};

exports.deleteTodo = (req, res) => {

  const todo = req.todo;
  todo.remove((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "error",
      });
    }
    res.json({
      task_deleted: task,
      message: "Todo deleted successfully!",
    });
  });
};