For the backend part 
goto into backend folder 
and type npm i and then node server.js 
here you can send the post request at http://localhost:3001/enroll and in body send send this 
{
  name: "John Doe",
  mobile_number: "1234567890",
  age: 25,
  batch: "7-8AM",
  month: 12,
  year: 2023,
  paymentAmount: 500,
};

I have hosted the backend at render and hence the backend is running at https://flexmoney-backend-ty9r.onrender.com
so you can rather send the post request at https://flexmoney-backend-ty9r.onrender.com/health/enroll

For frontend goto into yoga folder and type npm i and npm start to start the frontend in frontend i have used the backend deployed link and axios to perform post request after various checks 
here is the youtube url https://www.youtube.com/watch?v=q8XfsQW4w5o
and here is the 

SQL command for creation of table 
CREATE TABLE user_table (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  age INT NOT NULL,
  batch VARCHAR(20) NOT NULL,
  month VARCHAR(20) NOT NULL,
  year VARCHAR(20) NOT NULL
  
);
CREATE TABLE payment_table (
  payment_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user_table(user_id),
  payment_amount DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL
);

and here is the ER diagram
![Screenshot 2023-12-17 142805](https://github.com/AbhayNumb/flexmoney_backend_frontend/assets/90024961/e7116bc3-085b-4e58-af9f-bf8015801f72)
