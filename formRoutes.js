const express = require('express');
const multer = require('multer');
const path = require('path');
const { sendFormEmails } = require('./sendEmail');
const saveSubmission = require('./submission');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, TXT, and images are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Partnership form submission
router.post('/contact-partnership', upload.array('attachments', 5), async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prepare submission data
    const submissionData = {
      name,
      email,
      message,
      formType: 'Partnership',
      attachments: req.files || [],
      submittedAt: new Date()
    };

    // Save to database
    await saveSubmission(submissionData);

    // Send emails
    await sendFormEmails(submissionData);

    res.status(200).json({
      message: 'Partnership inquiry submitted successfully',
      success: true
    });
  } catch (error) {
    console.error('Error in partnership submission:', error);
    res.status(500).json({
      message: 'Error processing your submission',
      success: false
    });
  }
});

// Tender form submission
router.post('/contact-tender', upload.array('attachments', 5), async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prepare submission data
    const submissionData = {
      name,
      email,
      message,
      formType: 'Tender',
      attachments: req.files || [],
      submittedAt: new Date()
    };

    // Save to database
    await saveSubmission(submissionData);

    // Send emails
    await sendFormEmails(submissionData);

    res.status(200).json({
      message: 'Tender inquiry submitted successfully',
      success: true
    });
  } catch (error) {
    console.error('Error in tender submission:', error);
    res.status(500).json({
      message: 'Error processing your submission',
      success: false
    });
  }
});

module.exports = router;