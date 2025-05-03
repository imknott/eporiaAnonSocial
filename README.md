# 📘 Eporia Anon Social

> A modern, secure, and anonymous text-first social media platform focused on privacy, expression, and minimalism — built with Node.js, Express, PostgreSQL, and EJS.

## 🚀 Project Overview

**Eporia** is a lightweight social platform inspired by forums like Reddit, but with a greater emphasis on anonymity, minimalism, and clean user experience. Users can sign up anonymously, post text-based content, interact in real time, and customize their profile with avatars and theme preferences. The platform integrates 2FA (two-factor authentication) for secure updates and login, making user security and privacy central to its mission.

## ✨ Features

-  Anonymous Signup with optional custom usernames
-  Two-Factor Authentication (2FA) via QR Code and Authenticator Apps
-  Text-First Feed similar to Reddit or early Twitter
-  User Profiles with editable usernames and avatar selection
-  Light/Dark Mode Toggle stored in localStorage
-  Modern Avatar Picker with visual feedback
-  Secure Profile Editing via Authenticator modal
-  Post Likes & Comments, dynamically updated
-  Built with:
  - Node.js, Express, EJS
  - PostgreSQL (via pg)
  - Bootstrap 5 for responsive UI
  - Speakeasy + qrcode for 2FA
  - Twilio (for future messaging/SMS capabilities)

## Screenshots


| Page        | Preview |
|-------------|---------|
| **Login**   | ![Login](/screenshots/login.png) |
| **Signup**  | ![Signup](/screenshots/signup.png) |
| **Edit Profile** | ![Edit Profile](/screenshots/editProfile.png) |
| **Feed**    | ![Feed](/screenshots/feed.png) |

##  Installation & Setup

### Requirements
- Node.js (v16+)
- PostgreSQL
- QR Scanner App (e.g. Google Authenticator)

### Steps

1. **Clone the repo:**

   ```bash
   git clone https://github.com/imknott/eporiaAnonSocial.git
   cd eporiaAnonSocial
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**

   Create a `.env` file in the root with:

   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/eporia
   SESSION_SECRET=your_session_secret
   ```

4. **Set up the PostgreSQL database:**

   - Create the database:
     ```bash
     createdb eporia
     ```
   - Run schema (SQL) manually or through a migration tool of your choice.

5. **Start the app:**

   ```bash
   npm start
   ```

   Then open [http://localhost:3000](http://localhost:3000)

## Key Routes

| Route               | Description                         |
|---------------------|-------------------------------------|
| `/login`            | QR code-based login form            |
| `/signup`           | Anonymous username + QR onboarding  |
| `/feed`             | View the feed of public posts       |
| `/post`             | Create a new post                   |
| `/auth/profile/edit`| Edit username and avatar            |

## Tech Stack

- **Frontend**: Bootstrap 5, EJS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **2FA**: Speakeasy + QRCode
- **Email/SMS (optional)**: Nodemailer, Twilio

## Security Notes

- Passwordless login using Authenticator App (TOTP-based)
- Sessions via `express-session` (secure with proper `SESSION_SECRET`)
- Modal confirmation before profile edits for extra 2FA security

## Future Improvements

- Profile themes stored in DB (`Preferences` table)
- Realtime updates using WebSockets
- Feed filtering by channels or tags
- Notifications via SMS or email
- Admin moderation tools

## Author

**Imknott** – Creator of Eporia  
[GitHub Profile](https://github.com/imknott)
