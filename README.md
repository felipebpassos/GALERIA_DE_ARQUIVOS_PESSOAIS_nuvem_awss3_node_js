# S3Gallery 📸🎥

**S3Gallery** is a secure and scalable media storage solution that allows users to sign up, log in, and upload their photos and videos. This media is then stored safely in an AWS S3 bucket, accessible only to the registered user through pre-signed URLs that ensure secure and temporary access.

##
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [License](#-license)
- [Contact](#-contact)

## Features
- **User Authentication**: Secure sign-up and login system using JWT.
- **Media Upload**: Upload photos and videos to your personal gallery.
- **AWS S3 Storage**: Safely store media files in an AWS S3 bucket.
- **Secure Access**: Media files are accessed through pre-signed URLs, ensuring that only authorized users can access their own media.
- **Responsive Design**: Frontend pages are responsive and accessible on various devices.

## Technologies Used
- **Backend**: Node.js, Express, API Rest, JWT
- **Frontend**: HTML, CSS, JavaScript
- **Database**: AWS S3 for media storage, SQL database for user and archive metadata
- **Others**: AWS SDK, Multer, bcrypt

## Installation
To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/felipebpassos/S3Gallery.git

2. **Navigate to the project directory:**
   ```bash
   cd S3Gallery

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install

4. **Set up environment variables:**
   Create a .env file in the backend directory and add your AWS S3 credentials and JWT secret.
   Example .env file:
   ```bash
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-region
   S3_BUCKET_NAME=your-bucket-name
   JWT_SECRET=your-jwt-secret

5. **Run the backend server:**
   ```bash
   node app.js

The backend will run on http://localhost:3000.

6. **Serve the frontend:**
   Open the HTML files (login.html, signup.html, home.html) in your browser to test the frontend.

## Usage

1. **Sign Up:**
   - Open the `signup.html` file in your browser.
   - Fill in your details and sign up to create a new account.

2. **Log In:**
   - Open the `login.html` file in your browser.
   - Use your credentials to log in.

3. **Upload Media:**
   - After logging in, you’ll be redirected to the `home.html` page.
   - Click on the upload button to select photos or videos from your device.
   - Uploaded media will be securely stored in your AWS S3 bucket.

4. **View Media:**
   - Your uploaded media will be displayed on the homepage.
   - Media files are accessed via secure pre-signed URLs.

## API Endpoints

- **POST /signup**: Register a new user.
  - Request: `{ "username": "yourusername", "password": "yourpassword" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /login**: Authenticate an existing user.
  - Request: `{ "username": "yourusername", "password": "yourpassword" }`
  - Response: `{ "token": "your-jwt-token" }`

- **POST /upload**: Upload a media file.
  - Headers: `Authorization: Bearer your-jwt-token`
  - Request: FormData with the file.
  - Response: `{ "message": "File uploaded successfully", "fileUrl": "url-to-access-file" }`

- **GET /media**: Retrieve all uploaded media URLs for the logged-in user.
  - Headers: `Authorization: Bearer your-jwt-token`
  - Response: `{ "media": ["url1", "url2", ...] }`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: yourname@example.com
- **LinkedIn**: [Your LinkedIn](https://www.linkedin.com/in/yourprofile/)
- **GitHub**: [Your GitHub](https://github.com/yourusername)



