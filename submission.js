const mongoose = require('mongoose');

// Define submission schema
const submissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    formType: {
        type: String,
        enum: ['Partnership', 'Tender'],
        required: true
    },
    attachments: [{
        filename: String,
        originalname: String,
        path: String,
        size: Number
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['new', 'reviewed', 'responded'],
        default: 'new'
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

async function saveSubmission(data) {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                bufferCommands: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }

        const submission = new Submission({
            name: data.name,
            email: data.email,
            message: data.message,
            formType: data.formType,
            attachments: data.attachments.map(file => ({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size
            })),
            submittedAt: data.submittedAt || new Date()
        });

        await submission.save();
        console.log('Submission saved successfully');
        return submission;
    } catch (error) {
        console.error('Error saving submission:', error);
        throw error;
    }
}

module.exports = saveSubmission;