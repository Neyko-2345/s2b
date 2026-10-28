# Bot Discord

Base extensible de bot Discord en TypeScript, construite sur discord.js v14 avec commandes slash, événements et composants interactifs.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/discord-bot run dev` — run the Discord bot
- `pnpm --filter @workspace/discord-bot run deploy-commands` — publish slash commands to Discord
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required bot env: `DISCORD_TOKEN`; command publishing also requires `DISCORD_CLIENT_ID`. `DISCORD_GUILD_ID` is optional for fast guild-only command updates.
- The API server separately uses `DATABASE_URL`.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `packages/discord-bot/src/commands/` — slash commands
- `packages/discord-bot/src/components/` — button, select-menu, and modal handlers
- `packages/discord-bot/src/events/` — Discord client events
- `packages/discord-bot/src/deploy-commands.ts` — publish slash-command definitions
- `lib/api-spec/openapi.yaml` — API contract
- `lib/db/src/schema/` — database schema

## Architecture decisions

- Discord bot runs as its own workspace package and does not depend on the API server.
- Bot credentials are read from environment variables; never commit a real `.env` file or token.
- Slash commands are deployed separately from the bot process.

## Product

The Discord bot is a modular foundation for slash commands and interactive Discord components. Add new commands and systems incrementally as requested.

## User preferences

- The user wants to request new commands and bot systems incrementally.

## Gotchas

- Run `deploy-commands` after adding or changing slash-command definitions.
- Add bot secrets in Replit Secrets; do not paste credentials into source files.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
