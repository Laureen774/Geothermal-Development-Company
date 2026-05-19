const mongoose = require('mongoose');
const submission = require('./models/submissionModel');
const { buffer } = require('node:stream/consumers');

async function saveSubmission(data) {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI, {
           bufferCommands: false,
           useNewUrlParser: true,
           useUnifiedTopology: true 
        });
    }

    const sub = new submission(data);
    await sub.save();
}

module.exports = saveSubmission;
