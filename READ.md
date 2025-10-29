# MovieStore API Documentation & Testing Guide

## 📋 Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Health Check](#health-check)
  - [Users](#users-api)
  - [Movies](#movies-api)
  - [Cinemas](#cinemas-api)
  - [Showtimes](#showtimes-api)
  - [Reservations](#reservations-api)
  - [Invitations](#invitations-api)

---

## 🚀 Getting Started

### Base URL
```
http://localhost:8080
```

### Prerequisites
- Server running on port 8080
- MongoDB connected
- Valid JWT tokens for authenticated routes

### Testing Tools
- **Postman** (Recommended)
- **cURL**
- **Thunder Client** (VS Code Extension)
- **Insomnia**

---

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the request header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Authentication Levels:
- **Public**: No authentication required
- **Simple Auth** (`auth.simple`): Requires valid user token
- **Enhanced Auth** (`auth.enhance`): Requires admin/superadmin token

---

## 🏥 Health Check

### Check API Status
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-28T10:30:00.000Z",
  "database": "Connected"
}
```

---

## 👤 Users API

### 1. Register New User
```http
POST /users
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "mypassword123",
  "phone": "+919876543210"
}
```

**Response (201):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "guest",
    "createdAt": "2025-10-28T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Notes:**
- Password must be at least 7 characters
- Password cannot contain the word "password"
- Email must be valid
- Phone must be valid mobile number

---

### 2. Login User
```http
POST /users/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "mypassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "guest"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Login with Facebook
```http
POST /users/login/facebook
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@facebook.com",
  "userID": "FB123456789",
  "name": "John Doe"
}
```

---

### 4. Login with Google
```http
POST /users/login/google
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@gmail.com",
  "googleId": "G123456789",
  "name": "John Doe"
}
```

---

### 5. Get Current User Info
```http
GET /users/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "guest",
  "phone": "+919876543210",
  "createdAt": "2025-10-28T10:30:00.000Z"
}
```

---

### 6. Update Current User
```http
PATCH /users/me
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+919876543211",
  "email": "johnupdated@example.com"
}
```

**Allowed Updates:** `name`, `phone`, `username`, `email`, `password`

---

### 7. Logout
```http
POST /users/logout
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response (200):**
```json
{}
```

---

### 8. Logout All Sessions (Admin)
```http
POST /users/logoutAll
Authorization: Bearer ADMIN_TOKEN
```

---

### 9. Get All Users (Superadmin Only)
```http
GET /users
Authorization: Bearer SUPERADMIN_TOKEN
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "guest"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Admin",
    "username": "janeadmin",
    "email": "jane@example.com",
    "role": "admin"
  }
]
```

---

### 10. Get User by ID (Superadmin Only)
```http
GET /users/:id
Authorization: Bearer SUPERADMIN_TOKEN
```

**Example:** `GET /users/507f1f77bcf86cd799439011`

---

### 11. Update User by ID (Superadmin Only)
```http
PATCH /users/:id
Authorization: Bearer SUPERADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "admin"
}
```

**Allowed Updates:** `name`, `phone`, `username`, `email`, `password`, `role`

---

### 12. Delete User by ID (Superadmin Only)
```http
DELETE /users/:id
Authorization: Bearer SUPERADMIN_TOKEN
```

**Response (200):**
```json
{
  "message": "User Deleted"
}
```

---

### 13. Upload User Photo
```http
POST /users/photo/:id
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: (image file)

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "imageurl": "http://localhost:8080/uploads/users/filename.jpg"
  },
  "file": {
    "filename": "filename.jpg",
    "path": "uploads/users/filename.jpg"
  }
}
```

---

## 🎬 Movies API

### 1. Create Movie (Admin)
```http
POST /movies
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "inception",
  "language": "english",
  "genre": "sci-fi",
  "director": "christopher nolan",
  "cast": "leonardo dicaprio, tom hardy",
  "description": "a thief who steals corporate secrets through dream-sharing technology",
  "duration": 148,
  "releaseDate": "2010-07-16",
  "endDate": "2025-12-31"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "inception",
  "language": "english",
  "genre": "sci-fi",
  "director": "christopher nolan",
  "cast": "leonardo dicaprio, tom hardy",
  "description": "a thief who steals corporate secrets through dream-sharing technology",
  "duration": 148,
  "releaseDate": "2010-07-16T00:00:00.000Z",
  "endDate": "2025-12-31T00:00:00.000Z"
}
```

---

### 2. Upload Movie Photo (Admin)
```http
POST /movies/photo/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: (image file)

**Example:** `POST /movies/photo/507f1f77bcf86cd799439011`

---

### 3. Get All Movies
```http
GET /movies
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "inception",
    "language": "english",
    "genre": "sci-fi",
    "director": "christopher nolan",
    "duration": 148,
    "image": "http://localhost:8080/uploads/movies/inception.jpg"
  }
]
```

---

### 4. Get Movie by ID
```http
GET /movies/:id
```

**Example:** `GET /movies/507f1f77bcf86cd799439011`

---

### 5. Update Movie (Admin)
```http
PUT /movies/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "inception updated",
  "duration": 150,
  "description": "updated description"
}
```

**Allowed Updates:** `title`, `image`, `language`, `genre`, `director`, `cast`, `description`, `duration`, `releaseDate`, `endDate`

---

### 6. Delete Movie (Admin)
```http
DELETE /movies/:id
Authorization: Bearer ADMIN_TOKEN
```

**Example:** `DELETE /movies/507f1f77bcf86cd799439011`

---

### 7. Get Movie Suggestions (User Modeling)
```http
GET /movies/usermodeling/:username
```

**Example:** `GET /movies/usermodeling/johndoe`

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "inception",
    "suggestedScore": 0.85
  }
]
```

---

## 🎭 Cinemas API

### 1. Create Cinema (Admin)
```http
POST /cinemas
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "PVR Cinemas",
  "ticketPrice": 250,
  "city": "chennai",
  "seats": [
    {"row": "A", "number": 1, "available": true},
    {"row": "A", "number": 2, "available": true},
    {"row": "A", "number": 3, "available": true}
  ],
  "seatsAvailable": 3
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "PVR Cinemas",
  "ticketPrice": 250,
  "city": "chennai",
  "seats": [...],
  "seatsAvailable": 3
}
```

---

### 2. Upload Cinema Photo
```http
POST /cinemas/photo/:id
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: (image file)

---

### 3. Get All Cinemas
```http
GET /cinemas
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "PVR Cinemas",
    "ticketPrice": 250,
    "city": "chennai",
    "seatsAvailable": 3,
    "image": "http://localhost:8080/uploads/cinemas/pvr.jpg"
  }
]
```

---

### 4. Get Cinema by ID
```http
GET /cinemas/:id
```

**Example:** `GET /cinemas/507f1f77bcf86cd799439011`

---

### 5. Update Cinema (Admin)
```http
PATCH /cinemas/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "PVR Cinemas Updated",
  "ticketPrice": 300,
  "seatsAvailable": 5
}
```

**Allowed Updates:** `name`, `ticketPrice`, `city`, `seats`, `seatsAvailable`

---

### 6. Delete Cinema (Admin)
```http
DELETE /cinemas/:id
Authorization: Bearer ADMIN_TOKEN
```

---

### 7. Get Cinema Suggestions (User Modeling)
```http
GET /cinemas/usermodeling/:username
```

**Example:** `GET /cinemas/usermodeling/johndoe`

---

## 🎟️ Showtimes API

### 1. Create Showtime (Admin)
```http
POST /showtimes
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "startAt": "18:30",
  "startDate": "2025-11-01",
  "endDate": "2025-11-30",
  "movieId": "507f1f77bcf86cd799439011",
  "cinemaId": "507f1f77bcf86cd799439012"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "startAt": "18:30",
  "startDate": "2025-11-01T00:00:00.000Z",
  "endDate": "2025-11-30T00:00:00.000Z",
  "movieId": "507f1f77bcf86cd799439011",
  "cinemaId": "507f1f77bcf86cd799439012"
}
```

---

### 2. Get All Showtimes
```http
GET /showtimes
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "startAt": "18:30",
    "startDate": "2025-11-01T00:00:00.000Z",
    "endDate": "2025-11-30T00:00:00.000Z",
    "movieId": "507f1f77bcf86cd799439011",
    "cinemaId": "507f1f77bcf86cd799439012"
  }
]
```

---

### 3. Get Showtime by ID
```http
GET /showtimes/:id
```

**Example:** `GET /showtimes/507f1f77bcf86cd799439013`

---

### 4. Update Showtime (Admin)
```http
PATCH /showtimes/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "startAt": "19:00",
  "startDate": "2025-11-05"
}
```

**Allowed Updates:** `startAt`, `startDate`, `endDate`, `movieId`, `cinemaId`

---

### 5. Delete Showtime (Admin)
```http
DELETE /showtimes/:id
Authorization: Bearer ADMIN_TOKEN
```

---

## 🎫 Reservations API

### 1. Create Reservation
```http
POST /reservations
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "date": "2025-11-15",
  "startAt": "18:30",
  "seats": [
    {"row": "A", "number": 5},
    {"row": "A", "number": 6}
  ],
  "ticketPrice": 250,
  "total": 500,
  "movieId": "507f1f77bcf86cd799439011",
  "cinemaId": "507f1f77bcf86cd799439012",
  "username": "johndoe",
  "phone": "+919876543210"
}
```

**Response (201):**
```json
{
  "reservation": {
    "_id": "507f1f77bcf86cd799439014",
    "date": "2025-11-15T00:00:00.000Z",
    "startAt": "18:30",
    "seats": [...],
    "ticketPrice": 250,
    "total": 500,
    "movieId": "507f1f77bcf86cd799439011",
    "cinemaId": "507f1f77bcf86cd799439012",
    "username": "johndoe",
    "phone": "+919876543210",
    "checkin": false
  },
  "QRCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

---

### 2. Get All Reservations
```http
GET /reservations
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 3. Get Reservation by ID
```http
GET /reservations/:id
```

**Example:** `GET /reservations/507f1f77bcf86cd799439014`

---

### 4. Check-in Reservation
```http
GET /reservations/checkin/:id
```

**Example:** `GET /reservations/checkin/507f1f77bcf86cd799439014`

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "checkin": true,
  ...
}
```

---

### 5. Update Reservation (Admin)
```http
PATCH /reservations/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "checkin": true,
  "total": 600
}
```

**Allowed Updates:** `date`, `startAt`, `seats`, `ticketPrice`, `total`, `username`, `phone`, `checkin`

---

### 6. Delete Reservation (Admin)
```http
DELETE /reservations/:id
Authorization: Bearer ADMIN_TOKEN
```

---

### 7. Get Suggested Seats (User Modeling)
```http
GET /reservations/usermodeling/:username
```

**Example:** `GET /reservations/usermodeling/johndoe`

**Response (200):**
```json
{
  "suggestedSeats": [
    {"row": "C", "number": 5},
    {"row": "C", "number": 6}
  ]
}
```

---

## 📧 Invitations API

### 1. Send Invitation Emails
```http
POST /invitations
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
[
  {
    "to": "friend1@example.com",
    "host": "John Doe",
    "movie": "Inception",
    "date": "2025-11-15",
    "time": "18:30",
    "cinema": "PVR Cinemas",
    "seat": "A5",
    "image": "http://localhost:8080/uploads/movies/inception.jpg"
  },
  {
    "to": "friend2@example.com",
    "host": "John Doe",
    "movie": "Inception",
    "date": "2025-11-15",
    "time": "18:30",
    "cinema": "PVR Cinemas",
    "seat": "A6",
    "image": "http://localhost:8080/uploads/movies/inception.jpg"
  }
]
```

**Response (201):**
```json
[
  {
    "success": true,
    "msg": "The Invitation to friend1@example.com was sent!"
  },
  {
    "success": true,
    "msg": "The Invitation to friend2@example.com was sent!"
  }
]
```

---

## 🧪 Testing with cURL

### Example: Register User
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "mypassword123",
    "phone": "+919876543210"
  }'
```

### Example: Login User
```bash
curl -X POST http://localhost:8080/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "mypassword123"
  }'
```

### Example: Get Movies (Authenticated)
```bash
curl -X GET http://localhost:8080/movies \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Notes

### Role-Based Access Control
- **guest**: Default role, can view and make reservations
- **admin**: Can create/update/delete movies, cinemas, showtimes
- **superadmin**: Full access, can manage users and roles

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Invalid updates!"
}
```

**401 Unauthorized:**
```json
{
  "error": "Please authenticate"
}
```

**404 Not Found:**
```
Status: 404
```

**500 Internal Server Error:**
```json
{
  "error": {
    "message": "Internal server error"
  }
}
```

---

## 🔧 Environment Variables Required

```env
MONGO_URL=mongodb://localhost:27017/moviestore
JWT_SECRET=your_secret_key_here
PORT=8080
NODE_ENV=development
```

---

## 📞 Support

For issues or questions, please check:
- Server logs at startup
- MongoDB connection status
- JWT token validity
- Request body format and required fields

---

**Happy Testing! 🎉**