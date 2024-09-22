# Project Name

## 1. Introduction

### Project Overview
This project is a web application built with JavaScript and Node.js. It allows users to manage their profiles and articles. Users can create, read, update, and delete articles, as well as update their profile information.

### Purpose and Goals
The goal of this project is to provide a platform for users to share and manage their articles while maintaining their profiles.

### Target Audience
This application is intended for bloggers, writers, and anyone interested in sharing their articles online.

## 2. Getting Started

### Prerequisites
- Node.js
- npm

### Installation Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/ShadowDev-team/Blogging-Platform.git
    ```
2. Navigate to the project directory:
   ```sh
   cd Blogging-Platform
   ```
3. Install the dependencies:
   ```sh
    npm install
    ```
## Quick Start Guide
1. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
    APP_HOST=localhost
    DB_USERNAME=your-username
    DB_PASSWORD=your-password
    DB_NAME=your-database
    DB_HOST=your-database-host
    MAIL_HOST=
    MAIL_PORT=
    MAIL_USER=
    MAIL_PASS=
    ```
2. Run migrations:
   ```sh
    npx sequelize-cli db:migrate
    ```
3. Start the server:
    ```sh
     npm start
     ```
4. Open your browser and navigate to `http://localhost:3000`.

## 3. Project Structure

### Overview
The project structure is as follows:
```
Blogging-Platform/
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── public/
├── routes/
│   ├── web.js
│   ├── api.js
├── services/
├── views/
│   ├── pages/
│   ├── layout.ejs
│   └── partials/
├── .env
├── app.js
├── README.md
└── server.js
```

### Description

- `config/`: Contains the configuration files for the database.
- `controllers/`: Contains the controller files for handling the application logic.
- `migrations/`: Contains the migration files for creating the database tables.
- `models/`: Contains the model files for defining the database schema.
- `public/`: Contains the static files such as CSS, images, and JavaScript.
- `routes/`: Contains the route files for defining the application routes.
- `views/`: Contains the view files for rendering the HTML pages.
- `.env`: Contains the environment variables for the application.
- `app.js`: Contains the main application file.


## 4. Features

- User Authentication
   - Login
   - Logout
   - Session management
   - Password hashing
   - Registration
   - Reset password
- User Profile Management
   - Update username, email, bio, and profile picture
   - Hash password before saving
- Article Management
   - Create new articles
   - View all articles
   - View articles by ID
   - View articles by user
   - Edit articles
   - Delete articles
 - Comment Management
   - Create new comments
   - View all comments
   - View comments by article

## 5. Packages Used

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `sequelize`: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server
- `bcryptjs`: Library to help you hash passwords
- `body-parser`: Node.js body parsing middleware
- `multer`: Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files
- `dotenv`: Loads environment variables from a `.env` file into `process.env`
- `ejs`: Embedded JavaScript templating
- `express-ejs-layouts`: Layout support for ejs in express
- `express-session`: Simple session middleware for Express
- `joi`: Object schema description language and validator for JavaScript objects
- `nodemailer`: Send e-mails from Node.js
- `sequelize-cli`: The Sequelize Command Line Interface (CLI)
- `tinymce`: A rich text editor for modern web applications

