# NimitAI Intern Assignment

## Overview

This application analyzes sales meeting transcripts and identifies key signals such as:

* Buying Interest
* Objections
* Confusion

For each detected signal, the application generates a coaching tip to help sales representatives improve follow-up conversations.

---

## Tech Stack

### Frontend

* React
* Vite
* Axios

### Backend

* Node.js
* Express.js

### LLM Used

* Gemini 2.5 Flash (Google Generative AI)

---

## Features

* Paste a meeting transcript
* AI-powered signal detection
* Coaching tip generation
* JSON API response
* Clean card-based user interface

---

## Project Structure

```text
digital_patron
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=YOUR_API_KEY
```

Start the backend:

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoint

### POST /analyse

Request:

```json
{
  "transcript": "meeting transcript"
}
```

Response:

```json
{
  "signals": [
    {
      "type": "buying_interest",
      "quote": "Send me a pricing deck",
      "tip": "Ask for timeline and next steps"
    }
  ]
}
```

---

## Example Transcript

```text
Rep: Pricing is $499/seat/month.
Prospect: That seems steep. We pay under $200 currently.
Rep: If your team closes one extra deal per quarter, it pays for itself 10x.
Prospect: Send me a pricing deck and I'll get back to you.
```

---

## Author

Shanmukh Madicherla



