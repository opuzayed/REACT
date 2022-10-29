const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //req.body te undefined dekhacche tar jonno likte hoi.

app.get('/', (req, res) => {
    res.send('Simple node server running');
});

const users = [
    {id : 1, name : 'sabana', email : 'saba@gmail.com'},
    {id : 2, name : 'sabila', email : 'sabila@gmail.com'},
    {id : 3, name : 'kabila', email : 'kabila@gmail.com'}
];

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req,res) => {
    console.log('post api called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});