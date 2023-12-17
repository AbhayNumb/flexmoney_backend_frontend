// Form.js

import React, { useState } from "react";
import "./Form.css";
import { useAlert } from "react-alert";
import axios from "axios";

const Form = () => {
  const alert = useAlert();

  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    age: "",
    batch: "6-7AM",
    month: "January",
    year: "",
    paymentAmount: 500,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://flexmoney-backend-ty9r.onrender.com/enroll",
        formData, // Assumes formData is an object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (!response.data.success) {
        console.error("Server error response:", response.data);
        alert.error("Server response indicates an error");
        return;
      } else {
        setFormData({
          name: "",
          mobile_number: "",
          age: "",
          batch: "6-7AM",
          month: "January",
          year: "",
          paymentAmount: 500,
        });
      }

      alert.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      console.error(
        "Error details:",
        error.response ? error.response.data : "No response details available"
      );
      alert.error(error.response.data.message);
    }
  };

  const validateForm = () => {
    const { name, mobile_number, age, month, year } = formData;

    // Check if any field is empty
    if (!name || !mobile_number || !age || !month || !year) {
      alert.error(`Fill the required details`);
      return false;
    }

    // Check if the mobile number is 10 digits
    if (mobile_number.length !== 10 || !/^\d+$/.test(mobile_number)) {
      alert.error("Mobile Number Should be 10 digit.");
      return false;
    }

    // Check if the year is a 4-digit number
    if (!/^\d{4}$/.test(year)) {
      alert.error("Please fill year in XXXX format.");
      return false;
    }

    // Check if the age is between 18 and 65
    const numericAge = parseInt(age, 10);
    if (isNaN(numericAge) || numericAge < 18 || numericAge > 65) {
      alert.error("Age must be between 18 and 65.");
      return false;
    }

    return true;
  };

  return (
    <div className="form-container">
      <h2>Yoga Class Enrollment</h2>
      <form onSubmit={handleSubmit} className="enrollment-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
            pattern="\d{10}"
            placeholder="Enter your mobile number"
            required
          />
        </label>

        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            required
          />
        </label>

        <label>
          Batch:
          <select
            name="batch"
            value={formData.batch}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled selected>
              Select a batch
            </option>
            {["6-7AM", "7-8AM", "8-9AM", "5-6PM"].map((batchOption) => (
              <option key={batchOption} value={batchOption}>
                {batchOption}
              </option>
            ))}
          </select>
        </label>

        <label>
          Month:
          <select
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled selected>
              Select a month
            </option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((monthOption, index) => (
              <option key={index} value={monthOption}>
                {monthOption}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year:
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            pattern="\d{4}"
            placeholder="xxxx"
            required
          />
        </label>

        <label>
          Payment Amount:
          <input
            type="text"
            name="paymentAmount"
            value={formData.paymentAmount}
            readOnly
            required
          />
        </label>

        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default Form;
