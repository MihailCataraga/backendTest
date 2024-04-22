const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

let db

connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log("Server run on port 3000")
        })
        db = getDb()
    }
})



app.get('/books', (req, res) => {
    let books = [];
    db.collection('books')
        .find()
        .sort({author: 1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch the documents"})
        })
})

app.get('/books/:id', (req,res) => {
    db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then((book) => {
            res.status(200).json(book)
        })
        .catch(err => {
            res.status(500).json({error: "Could not found id"})
        })
})

app.post('/books', (req, res) => {
    const newBook = req.body
    db.collection('books')
        .insertOne(newBook)
        .then(() => {
            res.status(201).json({message: 'New book added'})
        })
        .catch((err) => {
            res.status(500).json({error: err})
        })
})