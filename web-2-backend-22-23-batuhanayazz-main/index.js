// Import express
import express from 'express';
// Import cors
import cors from 'cors';
//import the allRoutes function from our routes.js file
import allRoutes from './src/route/routes.js';
//import mongoose
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//import dotenv;
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();

// Setup the port for the server
const port = process.env.PORT || 3000;

//set connection between the API and mongoDB
mongoose.Promise = global.Promise;
console.log()
mongoose.connect(
  `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//parse requests and make it readable for our API
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//call the allRoute function and send app which initializes express
allRoutes(app);

// When a get request is made to / or the default page 
app.get('/', (req, res) =>
res.status(300).redirect('/info.html')
);

//print a message
app.listen(port, () => {
    console.log("running on port: " + port);
});