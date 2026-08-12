import dotenv from 'dotenv';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

dotenv.config();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const keyId = (process.env.CASEFREE_KEY_ID || '').replace(/^"(.*)"$/, '$1').trim();
const keySecret = (process.env.CASEFREE_KEY_SECRET || '').replace(/^"(.*)"$/, '$1').trim();

// Configure Cashfree SDK
Cashfree.XClientId = keyId;
Cashfree.XClientSecret = keySecret;
Cashfree.XEnvironment = CFEnvironment.SANDBOX;

const pg = new Cashfree();

async function testSDK() {
  console.log('Testing with Cashfree SDK...');
  
  const request = {
    order_amount: 1.00,
    order_currency: "INR",
    order_id: `ord_sdk_${Date.now()}`,
    customer_details: {
      customer_id: "test_user_123",
      customer_phone: "9999999999",
      customer_email: "test@idrtech.in",
      customer_name: "Test User"
    }
  };

  try {
    const response = await pg.PGCreateOrder(request);
    console.log("Success! Order Details:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("SDK Error Response Status:", error.response.status);
      console.error("SDK Error Response Details:", error.response.data);
    } else {
      console.error("SDK Error Message:", error.message);
    }
  }
}

testSDK();
