const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* user:DataUser2
pass:QAIPkAQ1PzhVS2MJ */

const uri = "mongodb+srv://DataUser2:QAIPkAQ1PzhVS2MJ@cluster0.rsulfhn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const userCollection = client.db('CrudMongoDb').collection('users');

        app.get('/users', async (req, res)=> {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.get('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.delete('/users/:id', async(req,res) => {
            const id = req.params.id;
            console.log('trying to delete ' , id);
            const query = {_id:ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        });
    }
    finally{

    }
}
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello from node server');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});