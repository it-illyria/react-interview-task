# Inventory Management

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#installation)
    - [Clone](#clone)
    - [Setup](#setup)
* [Test](#test)
* [How to Use](#how-to-use)

## Overview

This React application is designed for efficient inventory management across multiple job sites. It provides a seamless
user interface to create, view, and update job sites and their respective inventory details. With interactive components
and dynamic updates, this app simplifies inventory tracking and modification.

## Features

1. **Job Site Management**
    - View a list of all job sites and their statuses on the main page.
    - Add new job sites to the list with the `Create` button.
    - Search all created job sites with the `Search` input

2. **Inventory Dashboard**
    - Navigate to a job site’s inventory by clicking its name.
    - Organized inventory categories for easy viewing and management.
    - Search all categories of specific job sites with the `Search` input

3. **Interactive Editing**
    - `Double-click` a table cell to update an item.
    - `Edit` fields in a pre-filled modal and save changes dynamically.

## Requirements

1. **React.js**: The framework for the app.
2. **Backend API**: Use `json-server` for server-side functionality.

## Installation

### Clone

Frontend:

```bash
$ git clone https://github.com/it-illyria/react-interview-task.git
```

Backend (JSON Server):

- Start the JSON Server with a specific database file:

```bash
  npm server
```

- Access the JSON Server at http://localhost:5000/jobSites.

### Setup

1. **Frontend**
    - Navigate to the frontend directory:
      ```bash
      cd my-inventory-frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm start
      ```
    - Access the app at `http://localhost:3000`.

2. **Backend**
    - Start the JSON Server:
       ```bash
       npm server
       ```
    - Access the app at `http://localhost:5000/JobSites`.

## Test

This project uses **`Jest`** for unit and integration testing to ensure the reliability and correctness of the application.

   - Run all tests in the project using:
      ```bash
      npm test 
      ```
     
   - Run tests in watch mode for active development:
      ```bash
      npm test -- --watch
      ```
   - To check test coverage:
      ```bash
       npm test -- --coverage
      ```
This will generate a `coverage` directory containing an HTML report of the coverage.

## How to Use

1. **Job Site Management**
    - View and manage job sites on the main page.
    - Use the "Create" button to add new job sites.
    - Use the "Search" input to search job sites.

2. **Inventory Management**
    - Click on a job site to access its inventory dashboard.
    - Double-click a cell to open a modal for inline editing.
    - Save changes to see them reflected immediately.
    - Use the "Search" input to search inside inventory of specific job sites.