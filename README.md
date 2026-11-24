🔔 FCM Playground — Web Push Setup Guide & Live Tester

Interactive Firebase Cloud Messaging (FCM) testing platform and step-by-step Burmese setup guide built with React, Express, and a Retro-Comic Bento UI.

FCM Playground helps developers learn how Firebase Cloud Messaging (FCM) works on the Web from scratch—covering Firebase project configuration, Service Workers, VAPID keys, and foreground/background message handling—while providing a foundation to send and diagnose live push notifications without constantly switching back to the Firebase Console.

✨ Key Features

🎨 Retro-Comic Bento Design System: Crafted with warm paper-cream surfaces (#F5EFE6), bold ink borders, tactile pill buttons, and zero heavy drop shadows for comfortable long-form reading in Burmese.

🧊 Lightweight 2.5D Isometric Flow Demo: Pure SVG isometric architecture diagram illustrating how push payloads travel from an Express Server (Admin SDK) ➔ Google FCM Hub ➔ Client Browser (Foreground vs. Background).

📖 Step-by-Step Burmese Documentation:

Part 1 (Client-Side Setup): Creating a Firebase project, initializing the Web SDK, configuring public/firebase-messaging-sw.js, generating VAPID keys, handling common Vite MIME-type pitfalls, and sending test messages.

Part 2 (Server-Side Admin SDK): Coming Soon

⚡ Ephemeral Backend Architecture (Security-First): Built with an Express API that initializes temporary, UUID-isolated Firebase Admin app instances per request and immediately destroys them (deleteApp) in a finally block—ensuring serviceAccountKey.json credentials are never persisted to disk or leaked in memory.

🧪 Live Notification Tester UI: Coming Soon

🛠️ Tech Stack

Layer

Technologies

Frontend (client/)

React 19, Vite, Tailwind CSS v4, React Router, Lucide React, Pure SVG Isometric Graphics

Backend (server/)

Node.js, Express, Firebase Admin SDK (firebase-admin), CORS, Dotenv

Deployment

Vercel (Frontend SPA)

📂 Monorepo Structure

fcm-playground/
├── client/                         # React + Vite Frontend
│   ├── public/
│   │   ├── images/                 # Documentation screenshots
│   │   ├── favicon.svg             # Retro-Comic bell favicon
│   │   └── favicon.png             # Safari / Apple Touch fallback icon
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Shared UI components (Navbar)
│   │   │   ├── layout/             # Main application layout
│   │   │   └── features/
│   │   │       ├── landing/        # Home page & Hero Bento section
│   │   │       ├── docs/           # Setup Roadmap, 3D Flow Demo, & Burmese Guide
│   │   │       └── live-test/      # Interactive Live Tester (Coming Soon)
│   │   ├── App.jsx                 # Route definitions
│   │   └── index.css               # Retro-Comic theme tokens & utility classes
│   ├── vercel.json                 # SPA routing rewrite rules for Vercel
│   └── package.json
│
├── server/                         # Node.js + Express Backend API
│   ├── routes/
│   │   └── fcmRoutes.js            # /api/health, /api/send, /api/topic + Burmese error hints
│   ├── utils/
│   │   └── firebaseHelper.js       # Ephemeral withTemporaryFirebaseApp() wrapper
│   ├── .env.example                # Environment variable template
│   ├── index.js                    # Express server entry point
│   └── package.json
│
├── .gitignore                      # Root monorepo ignore rules
└── README.md


🚀 Getting Started (Local Development)

Prerequisites

Node.js (v18+ recommended)

npm or yarn

A Firebase Project from the Firebase Console

1. Clone the Repository

git clone https://github.com/your-username/fcm-playground.git
cd fcm-playground


2. Start the Backend Server (server/)

cd server
npm install
cp .env.example .env
npm run dev


The Express server will start at http://localhost:5000 (check GET /api/health).

3. Start the Frontend Client (client/)

Open a new terminal window:

cd client
npm install
npm run dev


Open http://localhost:5173 in your browser to explore the Home page and Setup Documentation.

🗺️ Roadmap

[x] Retro-Comic Bento UI theme & responsive layout

[x] Interactive 2.5D Isometric SVG message flow diagram

[x] Docs Part 1: Client-Side Web Push Setup Guide (Burmese) with troubleshooting tips

[x] Express API with ephemeral Firebase Admin SDK execution & bilingual diagnostics

[ ] Docs Part 2: Server-Side Node.js & firebase-admin Setup Guide

[ ] Live Tester UI: Browser token generator, Service Account JSON uploader, Dry-Run validator, and Topic manager

🔒 Security Note

Never commit your serviceAccountKey.json or .env files to version control. The root .gitignore is pre-configured to exclude all Firebase Admin private keys (*firebase-adminsdk*.json) and environment files.

📄 License

This project is open-source and available under the MIT License.