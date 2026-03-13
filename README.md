# IDR TECH - Landing Page

Welcome to the **IDR TECH** Landing Page repository. This project is a modern, high-performance web application featuring a stunning UI with smooth animations and a robust backend for managing contact inquiries.

## 🚀 Features

- **Modern & Responsive UI**: Built with React, Vite, and Tailwind CSS for a seamless user experience across all devices.
- **Dynamic Animations**: Handcrafted animations using Framer Motion (`motion`) to create an engaging and visually appealing interface.
- **Backend Admin System**: A dedicated Express.js backend connecting to MongoDB to securely receive and store messages from the website's contact form.
- **Email Notifications**: Integrated with Nodemailer to send automated notifications whenever a new message is received.

## 🛠️ Tech Stack

### Frontend (`/IDR`)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Animations**: Motion (Framer Motion)

### Backend (`/admin`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Email Service**: Nodemailer
- **Environment**: Dotenv for sensitive credentials

## 📂 Project Structure

```text
IDR-Landing-Page/
├── IDR/                  # Frontend React application
│   ├── public/           # Static assets
│   ├── src/              # React components, pages, and styles
│   ├── index.html        # Entry HTML file
│   └── package.json      # Frontend dependencies & scripts
└── admin/                # Backend Express application
    ├── config/           # Configuration files (e.g., mailer)
    ├── server.js         # Entry point for the backend server
    ├── .env              # Backend environment variables
    └── package.json      # Backend dependencies & scripts
```

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)

### Installation & Setup

#### 1. Setup the Backend
Open your terminal and navigate to the backend directory:
```bash
cd admin
npm install
```
Create a `.env` file in the `/admin` directory and configure your environment variables:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
Start the backend server:
```bash
npm run dev
```
*(The server should run on `http://localhost:4000`)*

#### 2. Setup the Frontend
Open a new terminal window and navigate to the frontend directory:
```bash
cd IDR
npm install
```
Start the frontend development server:
```bash
npm run dev
```
*(The React app will typically run on `http://localhost:5173`)*

## 📜 Scripts

### Frontend (`/IDR`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Previews the production build locally.

### Backend (`/admin`)
- `npm start`: Starts the Express server using Node.
- `npm run dev`: Starts the Express server using Nodemon for auto-reloading during development.

## 📄 License
This project is licensed under the ISC License.

---
*Created with ❤️ by IDR TECH.*
