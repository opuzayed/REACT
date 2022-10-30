const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //req.body te undefined dekhacche tar jonno likte hoi.

app.get('/', (req, res) => {
    res.send('Simple node server running');
});

const users = [
    {id : 1, name : 'Sabana', email : 'saba@gmail.com'},
    {id : 2, name : 'Sabila', email : 'sabila@gmail.com'},
    {id : 3, name : 'Kabila', email : 'kabila@gmail.com'}
];

//pass : ebNk79LB2dSKO2lV
//Name : dbUserOpu



const uri = "mongodb+srv://dbUserOpu:ebNk79LB2dSKO2lV@cluster0.rsulfhn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection = client.db('simplenode').collection('users');
           
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        app.post('/users', async(req,res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            console.log(result);
            res.send(user);
        });

    }
    finally{

    }
}
run().catch(error =>console.log(error))


// app.get('/users', (req, res) => {
//     if(req.query.name)
//     {
//         const search = req.query.name;
//         const filtered = users.filter(u => u.name.toLowerCase().indexOf(search)>=0);
//         res.send(filtered);
//     }
//     else{

//         res.send(users);
//     }
// });

/* app.post('/users', (req,res) => {
    console.log('post api called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
}); */

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});