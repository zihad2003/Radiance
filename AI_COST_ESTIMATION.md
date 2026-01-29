# AI Cost Estimation & Usage Guide

## Cost Analysis (OpenAI GPT-4o)

### 1. Skin Analysis (Vision)
*   **Input**: 720x720 Image (~500KB) + System Prompt
*   **Cost per Call**: ~$0.01 - $0.02
*   **Recommendation**:
    *   This is the most expensive operation.
    *   We resize images to 720p on the client side before sending to reduce token usage and latency.

### 2. Routine Recommendations (Text)
*   **Input**: Skin Profile JSON + Product Inventory (Optimized context)
*   **Cost per Call**: ~$0.005 - $0.01
*   **Optimization**: 
    *   **Caching Implemented**: If a user requests a routine for the same skin profile + goals, we serve a cached result from the database (valid for 24 hours). This reduces costs by ~80% for repeat views.

### 3. AI Chatbot (Text/Context)
*   **Input**: Message History + Inventory Context
*   **Cost per Call**: ~$0.002 - $0.005
*   **Control**: 
    *   Context window is limited to last 10 messages.
    *   Product inventory is injected as a concise list, not full JSON objects.

## Estimated Monthly Costs

| Volume (Users) | Skin Scans | Chat Messages | Est. Cost |
| :--- | :--- | :--- | :--- |
| **Hobby (100)** | 200 | 1,000 | ~$10 |
| **Startup (1,000)** | 2,000 | 10,000 | ~$100 |
| **Business (10,000)** | 20,000 | 100,000 | ~$1,000 |

## Optimization Strategies Implemented

1.  **Database Caching**: `recommendations` are cached in `ai_cache` table.
2.  **Client-Side Resizing**: Images are cropped and resized to 720x720 before upload.
3.  **Inventory Pruning**: When sending product data to LLM, we strip unnecessary fields (images, complex objects) and send only Name, ID, Price, and Key Ingredients.
4.  **Mock Mode**: If no API key is present, the app switches to a zero-cost mock mode automatically.

## Rate Limiting

*   **OpenAI Tier 1**: 500 RPM (Requests Per Minute)
*   **App Logic**: The frontend prevents rapid-fire button clicks ("Generating..." states).
