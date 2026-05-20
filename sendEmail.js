const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailTemplates = {
  userConfirmation: (name, formType) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #1abc9c; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
        .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        h1 { margin: 0; font-size: 28px; }
        .highlight { color: #1abc9c; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Submission!</h1>
        </div>
        <div class="content">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>We have successfully received your <span class="highlight">${formType}</span> inquiry. Thank you for your interest in partnering with us or participating in our tender opportunities.</p>
          <p>Our team will review your submission and get back to you shortly with more information.</p>
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>We will review your submission within 2-3 business days</li>
            <li>If your inquiry matches our requirements, we'll contact you directly</li>
            <li>You can also reach out to us with any questions</li>
          </ul>
          <p>Best regards,<br><strong>Geothermal Development Company</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Geothermal Development Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  partnershipAdmin: (name, email, message, attachments = []) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #2980b9; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
        .field { margin: 15px 0; }
        .field-label { color: #2980b9; font-weight: bold; font-size: 12px; text-transform: uppercase; }
        .field-value { margin-top: 5px; padding: 10px; background-color: #ecf0f1; border-left: 4px solid #2980b9; }
        .attachments { margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd; }
        .badge { display: inline-block; background-color: #2980b9; color: white; padding: 5px 10px; border-radius: 3px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 New Partnership Inquiry</h1>
        </div>
        <div class="content">
          <p><strong>Priority:</strong> <span class="badge">PARTNERSHIP</span></p>
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
          </div>
          ${attachments.length > 0 ? `
            <div class="attachments">
              <strong>📎 Attachments:</strong>
              <ul>
                ${attachments.map(file => `<li>${file}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            <strong>Received:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `,

  tenderAdmin: (name, email, message, attachments = []) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #e74c3c; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
        .field { margin: 15px 0; }
        .field-label { color: #e74c3c; font-weight: bold; font-size: 12px; text-transform: uppercase; }
        .field-value { margin-top: 5px; padding: 10px; background-color: #fadbd8; border-left: 4px solid #e74c3c; }
        .attachments { margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd; }
        .badge { display: inline-block; background-color: #e74c3c; color: white; padding: 5px 10px; border-radius: 3px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 New Tender Inquiry</h1>
        </div>
        <div class="content">
          <p><strong>Type:</strong> <span class="badge">TENDER</span></p>
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
          </div>
          ${attachments.length > 0 ? `
            <div class="attachments">
              <strong>📎 Attachments:</strong>
              <ul>
                ${attachments.map(file => `<li>${file}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            <strong>Received:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `
};

async function sendEmail(to, subject, htmlContent, attachments = []) {
  const mailOptions = {
    from: `"Geothermal Development Company" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent
  };

  if (attachments && attachments.length > 0) {
    mailOptions.attachments = attachments;
  }

  await transporter.sendMail(mailOptions);
}

async function sendFormEmails(submissionData) {
  const { name, email, message, formType, attachments = [] } = submissionData;
  
  try {
    // Send confirmation to user
    const userEmailHtml = emailTemplates.userConfirmation(name, formType);
    await sendEmail(
      email,
      `Confirmation: Your ${formType} Inquiry Received`,
      userEmailHtml
    );

    // Send admin notification
    const adminEmailHtml = formType === 'Partnership' 
      ? emailTemplates.partnershipAdmin(name, email, message, attachments.map(a => a.originalname || a))
      : emailTemplates.tenderAdmin(name, email, message, attachments.map(a => a.originalname || a));
    
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    await sendEmail(
      adminEmail,
      `New ${formType} Inquiry from ${name}`,
      adminEmailHtml,
      attachments
    );

    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}

module.exports = { sendEmail, sendFormEmails, emailTemplates };