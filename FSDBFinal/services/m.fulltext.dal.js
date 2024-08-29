const { ObjectId } = require("mongodb");
const dal = require("./m.db");
async function getFullText(keyword) {
 if(DEBUG) console.log("mongo.dal.getFullText()");
 try {
   await dal.connect();
   const database = dal.client.db("autosearch");
   const collection = database.collection("autos");
   const collections = await database.listCollections().toArray;
   console.log(collections);
   console.log(`Connected to database: ${database.databaseName}, collection: ${collection.collectionName}`);
   const results= await collection.find({}).limit(10).toArray();
   console.log(results);
   const result=await collection.find({make:{$regex:keyword,$options:'i'}}).toArray();
   console.log(result)
   return result;
 } catch(err) {
   console.error('Error occurred while connecting to MongoDB:', err);
   throw err;
 } finally {
   dal.client.close();
 }
};
module.exports = {
   getFullText,
}