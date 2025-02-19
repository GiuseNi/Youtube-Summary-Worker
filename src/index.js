import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai"



export default {
    async fetch(request,env) {

        const url = new URL(request.url);
        const videoUrl = url.searchParams.get("videoUrl");
        const lang = url.searchParams.get("lang") || "English"; //Default language is English
        
        if (!videoUrl) {
            return new Response(JSON.stringify({ error: "Missing videoUrl parameter" }), { status: 400 });
        }

        const videoId = getVideoId(videoUrl);
        if (!videoId) {
            return new Response(JSON.stringify({ error: "Invalid YouTube URL" }), { status: 400 });
        }

        try {
            const transcript = await getTranscript(videoId);
            if (!transcript) {
                return new Response(JSON.stringify({ error: "Transcript not found" }), { status: 404 });
            }

            const summary = await getSummary(transcript, lang, env);
            return new Response(JSON.stringify({ summary }), { status: 200 });
        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }
};

//Define the function to fetch the transcript
async function getTranscript(videoId) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        return transcript.map(item => item.text).join(" ");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch transcript");
    }
}

//Define the function to generate the summary
async function getSummary(transcript, lang, env) {
	const openai = new OpenAI({
		apiKey: env.OPENROUTER_API_KEY,
		baseURL: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1', //Default base URL is OpenRouter
	
		defaultHeaders: {
			"HTTP-Referer": "https://github.com/OpenRouterTeam/openrouter-examples",
		},
	})
    
    try {
		const completion = await openai.chat.completions.create({
			messages: [
				{ role: "system", content: `You are an helpul assistant specialized in youtube video summarization. The user send you the text of the video to summarize. Write the summary in ${lang}.` },
				{ role: "user", content: transcript }
			],
			model: env.OPENROUTER_MODEL,
		  })

        return completion.choices[0].message.content;
    } catch (error) {
		console.log(error)
        throw new Error("Failed to generate summary");
    }
}

//Define the function to get the video ID from the URL
function getVideoId(url) {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
}
