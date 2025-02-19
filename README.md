# 🚀 YouTube Video Summarizer (Cloudflare Worker)

## 🌟 Overview
This Cloudflare Worker extracts the transcript of a YouTube video and generates a concise summary using OpenRouter Models.

## ✨ Features
✅ Fetches the transcript of a YouTube video.
✅ Generates a summary in the specified language (default: English).
✅ Uses OpenRouter API for AI-powered summarization.

## 🛠 Requirements
- A Cloudflare Workers environment.
- An OpenRouter API key.
- `wrangler` CLI for local development.

## 📦 Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/GiuseNi/Youtube-Summary-Worker.git
cd Youtube-Summary-Worker
```

### 2️⃣ Install Dependencies (if required for testing)
```sh
npm install
```

### 3️⃣ Configure Environment Variables

#### Cloudflare Workers Dashboard
1. Go to [Cloudflare Workers Dashboard](https://dash.cloudflare.com/).
2. Navigate to your worker's settings.
3. Add the following environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key.
   - `OPENROUTER_BASE_URL` (optional): Custom OpenRouter base URL.
   - `OPENROUTER_MODEL`: The OpenRouter model to use.

#### Wrangler (Local Development)
1. Create a `.dev.vars` file in your project root:
   ```sh
   OPENROUTER_API_KEY=your_api_key
   OPENROUTER_BASE_URL=openrouter_base_url
   OPENROUTER_MODEL=your_openrouter_model
   ```
2. Start the local worker with environment variables:
   ```sh
   npx wrangler dev
   ```

## 🚀 Deployment

Deploy the worker using Wrangler:
```sh
npx wrangler deploy
```

## 🔥 Usage

Send a request to the deployed worker with the following parameters:

### Required Parameters
| Parameter  | Description |
|------------|------------|
| `videoUrl` | The URL of the YouTube video (Required) |
| `lang`     | The desired language for the summary (Optional, default: English) |

### 📌 Example Request
```sh
curl "https://your-worker-url.com?videoUrl=https://www.youtube.com/watch?v=VIDEO_ID&lang=English"
```

### 📌 Example Response
```json
{
  "summary": "This video discusses..."
}
```

## 🔒 Access Control with Cloudflare Access
You can secure this worker by configuring **Cloudflare Access**:
1. Go to the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/).
2. Navigate to **Zero Trust** > **Access** > **Applications** and create a new application.
3. Set up a policy to allow only specific users or groups to access the worker.


## 🧩 Functions Breakdown

🔹 `fetch(request, env)`: Handles incoming requests and coordinates the workflow.
🔹 `getTranscript(videoId)`: Fetches the transcript of a given YouTube video.
🔹 `getSummary(transcript, lang, env)`: Uses OpenAI library to interat to OpenRouter API and generate a summary.
🔹 `getVideoId(url)`: Extracts the video ID from a YouTube URL.

## ⚠️ Error Handling
🚨 Returns a `400` status if the `videoUrl` parameter is missing or invalid.
🚨 Returns a `404` status if no transcript is found.
🚨 Returns a `500` status for internal errors.

## 📜 License
This project is licensed under the **MIT License**.

---

💡 **Contributions are welcome!** Feel free to open issues or submit pull requests. 🚀

