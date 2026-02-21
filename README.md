# Student Management System

A RESTful API for managing student-teacher registrations built with Node.js, Express, and MySQL.

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Start](#start)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Docker Commands](#docker-commands)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

##  Features

- Teacher management (create, retrieve)
- Student management (create, retrieve)
- Main stories:
+ As a teacher, register one or more students to a specified teacher.
+ As a teacher, retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).
+ As a teacher, suspend a specified student.
+ As a teacher, retrieve a list of students who can receive a given notification.
- Input validation with Joi
- Error handling middleware

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **Containerization**: Docker, Docker Compose
- **Validation**: Joi
- **ORM**: mysql2 (with promises)

##  Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)
- Git (optional, for cloning the repository)

**Verify installations:**

```bash
docker --version
docker-compose --version
```

## Start

### 1. Clone the Repository

```bash
git clone https://github.com/nghia182004/interviewrepo.git
cd interview
```

### 2. Set Up Environment Variables

```bash
# Copy the template file
cp .env.template .env

# Edit .env with your preferred text editor
nano .env  
```

**Update the following values in `.env`:**

```bash
MYSQL_ROOT_PASSWORD=YourSecurePassword123!
MYSQL_DATABASE=studentmanagement

DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YourSecurePassword123!
DB_NAME=studentmanagement
```

### 3. Start the Application

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 4. Verify the Application

```bash

# Check database connection
docker-compose exec db mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "SHOW DATABASES;"
```

The application should now be running at:
- **Backend API**: http://localhost:3500
- **MySQL Database**: localhost:3307 (external port)


