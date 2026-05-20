const { sendFormEmails } = require('./sendEmail');
const saveSubmission = require('./submission');

async function handleForm(req, res) {
    try {
        const { name, email, message, formType } = req.body;

        // Validate required fields
        if (!name || !email || !message || !formType) {
            return res.status(400).json({
                message: 'Missing required fields: name, email, message, formType',
                success: false
            });
        }

        // Prepare submission data
        const submissionData = {
            name,
            email,
            message,
            formType, // 'Partnership' or 'Tender'
            attachments: req.files || [],
            submittedAt: new Date()
        };

        // Save to database
        await saveSubmission(submissionData);

        // Send emails to user and admin
        await sendFormEmails(submissionData);

        res.status(200).json({
            message: 'Form submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
}

module.exports = { handleForm };