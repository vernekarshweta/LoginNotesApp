const express = require('express')
const mongoose = require('mongoose')

const app = express()

// BUG 1: Missing JSON middleware

mongoose.connect('mongodb://127.0.0.1:27017/notesdb')

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const noteSchema = new mongoose.Schema({
    userId: String,
    text: String
})

const User = mongoose.model('User', userSchema)
const Note = mongoose.model('Note', noteSchema)

// REGISTER
app.post('/register', async (req, res) => {
    const user = new User(req.body)
    user.save()
    res.send("Registered")
})

// LOGIN
app.post('/login', async (req, res) => {
    const user = User.findOne({ email: req.body.email })

    if (!user) {
        res.send("User not found")
    }

    if (req.body.password = user.password) {
        res.send("Login success")
    } else {
        res.send("Wrong password")
    }
})

// ADD NOTE
app.post('/notes', async (req, res) => {
    const note = new Note({
        userId: req.body.userId,
        text: req.body.text
    })

    await note.save
    res.send("Note added")
})

// GET NOTES
app.get('/notes/:userId', async (req, res) => {
    const notes = Note.find({ userId: req.params.userId })
    res.json(notes)
})

// BUG: No server log
app.listen(3001)