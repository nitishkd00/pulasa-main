// Test script to simulate registration flow
import axios from 'axios';

async function testRegistration() {
  try {
    console.log('🧪 Testing registration flow...');
    
    const testData = {
      email: 'test-registration@example.com',
      password: '123456',
      name: 'Test Registration User'
    };

    console.log('📤 Sending registration request...');
    const response = await axios.post('https://api.pulasa.com/api/auth/register', testData);
    
    console.log('📥 Backend response:', JSON.stringify(response.data, null, 2));
    
    // Simulate frontend handling
    const result = {
      success: response.data.success,
      user: response.data.user,
      otpRequired: response.data.otpRequired
    };
    
    console.log('🔍 Frontend result object:', JSON.stringify(result, null, 2));
    
    if (result.success && result.user) {
      if (result.otpRequired) {
        console.log('✅ OTP verification required - should redirect to /verify-otp');
      } else {
        console.log('✅ Registration successful without OTP - should redirect to /');
      }
    } else {
      console.log('❌ Registration failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testRegistration();
