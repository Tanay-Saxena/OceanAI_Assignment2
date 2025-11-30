const fs = require("fs");
const path = require("path");

class InboxService {
  constructor() {
    const file = process.env.INBOX_FILE; // mockInbox.json
    this.filePath = path.resolve(__dirname, "..", "data", file);

    const raw = fs.readFileSync(this.filePath, "utf8");
    this.data = JSON.parse(raw);
  }

  getAllEmails() {
    return this.data.emails;
  }

  getEmailById(id) {
    return this.data.emails.find(e => e.id === id);
  }
}

module.exports = InboxService;
