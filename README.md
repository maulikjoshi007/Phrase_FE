## Getting Started

To run this project locally, follow these steps:

### Clone the repository:
bash
git clone https://github.com/maulikjoshi007/Phrase_FE.git
cd Phrase_FE 
### Install dependencies:
bash
npm install 
### Set up environment variables:

Create a `.env.local` file in the root of your project and add the following environment variables:

plaintext

Copy code

`NEXT_PUBLIC_API_BASE_URL=<your-api-base-url>` 

Replace `<your-api-base-url>` with the actual base URL of your API.

### Run the development server:
bash
npm run dev 
Open [http://localhost:3000/](http://localhost:3000/) in your browser to see the app.

## Environment Variables

Variable

Description

`NEXT_PUBLIC_API_BASE_URL`

Base URL for the API

Add these variables in a `.env` file at the root of the project to configure the API URL.

## Scripts

-   **`npm run dev`** - Run the application in development mode.
-   **`npm run build`** - Build the application for production.
-   **`npm run start`** - Start the application in production mode.
