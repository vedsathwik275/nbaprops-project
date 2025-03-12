# NBA Props Project - Frontend

This is the frontend application for the NBA Props Project, a tool for analyzing NBA player statistics and prop betting lines.

## Setup and Running

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start at http://localhost:5173.

## Backend Integration

This frontend connects to the backend API which should be running at http://localhost:5000. Make sure the backend is running before using the frontend application.

### Setting up the backend:

1. Navigate to the backend directory
2. Install the Python dependencies: `pip install -r requirements.txt`
3. Start the backend server: `python -m src.api`

See the [backend README](../backend/README.md) for more details.

## Features

- Search for NBA players
- Analyze player performance data
- Filter by opponent team and location (home/away)
- View game logs and statistical summaries
- Compare performance against betting lines
- Visualize trends with interactive charts

## Technologies Used

- React
- TypeScript
- Vite
- TanStack Query for data fetching
- shadcn-ui components
- Tailwind CSS for styling
- Chart.js for data visualization

## Project Structure

- `src/components/` - UI components
- `src/hooks/` - Custom React hooks for data fetching and state management
- `src/pages/` - Page components
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and API service

## Project info

**URL**: https://lovable.dev/projects/4b8d7d3e-cc95-455c-bfe7-102fdcd2d4d6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4b8d7d3e-cc95-455c-bfe7-102fdcd2d4d6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4b8d7d3e-cc95-455c-bfe7-102fdcd2d4d6) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
