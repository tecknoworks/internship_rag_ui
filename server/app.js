import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom'; // For cleaning and formatting HTML
import cors from "cors";
import 'dotenv/config'

// __dirname and __filename are not available in ESM, so define them manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Use CORS middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions));

const BEARER_TOKEN = process.env.API_TOKEN;
const API_URL = process.env.API_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Function to extract HTML content
function extractHtmlContent(responseJson) {
    let htmlContent = "";

    const outputs = responseJson.outputs || [];
    outputs.forEach(output => {
        const outputsList = output.outputs || [];
        outputsList.forEach(outputItem => {
            const textContent = outputItem.results?.message?.text || "";
            if (textContent) {
                htmlContent += textContent + "\n";
            }

            const messageContent = outputItem.results?.message?.message?.text || "";
            if (messageContent) {
                htmlContent += messageContent + "\n";
            }
        });
    });

    // Clean unnecessary delimiters
    htmlContent = htmlContent.trim();
    if (htmlContent.startsWith("```html")) {
        htmlContent = htmlContent.substring(7); // Remove ```html
    }
    if (htmlContent.endsWith("```")) {
        htmlContent = htmlContent.slice(0, -3); // Remove ```
    }

    return htmlContent;
}

// Function to clean and format HTML content
function cleanHtml(htmlContent) {
    const dom = new JSDOM(htmlContent);
    return dom.window.document.body.innerHTML;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api', async (req, res) => {
    const { input_value } = req.body;

    const headers = {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        "input_value": input_value,
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": {
            "ChatInput-xsUNF": {},
            "ParseData-8uzDt": {},
            "Prompt-WBVUq": {},
            "SplitText-X874V": {},
            "OpenAIModel-AlCaD": {},
            "ChatOutput-pzxV8": {},
            "OpenAIEmbeddings-y8iwg": {},
            "OpenAIEmbeddings-s2riv": {},
            "File-UxnIS": {},
            "Pinecone-2KDxd": {},
            "Pinecone-xk9wB": {},
        },
    });

    try {
        const apiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (apiResponse.ok) {
            const responseJson = await apiResponse.json();
            const rawHtmlContent = extractHtmlContent(responseJson);
            const cleanedHtmlContent = cleanHtml(rawHtmlContent);

            res.json({ success: true, html: cleanedHtmlContent });
        } else {
            res.status(apiResponse.status).json({
                success: false,
                error: `API Error: ${await apiResponse.text()}`,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});