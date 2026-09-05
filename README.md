# GenBuild — AI App Builder

GenBuild is an agentic AI app builder that generates full working React applications from natural-language prompts, with live preview, code editing, and one-click export.

**Live Demo:** https://genbuild.up.railway.app/

## Features

- **AI-powered code generation** — describe an app in plain English, get a full working React app in seconds, powered by Google Gemini with streaming responses (SSE) for real-time generation progress.
- **Live sandboxed preview** — generated code runs in an isolated Sandpack iframe, safe from the host application.
- **Redis-backed response caching** (Upstash) — identical prompts are served from cache instead of re-calling the LLM, cutting average response latency by ~93% (21.7s → 1.5s) and reducing API costs.
- **Sliding-window rate limiting** (Upstash Redis) — per-user request throttling to prevent abuse.
- **Credit-based billing** (Clerk Billing) — subscription plans (Free / Starter / Pro) with usage-based credit deduction.
- **Atomic database transactions** (Prisma) — workspace saves and credit deductions happen together or not at all, preventing inconsistent state.
- **Image-to-app generation** — upload a design reference image (Supabase Storage) to guide code generation.
- **Export to ZIP** — download the generated app as a standalone, runnable project.
- **Improve with AI Agent** (Pro feature) — iteratively refine generated apps via natural-language edit requests.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Sandpack
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Auth & Billing:** Clerk
- **AI:** Google Gemini API
- **Caching & Rate Limiting:** Redis (Upstash)
- **Storage:** Supabase Storage
- **Deployment:** Docker (multi-stage build), Railway

## Getting Started

### Prerequisites
- Node.js 22+
- A Supabase project
- A Clerk application
- A Google AI Studio API key (Gemini)
- An Upstash Redis database
- An Arcjet account

### Installation

```bash
git clone https://github.com/Mohitsati-gen/genbuild.git
cd genbuild
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Database
DATABASE_URL=
DIRECT_URL=

# Google Gemini
GEMINI_API_KEY=

# Arcjet
ARCJET_KEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running with Docker

```bash
docker build -t genbuild \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your_url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key .

docker run -p 3000:3000 --env-file .env genbuild
```

## Architecture Highlights

- **Streaming generation** — uses Server-Sent Events (SSE) to stream real-time status updates during AI generation instead of a blocking request/response.
- **Dependency validation** — every npm package suggested by the AI is verified against the npm registry before being included, preventing broken builds from hallucinated packages.
- **Stale-closure-safe React state** — uses refs alongside state to keep long-running async streams reading fresh data without unnecessary re-renders.

## License

This project was built as a learning exercise on top of an open-source tutorial codebase, with added Redis caching, rate limiting, and Docker containerization/deployment.