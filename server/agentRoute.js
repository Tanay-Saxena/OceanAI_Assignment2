// server/agentRoute.js
// Registers the /api/agent/query endpoint
// Expects to be passed (app, inbox, promptService, gemini) from your index.js

module.exports = function registerAgentRoute(app, inbox, promptService, gemini) {
  // POST /api/agent/query
  // body: { emailId: string|null, message: string }
  app.post("/api/agent/query", async (req, res) => {
    try {
      const { emailId, message } = req.body || {};
      if (!message || typeof message !== "string") {
        return res.status(400).json({ ok: false, error: "Missing 'message' in request body" });
      }

      // Fetch email context if provided
      const email = emailId ? inbox.getEmailById(emailId) : null;

      // Build combined prompt using stored prompts
      // Use the PromptService helper methods if available; fall back to raw prompts if needed
      let categorizePrompt = "";
      let extractPrompt = "";
      let draftPrompt = "";

      try {
        categorizePrompt = promptService.getCategorizePrompt(email);
        extractPrompt = promptService.getActionPrompt(email);
        draftPrompt = promptService.getDraftPrompt(email);
      } catch (e) {
        // if promptService API differs, try to access raw prompts
        if (promptService.prompts) {
          categorizePrompt = (promptService.prompts.categorize || []).join("\n");
          extractPrompt = (promptService.prompts.extract_action_items || []).join("\n");
          draftPrompt = (promptService.prompts.auto_reply_draft || []).join("\n");
        }
      }

      // Compose a clear system + context + user request prompt
      const systemHeader = `You are an intelligent email assistant. Use the stored prompts and the provided email context to answer the user's request precisely. Provide concise, helpful responses.`;
      const emailBlock = email ? `EMAIL:\n${JSON.stringify(email, null, 2)}\n` : "EMAIL: (none provided)\n";
      const combinedPrompt = [
        systemHeader,
        "",
        "--- STORED CATEGORIZATION PROMPT ---",
        categorizePrompt,
        "",
        "--- STORED ACTION-ITEM PROMPT ---",
        extractPrompt,
        "",
        "--- STORED AUTO-REPLY PROMPT ---",
        draftPrompt,
        "",
        "--- EMAIL CONTEXT ---",
        emailBlock,
        "",
        `--- USER REQUEST ---\n${message}\n`,
        // Ask LLM to respond as plain text
        "Return only the answer text. Keep it helpful and concise."
      ].join("\n");

      // Call your gemini/openai wrapper used in other routes.
      // This assumes your gemini client exposes generateJSON(prompt) OR generateText(prompt).
      // We call the same method your index.js uses elsewhere.
      let result;
      try {
        result = await gemini.generateJSON(combinedPrompt);
      } catch (err) {
        // fallback to a generic generate / text method if present
        if (typeof gemini.generateText === "function") {
          result = await gemini.generateText(combinedPrompt);
        } else {
          throw err;
        }
      }

      // result may be string or object; normalize to text
      const textReply = typeof result === "string" ? result : (result?.text || JSON.stringify(result));

      return res.json({ ok: true, reply: textReply });
    } catch (err) {
      console.error("❌ /api/agent/query error:", err);
      return res.status(500).json({ ok: false, error: err.message || String(err) });
    }
  });
};
