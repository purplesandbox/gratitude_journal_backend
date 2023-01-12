const mongoose = require('mongoose');

const GratitudeSchema = new mongoose.Schema({

    gratitude:  String,

    timestamp: {
        type: String,
        default: Date.now()
    }
    
});



const AffirmationSchema = new mongoose.Schema({

    affirmation: String,

    timestamp: {
        type: String,
        default: Date.now()
    }
    

});


const StepSchema = new mongoose.Schema({

    step: String,

    timestamp: {
        type: String,
        default: Date.now()
    }
    

});


const Gratitude = mongoose.model("Gratitude", GratitudeSchema);

const Affirmation = mongoose.model("Affirmation", AffirmationSchema);

const Step = mongoose.model("Step", StepSchema);



module.exports = { Gratitude, Affirmation, Step };