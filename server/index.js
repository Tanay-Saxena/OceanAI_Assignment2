require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const Inbox = require("./inboxService");
const PromptService = require("./promptService");
const Gemini = require("./geminiClient");
const Drafts = require("./draftService");

// 👉 NEW: Chat Agent Route
const registerAgentRoute = require("./agentRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Core services
const inbox = new Inbox();
const prompts = new PromptService();
const gemini = new Gemini(process.env.GEMINI_API_KEY);
const drafts = new Drafts();

/* ============================================
   GET ALL EMAILS
============================================ */
app.get("/api/emails", (req, res) => {
  try {
    const emails = inbox.getAllEmails();
    res.json({ ok: true, emails });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

/* ============================================
   CATEGORIZE EMAIL
============================================ */
app.post("/api/emails/:id/categorize", async (req, res) => {
  const email = inbox.getEmailById(req.params.id);
  const prompt = prompts.getCategorizePrompt(email);

  console.log("📩 Categorize Prompt Sent:\n", prompt);

  try {
    const result = await gemini.generateJSON(prompt);
    res.json({ ok: true, category: result });
  } catch (err) {
    console.error("❌ Categorization Error:", err);
    res.json({ ok: false, error: err.message });
  }
});

/* ============================================
   EXTRACT ACTION ITEMS
============================================ */
app.post("/api/emails/:id/actions", async (req, res) => {
  const email = inbox.getEmailById(req.params.id);
  const prompt = prompts.getActionPrompt(email);

  console.log("📩 Action Prompt Sent:\n", prompt);

  try {
    const result = await gemini.generateJSON(prompt);
    res.json({ ok: true, actions: result });
  } catch (err) {
    console.error("❌ Action Extraction Error:", err);
    res.json({ ok: false, error: err.message });
  }
});

/* ============================================
   GENERATE DRAFT REPLY
============================================ */
app.post("/api/emails/:id/draft", async (req, res) => {
  const email = inbox.getEmailById(req.params.id);
  const prompt = prompts.getDraftPrompt(email);

  console.log("📩 Draft Prompt Sent:\n", prompt);

  try {
    const result = await gemini.generateJSON(prompt);

    res.json({
      ok: true,
      draft: {
        subject: result.subject,
        body: result.body,
        draft: true,
        sourceEmailId: email.id
      }
    });
  } catch (err) {
    console.error("❌ Draft Generation Error:", err);
    res.json({ ok: false, error: err.message });
  }
});

/* ============================================
   REGISTER CHAT AGENT ROUTE
   (MUST COME AFTER promptService, inbox, gemini)
============================================ */
registerAgentRoute(app, inbox, prompts, gemini);

/* ============================================
   START SERVER
============================================ */
app.listen(8080, () => {
  console.log(`🚀 Email agent running at: http://localhost:8080`);
  console.log(`🔥 Using Gemini model: gemini-2.0-flash`);
});

// ------------------------------
// EMAIL AGENT CHAT ENDPOINT
// ------------------------------
app.post("/api/agent", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email) {
      return res.json({ ok: false, error: "No email selected." });
    }

    // Build a generic "agent" prompt
    const prompt = `
You are an AI email assistant.
You help the user with tasks like summarizing, extracting tasks,
suggesting replies, or answering questions about the email.

Email Content:
${JSON.stringify(email, null, 2)}

User Question:
"${message}"

Respond clearly and concisely.
    `;

    console.log("📩 Agent Chat Prompt Sent:\n", prompt);

    const result = await gemini.generateText(prompt);  // <-- NEW method

    res.json({
      ok: true,
      reply: result
    });

  } catch (err) {
    console.error("❌ Agent Chat Error:", err);
    res.json({
      ok: false,
      error: err.message
    });
  }
});
