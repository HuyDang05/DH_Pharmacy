# Pharmacy System

A comprehensive e-commerce for pharmacy and management system built with Node.js, Express, MongoDB, and Socket.IO. This application provides both client-facing features and admin management capabilities.

## Features

For a comprehensive list of all features, see [FEATURES.md](./FEATURES.md)

### Key Features Overview

**Client Features:**
- User Authentication & Registration
- Product Browsing & Search
- Cart System
- Order Management
- Real-time Chat System
- Mobile Responsive Design

**Admin Features:**
- Dashboard & Analytics
- Product Management
- User Management
- System Settings
- Order Processing
- Security & Compliance

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: Pug
- **Real-time Communication**: Socket.IO
- **File Upload**: Multer, Cloudinary
- **Email Service**: Nodemailer
- **Rich Text Editor**: TinyMCE
- **Styling**: Bootstrap, CSS
- **Deployment**: Docker, Vercel

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProductManagement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Client: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`

## Database Design

For detailed database schema and relationships, see [DATABASE_DESIGN.md](./DATABASE_DESIGN.md)

## Project Structure

```
ProductManagement/
├── config/          # Configuration files
├── controllers/     # Business logic
├── helpers/         # Utility functions
├── middlewares/     # Express middlewares
├── models/          # Database models
├── public/          # Static assets
├── routes/          # Route definitions
│   ├── admin/       # Admin routes
│   └── client/      # Client routes
├── sockets/         # Socket.IO handlers
├── validates/       # Validation logic
├── views/           # Pug templates
├── index.js         # Application entry point
└── package.json     # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm start` - Start the development server with nodemon
- `npm test` - Run tests (currently not configured)

## Docker Support

The application includes Docker support for containerized deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## API Documentation

The application provides RESTful APIs for:
- Product management
- User authentication
- Order processing
- Real-time chat functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Huy Dang** - Full Stack Developer

---

<div align="center">
    <img src="https://skillicons.dev/icons?i=bootstrap,html,css,vscode,github,postman,git,vercel,socketio" />
    <img src="https://skillicons.dev/icons?i=nodejs,javascript,express,mongodb,pug,docker" /><br>
</div>
