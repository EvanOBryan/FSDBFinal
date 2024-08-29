const { MongoClient } = require('mongodb');

// Ensure that `MDBLOCAL` is defined in your environment variables
const uri = process.env.MDBLOCAL || "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri);

// Exporting an async function to connect and return the client
module.exports = {
    connect: async () => {
        try {
            await client.connect();
            console.log("Connected successfully to MongoDB");
            return client;
        } catch (error) {
            console.error("Failed to connect to MongoDB", error);
            throw error;
        }
    },
    client // Exporting the client object for other uses
};