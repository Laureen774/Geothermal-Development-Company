const Submission = require('./models/Submission');
const sendEmail = require('./sendEmail');
module.exports = async function (req, res) {
   
    try {
        const { name, email, message } = req.body;
        const newSubmission = new Submission({ name, email, message });
        await newSubmission.save();
        await sendEmail(email, 'Form Submission Received', `Thank you, ${name}. Your submission has been received.`);
        res.status(201).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};