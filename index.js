const express = require('express')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 7000;
const cors = require('cors')


const corsOptions = {
    origin: [
        "http://localhost:5173",
        // "https://cardoctor-bd.web.app",
        "https://real-state-assigment-12.web.app",
    ],
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
        // await client.connect();

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
            const query = { verification_status: 'verified' };
            const result = await propertyCollection.find(query).toArray();
            res.send(result);
        })
        //admin manage all property table get data
        app.get('/property-admin-manage', async (req, res) => {

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

        //update agent property
        app.patch('/update-property/:id',async(req,res)=>{
            const {image, title,max_price,min_price, location} = req.body;
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const updateDoc={
                $set:{
                    image:image,
                    title:title,
                    max_price:max_price,
                    min_price:min_price,
                    location:location,

                }
            }
            const result = await propertyCollection.updateOne(query,updateDoc);
            res.send(result);
        })

        //agent delete propertu
        app.delete('/delete-agent-property/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await propertyCollection.deleteOne(query);
            res.send(result);
        })


        ///agent manage property data update
        app.patch('/verified-user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    verification_status: 'verified'
                }
            }
            const result = await propertyCollection.updateOne(query, updateDoc);
            res.send(result);
        })

        //admin reject add property
        app.patch('/reject-user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    verification_status: 'rejected'
                }
            }
            const result = await propertyCollection.updateOne(query, updateDoc);
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
        //by recent date
        app.get('/all-user/review', async (req, res) => {
            const result = await reviewCollection.find().sort({ 'time': -1 }).toArray();
            res.send(result);
        })

        // get for addmin manage review
        app.get('/manage-all-review', async (req, res) => {
            const result = await reviewCollection.find().toArray();
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

        //delete review admin
        app.delete('/delete-review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await reviewCollection.deleteOne(query);
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

        //Agent my Sold Property
        app.get('/agent-sold/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email)
            const status = 'sold';
            const query = { agent_email: email, status: 'bought' };
            const result = await offerCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/offer-property', async (req, res) => {
            const data = req.body;
            const result = await offerCollection.insertOne(data);
            res.send(result);
        })

        // status_accepted: 'accepted',
        //     status_reject: 'rejected',
        //     _id: _id,
        //     id: id,
        //     email: user_email,

        app.patch('/update-accept/:id', async (req, res) => {
            const query = req.query.id;
            // const data = req.body;
            let { id, _id, email, status_reject, status_accepted } = req.body;

            const filter = { id: id };
            const updateStatus = {
                $set: {
                    status: status_reject,
                }
            }
            const result = await offerCollection.updateMany(filter, updateStatus);


            //only accepted
            const filter_accepted = { user_email: email, id: id, };

            const updateStatus_accepted = {
                $set: {
                    status: status_accepted,
                }
            }
            const result_accepted = await offerCollection.updateOne(filter_accepted, updateStatus_accepted);
            res.send([result, result_accepted])

            // console.log("data.id",id,_id,status);
            // console.log(query);
        })

        app.patch('/update-reject/:id', async (req, res) => {
            const query = req.query.id;
            const data = req.body;
            let { id, _id, status, email } = req.body;

            const filter = { user_email: email, id: id };
            const updateStatus = {
                $set: {
                    status: status,
                }
            }
            const result = await offerCollection.updateOne(filter, updateStatus);
            res.send(result)
            // console.log("data.id",id,_id,status);
            // console.log(query);
        })

        // Agent requested Property
        app.get('/requsted-property/:email', async (req, res) => {
            const email = req.params.email;
            const query = { agent_email: email }
            const result = await offerCollection.find(query).toArray();
            res.send(result);
        })



        //All user data post data


        app.get('/manage-user', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.post('/all-user', async (req, res) => {
            const user = req.body;
            const { email } = req.body;
            const query = { email: email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        //admin opration user

        app.get('/make-admin/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'admin',
                }
            }
            const result = await userCollection.updateOne(query, updateDoc);
            res.send(result);
        })

        // make as admin

        app.get('/make-agent/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'agent',
                }
            }
            const result = await userCollection.updateOne(query, updateDoc);
            res.send(result);
        })

        //make as fruid

        app.get('/mark-as-fraud/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'fraud',
                }
            }
            const result = await userCollection.updateOne(query, updateDoc);
            res.send(result);
        })

        // delete user
        app.get('/delete-user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        //Price count
        app.get('/price-count/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await offerCollection.findOne(query);
            res.send(result);
        })



        //Payment 
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const calculateOrderAmount = parseInt(price * 100);
            console.log(calculateOrderAmount, 'amount inside the intent')

            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount,
                currency: 'usd',
                payment_method_types: ['card'],
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });

        // const payment = {
        //     transactionId: paymentIntent.id,
        //     date: new Date(), // utc date convert. use moment js to 
        //    buying_status: 'sold',
        // }
        //payment status update agent table
        app.put('/payments-update', async (req, res) => {
            const { id, transactionId, date, buying_status } = req.body;
            const options = { upsert: true };
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    buying_date: date,
                    buying_status: buying_status,
                    transactionId: transactionId,
                    status: 'bought',
                }
            }

            const result = await offerCollection.updateOne(query, updateDoc, options);
            res.send(result);
        })






        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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