# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 3 - Deep Expansion (2025-11-18)

#### Added - Domain Model
- **Collection** entity for grouping related prompts
- **Tag** entity for normalized tag management
- **PromptVersion** entity for tracking prompt history
- **PromptUsage** entity for analytics and tracking
- Enhanced MusicPrompt with status, viewCount, copyCount fields

#### Added - API Endpoints
- `GET /api/collections` - List all collections
- `POST /api/collections` - Create new collection
- `GET /api/collections/[id]` - Get collection details with prompts
- `PUT /api/collections/[id]` - Update collection
- `DELETE /api/collections/[id]` - Delete collection
- `POST /api/collections/[id]/prompts` - Add prompt to collection
- `DELETE /api/collections/[id]/prompts/[promptId]` - Remove prompt from collection

#### Added - Infrastructure
- **Logger** (`lib/logger.ts`) - Structured logging with context
- **Metrics** (`lib/metrics.ts`) - In-memory metrics collection with business metrics helpers
- **Events** (`lib/events.ts`) - Domain event system with type-safe event bus
- **Adapters** (`lib/adapters/`) - Plugin system with interfaces for:
  - Notification adapter (email, webhooks, push)
  - Analytics adapter (event tracking, user identification)
  - Export adapter (JSON, CSV, Markdown, YAML)
  - Adapter registry for dependency injection

#### Added - Validation & Types
- Collection validation schemas with Zod
- Tag validation schemas with Zod
- TypeScript interfaces for Collection and Tag entities

#### Enhanced - Seed Data
- 16 normalized tags (8 mood, 8 usage)
- 8 diverse music prompts across genres
- 4 themed collections
- 2 prompt versions (history demo)
- 115+ usage records for analytics

#### Added - Documentation
- `docs/PHASE3_OVERVIEW.md` - Comprehensive Phase 3 plan
- `CHANGELOG.md` - Project changelog

### Phase 2 - Production Ready (2025-11-18)

#### Added
- Zod validation for all API inputs
- Centralized error handling with `ApiError` class
- Consistent API response format
- Vitest testing framework with 11 passing tests
- Docker support (Dockerfile + docker-compose.yml)
- Enhanced npm scripts (test, db:*, typecheck)
- `.env.example` for environment configuration
- Comprehensive README with example flows

#### Enhanced
- MusicPrompt API with full CRUD operations
- Error responses with detailed validation feedback
- Seed data expanded to 6 diverse prompts

## [0.1.0] - 2025-11-18

### Initial Release

#### Added
- Next.js 14 with App Router
- TypeScript and Tailwind CSS
- Prisma ORM with SQLite
- MusicPrompt entity (CRUD operations)
- API routes for prompt management
- UI pages: list, create, detail
- Genre, mood, and usage filtering
- YouTube template support
- Basic seed data

[Unreleased]: https://github.com/goodmonk06/suno-music-prompt-library-jp/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/goodmonk06/suno-music-prompt-library-jp/releases/tag/v0.1.0
