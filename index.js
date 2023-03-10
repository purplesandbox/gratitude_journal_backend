require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const { Gratitude, Affirmation, Step } = require('./models/Logs');
var md5 = require('md5');

const cors = require('cors');

const app= express();
app.use(express.json());
app.use(cors());

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

mongoose.connect("mongodb+srv://" + username + ":" + password + "@cluster0.fkigrvg.mongodb.net/journalDB", {
    useNewUrlParser: true, 
    useUnifiedTopology:true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


// API for getting all the records from the Logs collections of the JournalDB

app.get('/gratitudes', async (req, res) => { 

    Gratitude.find({}, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.json(result);
        }
    });

});


app.get('/affirmations', async (req, res) => { 

    Affirmation.find({}, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.json(result);
        }
    });

});


app.get('/steps', async (req, res) => { 

    Step.find({}, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.json(result);
        }
    });

});





// API for creating the records in the todo collection (Todo model) in the mern-todo database


app.post('/gratitude/new', (req, res) => {
    const gratitude = new Gratitude ({
        gratitude: req.body.gratitude
    });
    gratitude.save();
    res.json(gratitude);
});



app.post('/affirmation/new', (req, res) => {
    const affirmation = new Affirmation ({
        affirmation: req.body.affirmation
    });
    affirmation.save();
    res.json(affirmation);
});


app.post('/step/new', (req, res) => {
    const step = new Step ({
        step: req.body.step
    });
    step.save();
    res.json(step);
});




// API for deleting the records from Logs collections in the JournalDB

app.delete('/gratitude/delete/:id', async (req,res) => {
    const result = await Gratitude.findByIdAndDelete(req.params.id);
    res.json(result);

});


app.delete('/affirmation/delete/:id', async (req,res) => {

    const result = await Affirmation.findByIdAndDelete(req.params.id);

    res.json(result);

});


app.delete('/step/delete/:id', async (req,res) => {

    const result = await Step.findByIdAndDelete(req.params.id);

    res.json(result);

});


// API for updating the records from the Logs collections of the Journal database

app.put("/gratitude/update/:id", async (req,res) => {
    const result = await Gratitude.findById(req.params.id);
    result.gratitude = req.body.gratitude;
    result.save();
    res.json(result);
})




app.put("/affirmation/update/:id", async (req,res) => {
    const result = await Affirmation.findById(req.params.id);
    result.affirmation = req.body.affirmation;
    result.save();
    res.json(result);
})




app.put("/step/update/:id", async (req,res) => {
    const NewStep = req.body.step;
    const result = await Step.findById(req.params.id);
    result.step = NewStep;
    result.save();
    res.json(result);
})




app.listen(process.env.PORT || 3001, () => {
    console.log("Server runs on the port", process.env.PORT);
});
