const fs = require("fs");
const path = require("path");

class DraftService {
  constructor() {
    const file = process.env.DRAFTS_FILE; // drafts.json
    this.filePath = path.resolve(__dirname, "..", "data", file);

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({ drafts: [] }, null, 2));
    }

    this._load();
  }

  _load() {
    const raw = fs.readFileSync(this.filePath, "utf8");
    this.data = JSON.parse(raw);
  }

  saveDraft(draft) {
    this.data.drafts.push(draft);
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }
}

module.exports = DraftService;
