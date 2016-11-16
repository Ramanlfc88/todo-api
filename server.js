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
}];


app.get('/', function (req, res) {
    res.send('welcome to the todo page');
});

app.get('/todos', function (req, res) {
    res.json(todos);
});


app.listen(PORT, function () {
    console.log('server started at port:' + PORT);
});