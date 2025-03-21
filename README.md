# Elis Project

This project is a full-stack application consisting of a **Dart/Flutter frontend** and a **Node.js backend**. The application allows users to interact with services through a mobile app built with Dart/Flutter, while the backend handles business logic, data storage, and API communication.

## Project Structure

elis-project/ │ ├── app/ # Flutter/Dart frontend └── server/ # Node.js backend


## Backend (Node.js)

The backend is built using **Node.js** and connected to **MongoDB** for data storage.

### Prerequisites

Before setting up the backend, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for cloud hosting)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RubenCipriano/elis-project.git
   cd elis-project/web-app
   ```
   
2. **Install dependencies**

   
   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   MONGO_URI=mongodb://localhost:27017/elis-database
   JWT_SECRET=<JWTSecret>
   PORT=[port]
   ```

4. **Start the server**

   ```bash
   npm start build && npm start serve:ssr:web-app
   ```

5. **Server Starting**

The management website is going to be opened at the default port 4000 but it can be changed to any port you would like just changing the port on the .env file, the app itself is using dynamic urls so the domain u using in the backend will be the domain of the calls itself, you can change it going on services...

## Frontend (Dart / Flutter)

The frontend of the application is a mobile app built with Flutter. It communicates with the backend to display data and allow users to interact with the services.

### Prerequisites

Before setting up the frontend, make sure you have the following installed:

- [FlutterSDK](https://docs.flutter.dev/get-started/install)
- [AndroidStudio](https://developer.android.com/studio?hl=pt-br)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RubenCipriano/elis-project.git
   cd elis-project/server
   ```
   
2. **Install dependencies**

   
   ```bash
   flutter pub get
   ```

3. **Start the server**

   ```bash
   flutter run
   ```
