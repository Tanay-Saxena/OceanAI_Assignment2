
---

# Name : Tanay Saxena (22BDS0049) - VIT Vellore
# Email Agent – OceanAI Assignment 2

This repository contains an AI-powered email assistant capable of categorizing emails, extracting actionable tasks, generating draft replies, and answering free-form questions about any selected email.
The system is built using a **React (Vite) frontend** and a **Node.js Express backend** integrated with **Gemini 2.0 Flash**.

---

## Overview

The project simulates an intelligent email client that enhances productivity by applying LLM-powered analysis to emails.
It includes a mock inbox, multiple AI-driven operations, and a responsive UI for interacting with the results.

---

## Features

### Email Intelligence

* Categorizes emails into predefined categories
* Extracts actionable items from the email content
* Generates context-aware, professional draft replies
* Allows free-form queries using an AI agent about the selected email

### User Interface

* Inbox list with selectable emails
* Email viewer panel
* AI actions panel
* Chat agent with conversational capabilities
* Built with a responsive and minimal UI using Tailwind CSS

### Backend Capabilities

* Serves mock inbox data
* Processes structured prompts for Gemini API
* Returns strict JSON or text responses depending on operation
* Includes prompt templates and mock datasets

---

## Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Google Gemini API (v1beta)

---

## Folder Structure

```
email-agent/
│
├── data/
│   ├── drafts.json
│   ├── mockInbox.json
│   └── prompts.json
│
├── frontend/
│   ├── public/
│   │   ├── vite.svg
│   │   └── react.svg
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── emailApi.js
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── ActionsPanel.jsx
│   │   │   ├── ChatAgent.jsx
│   │   │   ├── EmailViewer.jsx
│   │   │   └── InboxList.jsx
│   │   ├── pages/
│   │   │   └── InboxPage.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   └── vite.config.js
│
├── server/
│   ├── .env
│   ├── agentRoute.js
│   ├── draftService.js
│   ├── geminiClient.js
│   ├── inboxService.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── promptService.js
│
└── README.md
```

---

## Setup Instructions

### 1. Install Dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd ../frontend
npm install
```

---

## Environment Variables

Create `server/.env` with:

```
GEMINI_API_KEY=your_api_key_here
```

Ensure `.env` files are ignored by Git:

```
server/.env
frontend/.env
```

---

## Running the Application

### Start the Backend Server

```
cd server
npm start
```

Runs on: `http://localhost:8080`

### Start the Frontend Application

```
cd frontend
npm run dev
```

Default URL: `http://localhost:5173`

---

## API Endpoints

### Retrieve Inbox

```
GET /api/emails
```

### Categorize Email

```
POST /api/emails/:id/categorize
```

### Extract Action Items

```
POST /api/emails/:id/actions
```

### Generate Draft Reply

```
POST /api/emails/:id/draft
```

### Email Agent Query

```
POST /api/agent/query
Body: { emailId, message }
```

---

## System Architecture

### Backend Logic

The backend loads email data, constructs structured prompts (JSON-strict or text-based), and communicates with the Gemini API using helper functions:

* `generateJSON(prompt)`
* `generateText(prompt)`

Services such as `draftService`, `promptService`, and `inboxService` manage functional modularity.

### Frontend Logic

The frontend interacts with backend routes via `emailApi.js`.
UI components render:

* Email list
* Email viewer
* Action results
* AI chat responses

State is managed at the page and component level for clean separation.

---

## Usage Flow

1. Select an email from the inbox.
2. Perform actions such as:

   * Categorize email
   * Extract tasks
   * Generate a reply
3. Use the chat agent for:

   * Summaries
   * Follow-up questions
   * Professional rewriting
   * Clarifications

---

## Contribution Guidelines

* Follow consistent code style and formatting
* Write meaningful commit messages
* Maintain the existing folder structure
* Avoid pushing environment files

---

## License

This project is intended for academic and demonstration use under OceanAI Assignment 2.

---

