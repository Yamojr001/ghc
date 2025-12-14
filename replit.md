# Laravel + React (Inertia.js) Application

## Overview
This is a Laravel 12 application with React frontend using Inertia.js for seamless SPA-like navigation without building a separate API.

## Tech Stack
- **Backend**: Laravel 12 (PHP 8.2)
- **Frontend**: React 18 with Inertia.js
- **Styling**: Tailwind CSS
- **Database**: SQLite (development)
- **Build Tool**: Vite

## Project Structure
- `app/` - Laravel application code (Controllers, Models, Middleware)
- `resources/js/` - React components and pages
- `resources/js/Pages/` - Inertia.js pages
- `resources/js/Components/` - Reusable React components
- `routes/web.php` - Web routes
- `database/migrations/` - Database migrations

## Running the Application
The application runs on port 5000 with Laravel's built-in server.

## Key Features
- User authentication (Login/Register)
- Admin and Staff role-based access
- Various CRUD modules (Donations, Programs, Blog Posts, etc.)

## Database
Using SQLite for development. The database file is at `database/database.sqlite`.

## Development Notes
- Assets are pre-built for production in `public/build/`
- Trust proxies configured for Replit environment
- Environment variables set via Replit secrets
