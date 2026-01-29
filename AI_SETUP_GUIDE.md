# AI Integration Setup Guide

## 1. OpenAI API Key (Required)
The Radiance AI features (Skin Analysis, Recommendations, Chat) rely on OpenAI's GPT-4o model.

1.  **Get Key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys) and create a new secret key.
2.  **Configure Convex**: By default, the backend looks for `OPENAI_API_KEY`.
    *   Run this command in your terminal:
        ```bash
        npx convex env set OPENAI_API_KEY sk-your-actual-key-here
        ```
    *   Alternatively, go to your [Convex Dashboard](https://dashboard.convex.dev) > Settings > Environment Variables and add `OPENAI_API_KEY`.

## 2. Convex Backend (Database)
Your database is already configured via `VITE_CONVEX_URL` in `.env.local`.
*   To manage your data: `npx convex dashboard`
*   To clean/reset data: Use the "Initialize Database" button in the Routine Builder UI (uses `seed:resetAndSeed`).

## 3. Environment Variables Reference
| Variable | Description | Where to set |
| :--- | :--- | :--- |
| `VITE_CONVEX_URL` | URL of your Convex backend | `.env.local` |
| `OPENAI_API_KEY` | Key for GPT-4o Vision & Chat | Convex Dashboard (`npx convex env set`) |

## Troubleshooting
*   **"No API Key found. Returning mock analysis/recommendations."**
    *   This means the backend cannot find `OPENAI_API_KEY`. Follow step 1 to set it.
    *   The app mimics a working state with mock data so you can test the UI without a paid key.
