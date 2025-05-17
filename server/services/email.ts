import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(emailData: EmailData): Promise<void> {
  // Get environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const emailPort = parseInt(process.env.EMAIL_PORT || '587');
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'puneetsinha@yahoo.com';
  
  // Validate credentials
  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.");
  }
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
  
  // HTML email template
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          background-color: #003366;
          color: white;
          padding: 10px 20px;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #777;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .value {
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <p>You have received a new message from your portfolio website contact form.</p>
          
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${emailData.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${emailData.email}</div>
          </div>
          
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${emailData.subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${emailData.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your portfolio website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Email options
  const mailOptions = {
    from: `"Portfolio Contact" <${emailUser}>`,
    to: recipientEmail,
    replyTo: emailData.email,
    subject: `Portfolio Contact: ${emailData.subject}`,
    text: `
      Name: ${emailData.name}
      Email: ${emailData.email}
      Subject: ${emailData.subject}
      Message: ${emailData.message}
    `,
    html: htmlTemplate,
  };
  
  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
}
