'use strict';

var express = require('express');
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

app.get('/', function (req, res) {
    res.send('welcome to the todo page');
});

app.get('/todos', function (req, res) {
    res.json(todos);
});

app.get('/todos/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var todo;

    for (let i = 0; i < todos.length; i++) {
        if (id === todos[i].id) {
            todo = todos[i];
        }
    }// end for
    
    if (todo)
        res.json(todo);
    else
        res.status(400).send();
});

app.listen(PORT, function () {
    console.log('server started at port:' + PORT);
});