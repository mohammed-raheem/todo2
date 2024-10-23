# Todo Application

## Overview

This is a modern, feature-rich Todo application built with React, TypeScript, and Material-UI. It provides a user-friendly interface for managing tasks, with support for internationalization and state management.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete or incomplete
- Filter tasks by status (all, active, completed)
- Responsive design for desktop and mobile devices
- Dark mode support
- Internationalization (i18n) support
- Confirmation dialogs for important actions

## Technology Stack

- React 18
- TypeScript
- Material-UI (MUI) 6
- Redux Toolkit for state management
- React Router for navigation
- i18next for internationalization
- Vite as the build tool and development server

## Project Structure

The project follows a standard React application structure:

- `src/`: Contains the main source code
  - `components/`: React components
  - `redux/`: Redux store, slices, and actions
  - `types/`: TypeScript type definitions
  - `i18n/`: Internationalization configuration and translations
  - `styles/`: Global styles and theme configuration

## Key Components

### ConfirmPopup

The ConfirmPopup component is used for displaying confirmation dialogs before performing important actions. It uses Material-UI's Dialog component and supports internationalization.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the production-ready application
- `npm run lint`: Runs ESLint to check for code quality issues
- `npm run preview`: Previews the built application locally

## Internationalization

The application supports multiple languages. Translations are managed using i18next. To add a new language or modify existing translations, update the files in the `src/i18n/` directory.

## State Management

Redux Toolkit is used for state management. The store configuration and slices can be found in the `src/redux/` directory.

## Styling

The application uses Material-UI (MUI) for styling and theming. Custom styles are applied using the `sx` prop and theme-aware styling functions.
