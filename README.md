### Part 1: Backend Setup
# FlexMoney Assignment Enrollment System

## Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
2. Install dependencies:

   ```bash
   npm i
   
3. Start the backend server

   ```bash
   node server.js

4. Send a POST request to http://localhost:3001/enroll with the following JSON payload:

5. Alternatively, for the hosted backend, send the POST request to:
   
   ```bash
   https://flexmoney-backend-ty9r.onrender.com/health/enroll

   
### Part 2: Frontend Setup

## Frontend Setup

1. Navigate to the `yoga` folder:

   ```bash
   cd yoga

2. Install frontend dependencies:
   ```bash
   npm i

3. Start the frontend:
   ```bash
   npm start

4. The frontend uses the deployed backend link for performing POST requests.

### Part 3: Additional Information
YouTube Demo: [FlexMoney Enrollment System Demo](https://www.youtube.com/watch?v=q8XfsQW4w5o)

### Part 4: Database Schema
## Database Schema

### User Table

```
CREATE TABLE user_table (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  age INT NOT NULL,
  batch VARCHAR(20) NOT NULL,
  month VARCHAR(20) NOT NULL,
  year VARCHAR(20) NOT NULL
);
```

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
```
### Part 5: ER Diagram
![Screenshot 2023-12-17 142805](https://github.com/AbhayNumb/flexmoney_backend_frontend/assets/90024961/00128e11-45f9-42dd-83d4-59d8e2a9948f)

