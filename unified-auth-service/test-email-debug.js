require('dotenv').config();

console.log('🔍 Email Service Debug Test');
console.log('============================');

// Check environment variables
console.log('Environment Variables:');
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✅ Set' : '❌ Not Set');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✅ Set' : '❌ Not Set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not Set');

// Test SES client creation
try {
  const { SESClient } = require("@aws-sdk/client-ses");
  
  const sesClient = new SESClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  
  console.log('✅ SES Client created successfully');
  
  // Test sending email
  const { sendOrderStatusUpdateEmail } = require('./src/services/emailService');
  
  const testOrderDetails = {
    products: [
      {
        name: 'Pulasa Curry',
        quantity: 1,
        price: 1500
      }
    ]
  };

  console.log('📧 Attempting to send test email...');
  
  // Replace with your actual email address for testing
  const testEmail = 'your-email@gmail.com'; // CHANGE THIS TO YOUR EMAIL
  
  sendOrderStatusUpdateEmail(
    testEmail,
    'TEST-001',
    'Order Confirmed',
    testOrderDetails
  ).then(result => {
    console.log('✅ Email sent successfully:', result);
  }).catch(error => {
    console.error('❌ Email failed:', error.message);
    console.error('Full error:', error);
    
    // Check specific error types
    if (error.name === 'MessageRejected') {
      console.error('🔍 This might be a sandbox mode issue - check if recipient email is verified in SES');
    } else if (error.name === 'InvalidParameterValue') {
      console.error('🔍 Check if sender email (noreply@pulasa.com) is verified in SES');
    }
  });
  
} catch (error) {
  console.error('❌ Failed to create SES client:', error.message);
} 