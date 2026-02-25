# Student Management System

A RESTful API for managing student-teacher registrations built with Node.js, Express, and MySQL.

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Start](#start)
- [API Endpoints](#api-endpoints)

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

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **Containerization**: Docker, Docker Compose
- **Validation**: Joi
- **ORM**: Prisma 6

##  Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)
- Git 

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
DATABASE_URL="mysql://root:${MYSQL_ROOT_PASSWORD}@db:3306/${MYSQL_DATABASE}"
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

- **MySQL Database**: localhost:3306 (
If your host already has something using 3306 (another MySQL instance, another container, etc.), you can map the container’s internal 3306 to a different host port like 3307 in the compose.yaml to avoid a port conflict. Also, the database is empty)


## API Endpoints
1. Register one or more students to a specified teacher.

- Endpoint: POST /api/register
- Headers: Content-Type: application/json
- Success response status: HTTP 204
- Request body example:

```bash
{
  "teacher": "teacherken@gmail.com"
  "students":
    [
      "studentjon@gmail.com",
      "studenthon@gmail.com"
    ]
}
```

2. Retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).

- Endpoint: GET /api/commonstudents
- Success response status: HTTP 200
- Request example 1: GET /api/commonstudents?teacher=teacherken%40gmail.com
- Success response body 1:
```bash
{
  "students" :
    [
      "commonstudent1@gmail.com", 
      "commonstudent2@gmail.com",
      "student_only_under_teacher_ken@gmail.com"
    ]
}
```

3. Suspend a specified student.

- Endpoint: POST /api/suspend
- Headers: Content-Type: application/json
- Success response status: HTTP 204
- Request body example:
```bash
{
  "student" : "studentmary@gmail.com"
}
```

4. Retrieve a list of students who can receive a given notification.
A notification consists of:

- the teacher who is sending the notification, and
- the text of the notification itself.

To receive notifications from e.g. 'teacherken@gmail.com', a student:

- MUST NOT be suspended,
- AND MUST fulfill AT LEAST ONE of the following:
i. is registered with “teacherken@gmail.com"
ii. has been @mentioned in the notification

- Endpoint: POST /api/retrievefornotifications
- Headers: Content-Type: application/json
- Success response status: HTTP 200
- Request body example:
```bash
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
}
```
- Success response body 1:
```bash
{
  "recipients":
    [
      "studentbob@gmail.com",
      "studentagnes@gmail.com", 
      "studentmiche@gmail.com"
    ]   
}
```
