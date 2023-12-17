const axios = require("axios");

const data = {
  name: "John Doe",
  mobile_number: "1234567890",
  age: 25,
  batch: "7-8AM",
  month: 12,
  year: 2023,
  paymentAmount: 100,
};

axios
  .post("https://flexmoney-backend-ty9r.onrender.com/enroll", data)
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
