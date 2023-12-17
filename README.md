Part 1: Backend Setup
# FlexMoney Enrollment System

## Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
Install dependencies:
  npm i
Start the backend server
  node server.js
Send a POST request to http://localhost:3001/enroll with the following JSON payload:

Alternatively, for the hosted backend, send the POST request to:

https://flexmoney-backend-ty9r.onrender.com/health/enroll
Part 2: Frontend Setup
## Frontend Setup

1. Navigate to the `yoga` folder:

   ```bash
   cd yoga
Install frontend dependencies:
  npm i
Start the frontend:
  npm start

The frontend uses the deployed backend link for performing POST requests.

### Part 3: Additional Information

```markdown
## Additional Information

- YouTube Demo: [FlexMoney Enrollment System Demo](https://www.youtube.com/watch?v=q8XfsQW4w5o)
Part 4: Database Schema
## Database Schema

### User Table

```sql
CREATE TABLE user_table (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  age INT NOT NULL,
  batch VARCHAR(20) NOT NULL,
  month VARCHAR(20) NOT NULL,
  year VARCHAR(20) NOT NULL
);
Payment Table
CREATE TABLE payment_table (
  payment_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user_table(user_id),
  payment_amount DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL
);
Part 5: ER Diagram
## ER Diagram
![ER Diagram](https://github.com/AbhayNumb/flexmoney_backend_frontend/assets/90024961/e7116bc3-085b-4e58-af9f-bf8015801f72)

