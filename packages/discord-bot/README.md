# Base du bot Discord

Bot Node.js en JavaScript avec discord.js `14.27.x`, commandes slash modulaires et support des composants Discord classiques et Components V2.

Le serveur Express répond `Hello World!` sur `GET /`. Il utilise le port `PORT` fourni par Replit, ou le port `3000` par défaut.

## Configuration

1. Dans le portail développeur Discord, crée une application puis ajoute un bot.
2. Invite-le sur ton serveur avec les scopes `bot` et `applications.commands`, ainsi que les permissions `View Channels` et `Send Messages`. Aucune permission de modération n'est nécessaire.
3. Ajoute `DISCORD_TOKEN` et `DISCORD_CLIENT_ID` aux secrets Replit. Pour tester les commandes uniquement sur un serveur, ajoute aussi `DISCORD_GUILD_ID`.
4. Pour un lancement local, copie `.env.example` vers `.env` et renseigne les valeurs. Le fichier `.env` est ignoré par Git.

Ne partage jamais le token du bot dans une conversation ou dans le code.

## Démarrage

```sh
pnpm --filter @workspace/discord-bot run deploy-commands
pnpm --filter @workspace/discord-bot run dev
```

La commande de publication est nécessaire après l'ajout ou la modification d'une définition slash. Avec `DISCORD_GUILD_ID`, Discord applique généralement les changements de développement plus vite. Sans cette variable, les commandes sont publiées globalement.

## Exemples inclus

- `/ping` — vérifie la connexion du bot.
- `/components-demo` — montre un message Components V2 avec bouton, menu de sélection et modal.

Les commandes sont dans `src/commands/`, les événements dans `src/events/`, et les handlers dans `src/components/buttons/`, `src/components/selects/` et `src/components/modals/`.
