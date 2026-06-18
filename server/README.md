# Yuva Mitra Backend Server

Node.js/Express server for handling contact form submissions using Nodemailer.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`
   - Update email credentials:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password  # Use Gmail App Password, not regular password
   FROM_EMAIL=your-email@gmail.com
   TO_EMAIL=recipient@gmail.com
   ```

3. **Gmail App Password Setup:**
   - Enable 2FA on your Gmail account
   - Generate an App Password: Google Account Settings → Security → App Passwords
   - Use the generated password in `SMTP_PASS`

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## API Endpoints

### POST /api/contact
Send contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Enquiry sent successfully"
}
```

### GET /api/health
Health check endpoint.

## Deployment

### AWS/Azure Options:
1. **AWS EC2** - Full server deployment
2. **AWS Lambda** - Serverless function
3. **Azure App Service** - Web app deployment
4. **Azure Functions** - Serverless function

### Environment Variables for Production:
Make sure to set all environment variables in your deployment platform:
- `SMTP_HOST`
- `SMTP_PORT` 
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL`
- `TO_EMAIL`
- `PORT`
- `NODE_ENV=production`