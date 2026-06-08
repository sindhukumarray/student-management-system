# 🎓 Student Management System

A full-stack Student Management System built using Node.js, Express.js, MySQL, HTML, CSS, and JavaScript.

## 📌 Project Overview

This project helps manage student records efficiently. Users can add, update, delete, search, and export student data through an interactive dashboard.

## ✨ Features

* Add Student
* Update Student
* Delete Student
* Search Student
* Export Data to CSV
* Course Distribution Pie Chart
* Dark Mode with Local Storage
* Responsive Design
* MySQL Database Integration

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Libraries

* Chart.js
* mysql2
* cors

## 📊 Dashboard Features

* Total Students Count
* Database Status
* Course Distribution Chart
* Dark / Light Theme

## 🗄️ Database Schema

### Students Table

| Field  | Type              |
| ------ | ----------------- |
| id     | INT (Primary Key) |
| name   | VARCHAR(255)      |
| email  | VARCHAR(255)      |
| course | VARCHAR(255)      |

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/sindhukumarray/student-management-system.git
```

### Install Dependencies

```bash
npm install
```

### Create Database

```sql
CREATE DATABASE studentdb;

USE studentdb;

CREATE TABLE students(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255),
course VARCHAR(255)
);
```

### Run Project

```bash
node server.js
```

Open:

```text
http://localhost:5000
```

## 📷 Screenshots
<img width="1902" height="912" alt="image" src="https://github.com/user-attachments/assets/1c0daa90-7900-416e-a893-345548a9dcd8" />
<img width="1892" height="965" alt="image" src="https://github.com/user-attachments/assets/cf975395-fa03-4344-a475-0ff02b4fe466" />
## 🔮 Future Improvements

* Admin Login System
* Attendance Management
* Student Profile Photos
* Pagination
* Advanced Analytics Dashboard
* Email Notifications

## 👨‍💻 Developer

Sindhu Kumar Ray

GitHub:
https://github.com/sindhukumarray
