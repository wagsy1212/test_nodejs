const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://wagsy:Wagsy1234%40@cluster0.agwpz.mongodb.net/Courses?retryWrites=true&w=majority&appName=Cluster0';
const DATABASE_NAME = 'Courses';

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function CONNECT_DB() {
    await mongoClientInstance.connect();
    trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
}

const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to database first!');
    return trelloDatabaseInstance;
}

async function connectToMongoDB() {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB Atlas with Mongoose!');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
    }
  }

module.exports = { CONNECT_DB, GET_DB, connectToMongoDB };