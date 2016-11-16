'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();


var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: "Meet John at Lunch",
    completed: false
}, {
        id: 2,
        description: "Go to Market",
        completed: false
    }, {
        id: 3,
        description: "Finish breakfast",
        completed: true
    }];

app.use(bodyParser.json()); // allows us to access the user sent json data with req.body 

app.get('/', function (req, res) {
    res.send('welcome to the todo page');
});

app.get('/todos', function (req, res) {
    var queryParams = req.query;
   
    if(queryParams.completed === undefined && queryParams.desc === undefined){
       return  res.json(todos);
    }
    var filteredTodos = todos;
    var completed, description;
    if(queryParams.completed !== undefined){
        completed = queryParams.completed === 'true' ? true : false;
        filteredTodos = _.where(filteredTodos, { completed: completed });
    }

    if(queryParams.desc !== undefined){
        description = queryParams.desc.toLowerCase();
        filteredTodos = _.filter(filteredTodos, function (item) {
            return item.description.toLowerCase().indexOf(description) > -1;
        });
    }

    res.json(filteredTodos);
});

app.get('/todos/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var todo = _.findWhere(todos, { id: id });


    /*
        for (let i = 0; i < todos.length; i++) {
            if (id === todos[i].id) {
                todo = todos[i];
            }
        }// end for
    */
    if (todo)
        res.json(todo);
    else
        res.status(400).send();
});

app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed'); // strip away overposted data

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }

    var currentId = todos[todos.length - 1].id + 1;
    body.description = body.description.trim();
    body.id = currentId;
    todos.push(body);

    res.json(body);
});

app.delete('/todos/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var todo = _.findWhere(todos, { id: id });

    if (todo) {
        todos = _.without(todos, todo);
        res.json(todo);
    } else
        res.status(400).json({ "error": "no todo found with id: " + id });

});

app.put('/todos/:id', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed'); // strip away overposted data
    var id = parseInt(req.params.id);
    var todo = _.findWhere(todos, { id: id });

    if (!todo) {
        return res.status(404).send();
    }
    todo = _.extend(todo, body);

    res.json(todo);
});

app.listen(PORT, function () {
    console.log('server started at port:' + PORT);
});