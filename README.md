# S3Gallery 📸🎥

**S3Gallery** is a secure and scalable media storage solution that allows users to sign up, log in, and upload their photos and videos. This media is then stored safely in an AWS S3 bucket, accessible only to the registered user through pre-signed URLs that ensure secure and temporary access.

## 📜 Table of Contents
- [Features](#-features)
- [Demo](#-demo)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features
- **User Authentication**: Secure sign-up and login system using JWT.
- **Media Upload**: Upload photos and videos to your personal gallery.
- **AWS S3 Storage**: Safely store media files in an AWS S3 bucket.
- **Secure Access**: Media files are accessed through pre-signed URLs, ensuring that only authorized users can access their own media.
- **Responsive Design**: Frontend pages are responsive and accessible on various devices.

## 🚀 Demo
[![S3Gallery Demo](link-to-demo-image)](link-to-live-demo)

## 🛠️ Technologies Used
- **Backend**: Node.js, Express, JWT
- **Frontend**: HTML, CSS, JavaScript
- **Database**: AWS S3 for media storage
- **Others**: AWS SDK, Multer, bcrypt

## 📦 Installation
To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/S3Gallery.git

2. **Navigate to the project directory:**
   ```bash
   cd S3Gallery

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install

4. **Set up environment variables:**
   - Create a .env file in the backend directory and add your AWS S3 credentials and JWT secret.
   - Example .env file:
   ```bash
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-region
   S3_BUCKET_NAME=your-bucket-name
   JWT_SECRET=your-jwt-secret

5. **Run the backend server:**
   ```bash
   node app.js

   - The backend will run on http://localhost:3000.

6. **Serve the frontend:**
   - Open the HTML files (login.html, signup.html, home.html) in your browser to test the frontend.

