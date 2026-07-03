# D for David

Stop spelling things over the phone. Create a temporary room, share a 5-character code, and type what the other person needs to see live.

Built with Next.js, TypeScript, Tailwind CSS, and Convex for realtime sync.

## Quick Start

### Prerequisites

- Node.js 18+
- A [Convex](https://convex.dev) account

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Convex

```bash
npx convex dev
```

On first run, Convex will:

1. Prompt you to log in and create or select a project
2. Write `NEXT_PUBLIC_CONVEX_URL` to `.env.local`
3. Deploy your schema and functions
4. Watch for changes to `convex/`

Leave `npx convex dev` running in one terminal.

### 3. Run the app

In a second terminal:

```bash
npm run dev
```

Open http://localhost:3000.

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL, set automatically by `npx convex dev` |

If you are starting fresh, copy the example file first:

```bash
cp .env.local.example .env.local
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run dev:convex` | Start Convex dev sync |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

## Deploy to Vercel

### 1. Push to GitHub

Create a repo and push this project.

### 2. Create a production Convex deployment

```bash
npx convex deploy
```

Note the production URL that Convex gives you.

### 3. Import into Vercel

1. Go to https://vercel.com/new and import the repo.
2. Add the environment variable:
   - `NEXT_PUBLIC_CONVEX_URL` = your production Convex URL
3. Deploy.

### 4. Keep Convex deployed

Run this whenever you change anything in `convex/`:

```bash
npx convex deploy
```

## How It Works

1. Homepage: create a room or join with a code.
2. Room creator: gets Writer Mode with a large textarea and auto-sync.
3. Room joiner: gets Viewer Mode with large read-only text.
4. Realtime: Convex subscriptions push text updates instantly.
5. Expiration: rooms auto-expire after 30 minutes and a cron job clears old rows.

Creator vs viewer is determined by a `creatorToken` stored in `localStorage` when you create a room.

## Project Structure

```text
d-for-david/
|-- convex/
|   |-- schema.ts          # rooms table
|   |-- rooms.ts           # room lifecycle and sync functions
|   `-- crons.ts           # cleanup expired rooms every 5 min
|-- src/
|   |-- app/
|   |   |-- page.tsx       # homepage
|   |   |-- layout.tsx     # root layout + Convex provider
|   |   `-- r/[code]/      # room page
|   |-- components/        # UI components
|   `-- lib/
|       |-- spelling.ts    # spelling-friendly text conversion
|       |-- creator-token.ts
|       |-- room-code.ts
|       `-- time.ts
`-- README.md
```

## Privacy

- No login or accounts
- Rooms expire after 30 minutes
- No analytics
- No AI processing
- Do not use for passwords, SSNs, full credit card numbers, or highly sensitive information
