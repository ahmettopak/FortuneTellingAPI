const Fortune = require('../models/fortune.js')

const createFortune = async (req, res) => {
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
}

const getFortune = async (req, res) => {
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
}

module.exports = { getFortune, createFortune }