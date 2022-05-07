const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// user :item1
// password:LolICTUb2s06GwPc



const uri = `mongodb+srv://${process.env.ITEM_USER}:${process.env.ITEM_PASS}@cluster0.gjdhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('item connected')
    // perform actions on the collection object
    client.close();
});


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('running website');
})

app.listen(port, () => {
    console.log('Listening to port', port);
})