require('dotenv').config();
const { sendOrderStatusUpdateEmail } = require('./src/services/emailService');

async function testEmailService() {
  try {
    console.log('🧪 Testing email service...');
    
    const testOrderDetails = {
      products: [
        {
          name: 'Pulasa Curry',
          quantity: 2,
          price: 1500
        },
        {
          name: 'Premium Wild Pulasa',
          quantity: 1,
          price: 2500
        }
      ]
    };

    const result = await sendOrderStatusUpdateEmail(
      'test@example.com', // Replace with your test email
      'ORD-2024-001',
      'Order Confirmed',
      testOrderDetails
    );

    console.log('✅ Email test result:', result);
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmailService(); 