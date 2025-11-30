const fs = require("fs");
const path = require("path");

class PromptService {
  constructor() {
    const file = process.env.PROMPTS_FILE;
    this.filePath = path.resolve(__dirname, "..", "data", file);

    const raw = fs.readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw);

    // parsed.prompts contains arrays of prompt lines
    this.prompts = parsed.prompts;
  }

  // Builds multi-line prompt and injects the email JSON
  buildPrompt(lines, email) {
    return lines
      .join("\n")
      .replace("{{email}}", JSON.stringify(email, null, 2));
  }

  // CATEGORY PROMPT
  getCategorizePrompt(email) {
    return this.buildPrompt(this.prompts.categorize, email);
  }

  // ACTION ITEM EXTRACTION PROMPT
  getActionPrompt(email) {
    return this.buildPrompt(this.prompts.extract_action_items, email);
  }

  // DRAFT REPLY PROMPT
  getDraftPrompt(email) {
    return this.buildPrompt(this.prompts.auto_reply_draft, email);
  }
}

module.exports = PromptService;
