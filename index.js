const express = require('express')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 7000;
const cors = require('cors')


const corsOptions = {
    origin: "*",
    credentials: true,

    // optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());



// z6vHAS2EaQe1hLs7
// real-state


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fxm2qso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const userCollection = client.db("real-estate").collection("all-user");
        const propertyCollection = client.db("real-estate").collection("property");
        const reviewCollection = client.db("real-estate").collection("reviews");
        const wishListCollection = client.db("real-estate").collection("wish-list");
        const offerCollection = client.db("real-estate").collection("offers");
        //admin verify
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin });
        })
        //agent verify

        app.get('/users/agent/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let agent = false;
            if (user) {
                agent = user?.role === 'agent';
            }
            res.send({ agent });
        })
        //Property get data
        app.get('/property-advertisement', async (req, res) => {
            const result = await propertyCollection.find().toArray();
            res.send(result);
        })
        app.get('/property/:email', async (req, res) => {
            const email = req.params.email;
            const query = { agent_email: email }
            const result = await propertyCollection.find(query).toArray();
            res.send(result);
        })

        app.get(`/single-property/:id`, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            result = await propertyCollection.findOne(query);
            res.send(result);
        })
        //Property Post data
        app.post('/property', async (req, res) => {
            const data = req.body;
            const result = await propertyCollection.insertOne(data);
            res.send(result);
        });


        //Review get data
        app.get('/user/review/:id', async (req, res) => {
            const dataId = req.params.id;
            console.log(dataId)
            const query = { id: dataId };
            const result = await reviewCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/reviews/:email', async (req, res) => {
            const email = req.params.email;
            const query = { user_email: email };
            const result = await reviewCollection.find(query).toArray();
            res.send(result);
        })
        //Review Post Data
        app.post('/user/review', async (req, res) => {
            const data = req.body;
            const result = await reviewCollection.insertOne(data);
            res.send(result);
        })
        //WishList get data
        app.get('/wishlist/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { user_email: email };
            const result = await wishListCollection.find(query).toArray();
            res.send(result);

        })

        //WishList Post data
        app.post('/wish-list', async (req, res) => {
            const wishData = req.body;
            const result = await wishListCollection.insertOne(wishData);
            res.send(result);
        })


        //Make an offer
        app.get('/make-offer/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await wishListCollection.findOne(query);
            res.send(result);
        })

        app.get('/user/offer/:email', async (req, res) => {
            const email = req.params.email;
            const query = { user_email: email };
            const result = await offerCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/offer-property', async (req, res) => {
            const data = req.body;
            const result = await offerCollection.insertOne(data);
            res.send(result);
        })



        //All user data post data

        app.post('/all-user', async (req, res) => {
            const user = req.body;
            // insert email if user doesnt exists: 
            // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });






        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})