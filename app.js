import express from 'express';
import __dirname from './__dirname.js';
import mongodb, { ObjectId } from 'mongodb';
async function connection()
{
    try
    {
        const mongoClient=new mongodb.MongoClient("mongodb://127.0.0.1:27017");
        await mongoClient.connect()
        console.log('connection is norm');
        let db = mongoClient.db('p3v').collection('users');
        let app = express();

        app.use(express.static(__dirname + '/root/'))
        app.use(express.json())

        app.get('/api/get/users', async function (req, res) {
           

            let obj = await db.find().toArray();
            console.log(res);
            res.json(obj)
        })

        app.post('/api/data',async function (req, res) {
            console.log(req.body);
            await db.insertOne(req.body);
        })

        app.post('/api/delete/users',async function (req, res) {
            let id = req.body.clickedelement;
            console.log(id)
    
            await db.deleteOne({ _id: new ObjectId(id)});
        })

        app.listen(3000, function () {
            console.log('running');
        })
    }catch (error) {
    console.log(error);
    }
}
connection()




