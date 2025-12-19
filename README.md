<p align="center">
  <img src="client/public/logo.svg" alt="yHealth Logo" width="120" height="120" />
</p>

<h1 align="center">yHealth</h1>

<p align="center">
  <strong>Your AI-Powered Personal Health Companion</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#api-documentation">API Docs</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express-5.x-green?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
</p>

---

## Overview

**yHealth** is a comprehensive health and wellness platform that combines AI-powered insights with personalized health tracking. Built with modern technologies, it offers a seamless experience for users to monitor their health journey, set goals, and receive intelligent recommendations.

<p align="center">
  <img src="docs/screenshots/dashboard-preview.png" alt="Dashboard Preview" width="800" />
</p>

---

## Features

### Authentication & Security
- **Multi-Provider Auth** - Email/password and Google OAuth via NextAuth.js
- **Secure Token Management** - JWT-based sessions with cookie persistence
- **OTP Verification** - Email-based registration verification
- **Password Recovery** - Complete forgot/reset password flow

### Profile Management
- **Rich User Profiles** - Comprehensive profile with health data
- **Avatar Upload** - Image upload with Cloudflare R2 storage
- **Phone Verification** - International phone number support with country codes

### Health Tracking
- **Personalized Assessments** - AI-driven health questionnaires
- **Goal Setting** - Custom health and fitness goals
- **Activity Logging** - Track daily activities and habits
- **Progress Insights** - Visual analytics and progress tracking

### Plan Generation
- **AI-Powered Plans** - Personalized health and fitness plans
- **Adaptive Recommendations** - Plans that evolve with your progress
- **Integration Ready** - Connect with fitness devices and apps

---

## Tech Stack

### Frontend (Client)

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Beautiful UI components |
| **Framer Motion** | Smooth animations |
| **NextAuth.js v5** | Authentication |
| **React Hook Form** | Form management |
| **Zod** | Schema validation |

### Backend (Server)

| Technology | Purpose |
|------------|---------|
| **Express 5** | Web framework |
| **TypeScript** | Type-safe development |
| **PostgreSQL** | Primary database |
| **JWT** | Token authentication |
| **Zod** | Request validation |
| **Nodemailer** | Email service |
| **Cloudflare R2** | File storage |
| **EJS** | Email templates |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamza-xyric/yhealth-app.git
   cd yhealth-app
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   **Server** (`server/.env`):
   ```env
   NODE_ENV=development
   PORT=9090

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/yhealth

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   # Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # Cloudflare R2 (for file uploads)
   R2_ACCOUNT_ID=your-account-id
   R2_ACCESS_KEY_ID=your-access-key
   R2_SECRET_ACCESS_KEY=your-secret-key
   R2_BUCKET_NAME=yhealth-uploads
   R2_PUBLIC_URL=https://your-r2-public-url
   ```

   **Client** (`client/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:9090/api

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-min-32-chars

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Initialize the database**
   ```bash
   cd server
   npm run db:migrate
   npm run db:seed  # Optional: seed sample data
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm run dev

   # Terminal 2 - Start client
   cd client
   npm run dev
   ```

6. **Open your browser**
   - Client: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:9090/api](http://localhost:9090/api)

---

## Project Structure

```
yhealth/
├── client/                    # Next.js frontend
│   ├── app/                   # App Router pages
│   │   ├── (pages)/          # Protected pages
│   │   ├── api/auth/         # NextAuth API routes
│   │   ├── auth/             # Authentication pages
│   │   └── context/          # React contexts
│   ├── components/           # Reusable components
│   │   ├── common/           # Shared components
│   │   ├── landing/          # Landing page sections
│   │   ├── layout/           # Layout components
│   │   ├── providers/        # Context providers
│   │   └── ui/               # shadcn/ui components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities & configurations
│   └── types/                # TypeScript declarations
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── database/         # Database setup & migrations
│   │   ├── helper/           # Utility functions
│   │   ├── mails/            # Email templates
│   │   ├── middlewares/      # Express middlewares
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── validators/       # Request validators
│   └── docs/                 # API documentation
│       ├── postman/          # Postman collection
│       └── wiki/             # Project wiki
│
└── salman-agents-skills/     # AI agent configurations
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/verify-registration` | Verify OTP code |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/social` | Social OAuth login |
| `POST` | `/api/auth/forgot-password` | Request password reset |
| `POST` | `/api/auth/reset-password` | Reset password |
| `GET` | `/api/auth/me` | Get current user |
| `PATCH` | `/api/auth/profile` | Update profile |
| `POST` | `/api/auth/logout` | Logout user |

### Upload Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload/avatar` | Upload avatar image |

### Health Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | API health check |
| `GET` | `/api/health/db` | Database health check |

For complete API documentation, see:
- [API Reference](server/docs/wiki/API-REFERENCE.md)
- [Postman Collection](server/docs/postman/)

---

## Scripts

### Server

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks
npm run lint         # Run ESLint
npm run test         # Run tests
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database
```

### Client

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

---

## Environment Variables

### Required Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret (32+ chars) | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret (32+ chars) | Yes |
| `SMTP_*` | Email service credentials | Yes |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `9090` |
| `NODE_ENV` | Environment | `development` |
| `R2_*` | Cloudflare R2 for file uploads | - |
| `GOOGLE_*` | Google OAuth credentials | - |

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](server/docs/wiki/ARCHITECTURE.md) | System architecture overview |
| [API Reference](server/docs/wiki/API-REFERENCE.md) | Complete API documentation |
| [Epic 01 - Onboarding](server/docs/wiki/EPIC-01-ONBOARDING.md) | Onboarding feature details |
| [Roadmap](server/docs/wiki/ROADMAP.md) | Project roadmap |
| [Status](server/docs/wiki/STATUS.md) | Current project status |
| [Changelog](server/docs/wiki/CHANGELOG-2025-12-19.md) | Latest changes |

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [NextAuth.js](https://authjs.dev/) - Authentication
- [Express](https://expressjs.com/) - Backend framework

---

<p align="center">
  Made with ❤️ by the <strong>Xyric</strong> Team
</p>

<p align="center">
  <a href="https://github.com/hamza-xyric/yhealth-app">
    <img src="https://img.shields.io/github/stars/hamza-xyric/yhealth-app?style=social" alt="GitHub Stars" />
  </a>
</p>
