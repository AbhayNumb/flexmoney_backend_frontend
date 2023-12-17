const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2"); // Assuming you are using mysql2

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: "mysql-eef8b0c-dummydev0515-a227.a.aivencloud.com",
  port: 28352,
  user: "avnadmin",
  password: "AVNS_v1EAA-RWhpM8ykNH2FV", // Replace with your actual password
  database: "defaultdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API endpoint for checking database setup
app.get("/health", async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();
    await connection.query("SELECT 1");
    connection.release();
    res
      .status(200)
      .json({ success: true, message: "Database is connected and healthy." });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// API endpoint for user enrollment and payment
function completePayment(
  name,
  mobile_number,
  age,
  batch,
  month,
  year,
  paymentAmount,
  res
) {
  // Check for age validity
  if (age < 18 || age > 65) {
    return res
      .status(400)
      .json({ success: false, message: "Age must be between 18 and 65." });
  }

  // Check for valid batch selection
  const allowedBatches = ["6-7AM", "7-8AM", "8-9AM", "5-6PM"];
  if (!allowedBatches.includes(batch)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid batch selection." });
  }

  // Check for valid enrollment date
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid enrollment date." });
  }

  // Check if the user is already enrolled in the specified month and year
  const existingEnrollmentQuery =
    "SELECT user_id FROM user_table WHERE mobile_number = ? AND name = ? AND month = ? AND year = ?";
  const existingEnrollmentValues = [mobile_number, name, month, year];
  pool.query(
    existingEnrollmentQuery,
    existingEnrollmentValues,
    function (existingEnrollmentError, existingEnrollmentResult) {
      if (existingEnrollmentError) {
        console.error(
          "Error checking existing enrollment:",
          existingEnrollmentError
        );
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }

      if (existingEnrollmentResult.length > 0) {
        // User is already enrolled in this month and year
        return res.status(400).json({
          success: false,
          message: "User is already enrolled in this month and year.",
        });
      }

      // Insert user data into the database
      const userInsertQuery =
        "INSERT INTO user_table(name, mobile_number, age, batch, month, year) VALUES(?, ?, ?, ?, ?, ?)";
      const userInsertValues = [name, mobile_number, age, batch, month, year];

      pool.query(
        userInsertQuery,
        userInsertValues,
        function (userError, userResults) {
          if (userError) {
            console.error("Error during user enrollment:", userError);
            return res
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
          }

          const userId = userResults.insertId;

          // Insert payment data into the database
          const paymentInsertQuery =
            "INSERT INTO payment_table(user_id, payment_amount, payment_date) VALUES(?, ?, ?)";
          const paymentInsertValues = [userId, paymentAmount, new Date()];

          pool.query(
            paymentInsertQuery,
            paymentInsertValues,
            function (paymentError, paymentResults) {
              if (paymentError) {
                console.error("Error during payment insertion:", paymentError);
                return res
                  .status(500)
                  .json({ success: false, message: "Internal Server Error" });
              }

              console.log("Enrollment and payment successful.");
              res.status(201).json({
                success: true,
                message: "Enrollment and payment successful.",
              });
            }
          );
        }
      );
    }
  );
}

// API endpoint for user enrollment and payment
app.post("/enroll", (req, res) => {
  try {
    const { name, mobile_number, age, batch, month, year, paymentAmount } =
      req.body;

    completePayment(
      name,
      mobile_number,
      age,
      batch,
      month,
      year,
      paymentAmount,
      res
    );
  } catch (error) {
    console.error("Error during enrollment and payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
