# Content Management Studio (Client)

Welcome to the Content Management Studio, a comprehensive and flexible content management system (CMS)designed to streamline content creation, management, and interaction. This directory contains the frontend of the CMS, developed using Next.js. The frontend handles client-side functionalities such as displaying posts, user interaction, commenting, and more.

- [Content Management Studio (Client)](#content-management-studio-client)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Development](#development)
- [API Integration](#api-integration)

# Tech Stack

- Framework: **Next.js**
- Language: **TypeScript**
- State Management: **Redux Toolkit**
- Http Client: **React Query**
- Styling: **Tailwind CSS**

# Setup

1. Environment Variables
  Create the `.env.local` file with the provided client env file.
2. Install Dependencies
  Ensure you're in `client` directory and install the necessary dependencies:
  ```
  cd client
  npm install
  ```

# Development

To start the development build, use the following command:
```
npm run dev
```
This will start the development build and you can access the app on [http://localhost:3000](http://localhost:3000)

# API Integration

The frontend communicates with the backend API for the data. Ensure API server is running and accessible. The frontend use **React Query** for making HTTP requests and Redux Toolkit for the state management.

For detailed information about the API endpoints, refer to the [Swagger UI Docs](http://localhost:3030/api/docs) in the backend server.
