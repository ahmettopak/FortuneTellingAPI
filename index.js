const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connection success.');
    })
    .catch(err => {
        console.error('MongoDB connection erorr:', err);
    });

// Mongoose modeli oluşturma
const FortuneSchema = new mongoose.Schema({
    fortune: { type: String, required: true },
    age: { type: Number, required: true },
    relationship: { type: String, required: true },
    gender: { type: String, required: true },
    mood: { type: String, required: true },
});

const Fortune = mongoose.model('Fortune', FortuneSchema);

// POST isteği ile veri ekleme
app.post('/fortune', (req, res) => {
    const { fortune, age, relationship, gender, mood } = req.body;

    if (!fortune) {
        res.status(400).json({ error: 'Fortune information missing' });
        return;
    }
    if (!age) {
        res.status(400).json({ error: 'Age information missing' });
        return;
    }
    if (!relationship) {
        res.status(400).json({ error: 'Relationship information missing' });
        return;
    }
    if (!gender) {
        res.status(400).json({ error: 'Gender information missing' });
        return;
    }
    if (!mood) {
        res.status(400).json({ error: 'Mood information missing' });
        return;
    }

    const mongooseFortune = new Fortune({ fortune, age, relationship, gender, mood });

    mongooseFortune.save()
        .then(savedData => {
            res.status(201).json("Fortune save success");
        })
        .catch(err => {
            console.error('Error adding data:', err);
            res.status(500).json({ error: 'Error adding data!' });
        });
});

app.post("/getfortune", async (req, res) => {
    const { age, relationship, gender, mood } = req.body;

    try {
        const matchedDocuments = await Fortune.find({
            age: age,
            relationship: relationship,
            gender: gender,
            mood: mood,

        });

        if (matchedDocuments.length === 0) {
            res.status(404).json({ error: "No matching data found." });
        } else {
            const randomIndex = Math.floor(Math.random() * matchedDocuments.length);
            const randomDocument = matchedDocuments[randomIndex];
            res.json(randomDocument);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.listen(port, () => {
    console.log(`Server Runing.`);
});
