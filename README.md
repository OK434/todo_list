# 📅 Full Stack Todo Calendar App

A full-stack task management application that allows users to create, organize, and track their tasks through an interactive calendar interface.

Built using **React, Node.js, Express, and MongoDB** and deployed on a custom VPS server using **Nginx**.

---

## 🚀 Live Demo

* 🌐 App: http://65.75.200.75/todo_list/

---

## ✨ Features

* 🔐 User Authentication (Signup / Login)
* 📝 Create, update, and delete tasks
* 📅 Interactive calendar view (FullCalendar)
* ✅ Mark tasks as completed
* 📬 Daily email reminders for pending tasks
* 📱 Fully responsive UI

---

## 🛠 Tech Stack

### Frontend

* React
* Tailwind CSS
* FullCalendar

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Nodemailer
* Node-Cron

### Deployment

* VPS (Ubuntu Server)
* Nginx (Reverse Proxy)
* PM2 (Process Manager)

---

## 🧠 Architecture

* Frontend served via **Nginx**
* Backend running on **Node.js (Port 3000)**
* Nginx handles routing:

  * `/todo_list` → frontend
  * `/todo_list/api` → backend

---

## 📸 Screenshots

> *(Add screenshots here later — dashboard, calendar view, login page, etc.)*

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/OK434/todo_list.git
cd todo_list
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

### 4. Run the application

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run build
```

---

## 📬 Email Reminder System

The system automatically sends daily reminders for pending tasks using:

* ⏰ node-cron
* 📧 nodemailer

---

## 👨‍💻 Author

**Omar Rashed**

* GitHub: https://github.com/OK434

---

## 🔥 Notes

* The project is deployed on a custom VPS using Nginx reverse proxy.
* No CORS issues thanks to same-origin architecture.
* Production-ready setup using PM2 for process management.

---
