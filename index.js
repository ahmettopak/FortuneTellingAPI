const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

const port = 3000;

app.use(bodyParser.json());

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

    if (!fortune || !age || !relationship || !gender || !mood) {
        res.status(400).json({ error: 'Eksik bilgi var!' });
        return;
    }

    const mongooseFortune = new Fortune({ fortune, age, relationship, gender, mood });

    mongooseFortune.save()
        .then(savedData => {
            res.status(201).json("Fortune save success");
        })
        .catch(err => {
            console.error('Veri eklenirken hata oluştu:', err);
            res.status(500).json({ error: 'Veri eklenirken hata oluştu!' });
        });
});

app.listen(port, () => {
    console.log(`Server Runing.`);
});
