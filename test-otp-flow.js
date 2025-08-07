// Test script to simulate complete OTP verification flow
import axios from 'axios';

async function testOtpFlow() {
  try {
    console.log('🧪 Testing complete OTP verification flow...');
    
    // Step 1: Register user
    const testData = {
      email: 'test-otp-flow@example.com',
      password: '123456',
      name: 'Test OTP Flow User'
    };

    console.log('📤 Step 1: Sending registration request...');
    const registerResponse = await axios.post('https://api.pulasa.com/api/auth/register', testData);
    
    console.log('📥 Registration response:', JSON.stringify(registerResponse.data, null, 2));
    
    if (registerResponse.data.success && registerResponse.data.otpRequired) {
      console.log('✅ Registration successful with OTP required');
      
      // Step 2: Simulate OTP verification (we'll use a fake OTP for testing)
      console.log('📤 Step 2: Sending OTP verification request...');
      const otpResponse = await axios.post('https://api.pulasa.com/api/auth/verify-otp', {
        email: testData.email,
        otp: '123456' // This will fail, but we can see the flow
      });
      
      console.log('📥 OTP verification response:', JSON.stringify(otpResponse.data, null, 2));
      
      if (otpResponse.data.success) {
        console.log('✅ OTP verification successful');
      } else {
        console.log('❌ OTP verification failed (expected with fake OTP)');
      }
    } else {
      console.log('❌ Registration failed or OTP not required');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testOtpFlow();
