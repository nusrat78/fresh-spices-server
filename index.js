const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// user :item1
// password:LolICTUb2s06GwPc


const uri = `mongodb+srv://${process.env.ITEM_USER}:${process.env.ITEM_PASS}@cluster0.gjdhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('inventory').collection('item');
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await inventoryCollection.findOne(query);
            res.send(item);
        })

        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await inventoryCollection.insertOne(newItem);
            res.send(result);
        })

        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await inventoryCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(console.dir);

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('running website');
})

app.listen(port, () => {
    console.log('Listening to port', port);
})