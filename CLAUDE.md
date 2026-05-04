# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered portfolio website built with Next.js that features a conversational AI chatbot powered by Google Cloud's Vertex AI. The portfolio uses a multi-agent architecture with RAG (Retrieval-Augmented Generation) for intelligent, contextual responses about Uday Raj Vadeghar's work and experience.

**Key Technologies:**
- Next.js 14 (App Router)
- TypeScript
- React 18
- Tailwind CSS
- Upstash Redis (rate limiting)
- Vertex AI (backend, deployed separately on Google Cloud Run)

## Development Commands

```bash
# Install dependencies
npm install

# Development server (usually runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Frontend (This Repository)
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS with CSS variables for theming
- **Components:** Located in `/components` directory
- **UI Components:** Shadcn/ui components in `/components/ui`

### Backend Integration
The frontend communicates with a separately deployed Vertex AI multi-agent system via API routes:

- **Session Management:** `/app/api/session/route.ts` - Creates new chat sessions
- **Chat Interaction:** `/app/api/chatbot/route.ts` - Handles message streaming with Server-Sent Events (SSE)

Both routes include:
- IP-based rate limiting (20 requests per minute via Upstash Redis token bucket)
- Bearer token authentication for backend API
- Session continuity tracking

### Key Integration Points

**Environment Variables Required:**
- `AGENT_API_ENDPOINT` - Vertex AI session creation endpoint
- `AGENT_API_ENDPOINT_INTERACTION` - Vertex AI message interaction endpoint
- `BEARER_TOKEN` - Authentication token for Vertex AI backend
- `UPSTASH_REDIS_REST_URL` - Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - Redis auth token

### Chatbot Implementation

**Client-Side (`/hooks/useChatbot.ts`):**
- Manages message state and streaming
- Implements SSE parsing for real-time AI responses
- Handles session lifecycle and error recovery
- Includes server warmup on first load (sends initial request to wake up backend)

**SSE Parser (`/lib/sse-parser.ts`):**
- Parses Server-Sent Events from Vertex AI backend
- Extracts text from various response formats (`content.parts[0].text`, `text`, `message`)
- Filters out function calls/responses from agent execution
- Formats error messages for common API errors (429, 503, 500, 401/403)

**Session Management (`/hooks/useChatSession.ts`):**
- Stores session IDs in browser sessionStorage
- Auto-refreshes session expiry on user activity
- Clears sessions on errors to force re-initialization

### Rate Limiting (`/lib/ratelimit.ts`)

Uses Upstash Redis with token bucket algorithm:
- **Limit:** 20 requests per minute per IP
- **Refill:** 20 tokens per minute
- Returns standard rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`)

## Component Structure

**Main Page Components:**
- `hero.tsx` - Landing section with animation
- `about.tsx` - About section with integrated ChatBox
- `experience.tsx` - Work experience timeline
- `education.tsx` - Educational background
- `skills.tsx` / `skills-visualization.tsx` - Technical skills display
- `projects.tsx` - Project showcase
- `open-source.tsx` - Open source contributions
- `coding-activity.tsx` - GitHub/LeetCode activity calendar
- `blog.tsx` - Blog posts section
- `contact.tsx` - Contact form (uses EmailJS)

**Layout Components:**
- `header.tsx` - Navigation with theme toggle
- `footer.tsx` - Footer section
- `theme-provider.tsx` - Dark/light theme management using next-themes
- `animated-background.tsx` - Background animation effects

**Chatbot:**
- `chat-box.tsx` - Chat UI component with message display and input
- Integrates with `useChatbot` hook for all chat logic

## Important Configuration

**Next.js Config (`next.config.mjs`):**
```javascript
{
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
```
⚠️ Note: Build-time checks are disabled. Run `npm run lint` and TypeScript checks manually during development.

**TypeScript:**
- Uses path alias: `@/*` maps to project root
- Target: ES2017
- Strict mode enabled

**Tailwind:**
- Dark mode: class-based
- Custom CSS variables defined in `app/globals.css`
- Shadcn/ui component library configured

## Development Notes

### Working with the Chatbot

1. The chatbot requires all environment variables to be set correctly
2. First message may take 15-20 seconds (cold start of Google Cloud Run backend)
3. SSE streaming responses are parsed incrementally for real-time display
4. Session IDs are managed automatically and stored in sessionStorage
5. Rate limiting is applied at the API route level before reaching the backend

### SSE Response Format

The backend returns Server-Sent Events with JSON payloads. Expected formats:
```json
{ "content": { "parts": [{ "text": "response text" }] } }
{ "text": "response text" }
{ "message": "response text" }
```

Function calls/responses in the multi-agent system are filtered out client-side.

### Session Flow

1. User opens chat → `useChatSession` checks for existing session in sessionStorage
2. First message → `/api/chatbot` creates new session if none exists via `AGENT_API_ENDPOINT`
3. Session ID returned in `X-Session-Id` header and stored client-side
4. Subsequent messages use stored session ID
5. Session errors trigger re-initialization

### Styling

- Uses Tailwind CSS with HSL-based CSS variables for theming
- Dark/light mode switching via `next-themes`
- Theme colors defined in `app/globals.css` under `:root` and `.dark`
- Custom animations defined in tailwind config

## Project Background (from README)

This portfolio demonstrates a production-grade multi-agent AI system where:
- Each agent handles specialized tasks (orchestration, retrieval, response generation, session management, analytics)
- RAG corpus is indexed in Vertex AI Search for semantic retrieval
- All responses are grounded in real data about Uday's work
- User interactions are logged to Google Cloud Storage for analytics
- Redis token bucket prevents API abuse
- Fully serverless deployment on Google Cloud Run (backend only - this frontend can be deployed anywhere)
