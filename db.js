const { MongoClient } = require('mongodb')
require('dotenv').config();

let dbConnection
let uri = "mongodb+srv://cataraga95:123@cluster0.crfgraq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}