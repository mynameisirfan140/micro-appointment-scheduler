# Micro-Appointment Scheduler

A lightweight web app that lets freelancers and small service providers create 15‑minute appointment slots, generate a unique shareable link, sync appointments with Google Calendar in real time, and send confirmation and reminder emails.

## Features
- Create 15‑minute appointment slots with client name and provider.
- Generate a unique, shareable link for each slot.
- Real‑time sync with Google Calendar via OAuth.
- Automatic confirmation and reminder emails via SMTP.
- Live calendar view with filter and search.
- Responsive UI with smooth transitions, hover/focus states, and inline feedback.
- Form validation with clear error messages and loading states.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/micro-appointment-scheduler.git
   cd micro-appointment-scheduler
   ```

2. **Copy the environment template**
   ```bash
   cp .env.example .env
   ```

3. **Fill in your .env variables** (see `.env.example` for details).

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

6. **Seed the database (optional, for sample data)**
   ```bash
   npm run seed
   ```

## Usage

- Visit the homepage (`/`) to see the hero section, product tagline, and a **Get Started** button.
- Click **Get Started** to open the scheduling workspace where you can view available slots, filter/search, and create new 15‑minute appointments.
- After creating a slot, a shareable link is displayed; you can copy or send it to clients.
- The app automatically syncs appointments with Google Calendar and sends confirmation/reminder emails.

## Development

- **Backend**: `npm run dev` (starts both the Next.js frontend and the Express API).
- **Testing**: `npm test` runs Jest and React Testing Library tests.
- **Database migrations**: Use Prisma CLI (`npx prisma migrate dev`) as needed.

## Environment Variables

All required variables are listed in `.env.example`. Do not commit your actual `.env` file.

---

*Built with Next.js, React, Express, PostgreSQL, and Prisma.*

## Built by

**Irfan N** — [@mynameisirfan93](https://www.instagram.com/mynameisirfan93/)

From **Tekzbyte**

## License

© Irfan N — Tekzbyte. All rights reserved.

You may run and use this project for your own purposes, free of charge.

You may **not** copy, redistribute, modify, rebrand, or resell this code — in whole
or in part, with or without changes — without written permission from the author.

Found a problem or have an idea? Open an issue or message
[@mynameisirfan93](https://www.instagram.com/mynameisirfan93/).
