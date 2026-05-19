export async function handleForm(req, res) {
    try {
        await sendEmail(req.body.email, 'New Contact Form Submission', `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`);
        res.status(200).json({ message: 'Form submitted successfully' });
    
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}