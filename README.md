# Geothermal Development Company - Contact Forms & Email Management

## 🌍 Overview
A fast, flexible site with custom homepage, working contact forms for partnerships and tenders, and a backend that sends submissions directly to emails with full deployment capability.

## ✨ Features

### ✅ Email Functionality Enhancements
- **Professional HTML Email Templates** - Branded, mobile-responsive emails for partnerships and tenders
- **User Confirmation Emails** - Automated receipt confirmations sent to form submitters
- **Admin Notifications** - Form submissions forwarded to admin with form-specific templates
- **File Attachment Support** - Users can upload up to 5 documents per submission (PDF, Word, Excel, TXT, Images)
- **Form-Type Differentiation** - Separate handling and templates for Partnership vs. Tender inquiries

### 🎨 Frontend Features
- Mobile-responsive design
- Inquiry type selector (Partnership/Tender)
- Optional file upload with validation
- Real-time form submission feedback
- Spam protection via validation

### 🔧 Backend Features
- Express.js REST API
- Multer for secure file handling
- MongoDB integration for submission storage
- Nodemailer for reliable email delivery
- CORS enabled for frontend communication
- Error handling and logging

### 📦 Deployment Ready
- Vercel configuration included
- Environment variables support
- Scalable architecture

## 📋 Email Templates

### 1. User Confirmation Email
- Professional header with branding
- Personalized greeting
- Confirmation of inquiry type
- Next steps information
- Footer with company details

### 2. Partnership Admin Email
- Blue-themed design
- Contact information
- Message content with formatting
- Attachment list
- Timestamp

### 3. Tender Admin Email
- Red-themed design
- Contact information
- Message content with formatting
- Attachment list
- Timestamp

## 🚀 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (free tier available)
- Gmail account with app-specific password

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geothermal-development-company
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your settings:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ADMIN_EMAIL=admin@geothermal.com
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/geothermal
   PORT=3000
   NODE_ENV=production
   ```

4. **Gmail Configuration**
   - Enable 2-Factor Authentication in Gmail
   - Generate an [App Password](https://myaccount.google.com/apppasswords)
   - Use the 16-character password in `EMAIL_PASS`

5. **MongoDB Setup**
   - Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database user
   - Get your connection string and add it to `.env`

6. **Start the server**
   ```bash
   npm run dev    # Development with auto-reload
   npm start      # Production
   ```

## 📡 API Endpoints

### Partnership Form Submission
```
POST /api/contact-partnership
Content-Type: multipart/form-data

Body:
{
  name: string (required),
  email: string (required),
  message: string (required),
  attachments: file[] (optional, max 5 files, 10MB each)
}

Response:
{
  message: "Partnership inquiry submitted successfully",
  success: true
}
```

### Tender Form Submission
```
POST /api/contact-tender
Content-Type: multipart/form-data

Body:
{
  name: string (required),
  email: string (required),
  message: string (required),
  attachments: file[] (optional, max 5 files, 10MB each)
}

Response:
{
  message: "Tender inquiry submitted successfully",
  success: true
}
```

## 📂 Project Structure

```
├── index.js              # Entry point
├── server.js             # Express server setup
├── formRoutes.js         # API routes with multer
├── formController.js     # Form handling logic
├── sendEmail.js          # Email templates and sending
├── submission.js         # MongoDB schema and save logic
├── index.html            # Frontend form
├── style.css             # Styling
├── sitemap.xml           # SEO sitemap
├── vercel.json           # Vercel deployment config
├── package.json          # Dependencies
├── .env                  # Environment variables (do not commit)
├── .env.example          # Environment template
└── uploads/              # Uploaded files directory (auto-created)
```

## 🔐 Security Features

- **File Validation** - Only allowed file types (PDF, Office, TXT, Images)
- **File Size Limits** - Max 10MB per file, 5 files per submission
- **Form Validation** - Required field validation on frontend and backend
- **CORS Protection** - Configured CORS headers
- **MongoDB Connection** - Connection pooling and security

## 🌐 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy email functionality improvements"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Configure Custom Domain**
   - Add your domain in Vercel project settings
   - Update DNS records as instructed

## 🧪 Testing

### Manual Testing Checklist
- [ ] Partnership form submission with file
- [ ] Tender form submission with file
- [ ] User confirmation email received
- [ ] Admin notification email received
- [ ] Submission stored in MongoDB
- [ ] File attachments accessible
- [ ] Error handling (invalid email, missing fields)
- [ ] Mobile responsiveness

## 📧 Email Testing with Mailtrap (Optional)

For development, use [Mailtrap](https://mailtrap.io/) to test emails:

```javascript
// In sendEmail.js for development
const transporter = nodeMailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});
```

## 🐛 Troubleshooting

### Emails not sending
- Check EMAIL_USER and EMAIL_PASS in .env
- Verify Gmail app-specific password is 16 characters
- Check email quota (Gmail allows ~500 emails/day)
- Review console logs for detailed errors

### Files not uploading
- Check file size (max 10MB)
- Verify file type is allowed
- Ensure uploads directory exists and is writable

### MongoDB connection issues
- Verify MONGODB_URI format
- Check database user permissions
- Whitelist your IP in MongoDB Atlas

## 📞 Support

For issues or questions, contact: support@geothermaldev.com

## 📄 License

ISC License - See LICENSE file for details

---

**Last Updated:** 2026-05-20  
**Version:** 1.0.0