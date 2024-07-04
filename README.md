# [NextAppoint](https://next-appoint.vercel.app/my-booking) <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/43692bef-e1ba-4254-bf98-6e330d8466b6" alt="Logo" style="width: 300px; height: 300px;">


NextAppoint is a web application that helps users book appointments with the doctor of their choice. It allows users to book and view their upcoming and expired appointments, and enables them to cancel an appointment if needed, acknowledging a successful appointment booking with an email.

## Features

- Book appointments with doctors of your choice
- Receive confirmatory emails for appointments
- View upcoming and expired appointments
- Cancel appointments

## Tech Used

- ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Strapi](https://img.shields.io/badge/strapi-%232E7EEA.svg?style=for-the-badge&logo=strapi&logoColor=white)
- ![Shadcn UI](https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white)

## Sneakpeeks

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/575e6838-3887-4b9c-9e8a-8ed344ca1ef2" alt="Screenshot 2" style="width: 40%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;">
  <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/16381281-e91a-41cc-b5d5-91f46208561c" alt="Screenshot 5" style="width: 40%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;">
  <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/0227a268-2582-44e4-b6e7-29ac1f112c06" alt="Screenshot 3" style="width: 40%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;">
  <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/ae25a9d6-7fed-42f3-9631-18548c20c334" alt="Screenshot 4" style="width: 40%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;">
  <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/36cc375a-4e8d-4d85-8c61-e92a632fe61b" alt="Screenshot 5" style="width: 40%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;">
  <img src="https://github.com/Shrey-Raj/nextAppoint/assets/119098647/78c7c073-dc84-4d2c-a11d-f65c23e57f00" alt="Screenshot 1" style="width: 40%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;">

</div>

## Video Demonstration

[![Video Demo](path/to/video_thumbnail.png)](path/to/video.mp4)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Strapi (connect a database, set up Environment variables)

### Setting up Strapi with PostgreSQL on Render

To set up your Strapi project and connect it to a PostgreSQL database on Render, follow these steps:

1. **Install Strapi:**

    ```bash
    npx create-strapi-app my-project --quickstart
    ```

2. **Configure PostgreSQL:**
   
   Update your `config/database.js` file to use PostgreSQL:

    ```javascript
    module.exports = ({ env }) => ({
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: env('DATABASE_HOST', 'your-postgres-host'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'your-database-name'),
            username: env('DATABASE_USERNAME', 'your-database-username'),
            password: env('DATABASE_PASSWORD', 'your-database-password'),
            ssl: env.bool('DATABASE_SSL', false),
          },
          options: {},
        },
      },
    });
    ```

3. **Deploy on Render:**

    - Sign up on Render and create a new PostgreSQL database.
    - Note down the database connection details.
    - Create a new Web Service on Render and link it to your Strapi project repository.
    - Set the environment variables for your PostgreSQL database in the Render dashboard.

4. **Start Strapi:**

    ```bash
    npm run develop
    ```

5. **Access Strapi Admin:**
   
    Navigate to `http://localhost:1337/admin` to access the Strapi admin panel.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Shrey-Raj/nextAppoint.git

2. Navigate to the project directory:

   ```bash
   cd nextAppoint
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be accessible at [http://localhost:3000/](http://localhost:3000/).

## Live Demo

Explore the live version of the Cryptosphere React App  [here](https://next-appoint.vercel.app/my-booking).

## Acknowledgments

Special thanks to the creators and maintainers of the libraries and APIs used in this project.

Happy coding! 🚀 