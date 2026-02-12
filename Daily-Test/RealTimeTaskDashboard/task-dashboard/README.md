# Real-Time Task Dashboard

A full-stack Real-Time Task Management application built using React, Node.js, Express, Socket.io, and MongoDB.

---

## Features

- Real-time task updates across multiple users
- Active users tracking
- Admin and Team Member role-based access
- Add Task
- Edit Task
- Delete Task
- MongoDB persistent storage

---

## Project Structure

task-dashboard/
│
├── backend/
│   ├── server.js
│   ├── models/
│   │     └── Task.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── Login.js
    │   ├── TaskDashboard.js
    │   ├── socket.js
    │   └── index.js

---

## Installation and Setup

### 1. Install MongoDB

Download and install MongoDB Community Server.

Make sure MongoDB is running:

mongod

---

### 2. Backend Setup

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Start backend server:

node server.js

You should see:

MongoDB Connected  
Server running on port 5000

---

### 3. Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start React app:

npm start

Application runs at:

http://localhost:3000

---

## User Roles

### Admin
- Can add tasks
- Can edit tasks
- Can delete tasks
- Can view active users

### Team Member
- Can view tasks
- Can view active users
- Cannot modify tasks

---

## Real-Time Functionality

The application uses Socket.io to:

- Broadcast task updates instantly
- Sync task changes across multiple tabs
- Track active connected users

---

## Database

MongoDB is used to store tasks persistently.

Database Name:
taskdb

Collection:
tasks

---

## How to Test Real-Time

1. Open the application in two browser tabs.
2. Login as Admin in one tab.
3. Login as Team Member in another tab.
4. Add, edit, or delete tasks.
5. Observe instant updates in both tabs.

---

## Technologies Used

- React.js
- Node.js
- Express.js
- Socket.io
- MongoDB
- Mongoose

---

## Future Improvements

- Authentication with JWT
- UI enhancement using Tailwind CSS
- Toast notifications
- Deployment on cloud platform

---

## License

This project is for educational purposes.
