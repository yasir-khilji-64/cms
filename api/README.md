# Content Management Studio (API)

Welcome to the **Content Management Studio**, a comprehensive and flexible content management system (CMS) designed to streamline content creation, management, and interaction. This directory contains the backend API for the CMS, developed using NestJS, MongoDB, and TypeScript. The API handles server-side functionalities such as user management, post creation, commenting and more.

- [Content Management Studio (API)](#content-management-studio-api)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Development](#development)
- [API Documentation](#api-documentation)

# Tech Stack

- Framework: **NestJS**
- Database: **MongoDB**
- Language: **TypeScript**
- ORM: **Mongoose**

# Setup

1. Environment Variables.
Create the `.env` file with the provided server env file.
2. Install dependencies
Ensure you're in `api` directory and install the necessary dependencies:
```
cd api
npm install
```

# Development

To start the development server, use the following command
```
npm run start:dev
```
To seed the development data, use the following command
```
npm run seed
```

# API Documentation

The API documentation is automatically generated and available at `/api/docs` once the server is running. It provides detailed information about each endpoint, including request and response formats, authentication requirements and more.
