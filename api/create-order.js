const fetch = require('node-fetch');

export default async function handler(req, res) {
  // Cashfree API Endpoint
  const url = "https://sandbox.cashfree.com/pg/orders"; 

  const options = {
    method: "POST",
    headers: {
      "x-client-id": process.env.CF_APP_ID,
      "x-client-secret": process.env.CF_SECRET_KEY,
      "x-api-version": "2023-08-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      order_amount: 499.00,
      order_currency: "INR",
      customer_details: {
        customer_id: "user_" + Math.floor(Math.random() * 10000),
        customer_phone: "9999999999",
        customer_email: "test@example.com"
      },
      order_meta: {
        // Redirect back to success page
        return_url: `https://${req.headers.host}/success?order_id={order_id}`
      }
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
