const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

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
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});