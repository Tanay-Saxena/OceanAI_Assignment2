// frontend/src/api/emailApi.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0"
  }
});

/* ======================================================
   GET ALL EMAILS
====================================================== */
export async function getEmails() {
  try {
    const res = await api.get("/emails");
    if (!res.data.ok) throw new Error(res.data.error);
    return res.data.emails;
  } catch (err) {
    console.error("❌ getEmails error:", err);
    throw err;
  }
}

/* ======================================================
   CATEGORIZE EMAIL
====================================================== */
export async function categorizeEmail(id) {
  try {
    const res = await api.post(`/emails/${id}/categorize`);
    if (!res.data.ok) throw new Error(res.data.error);
    return res.data.category;
  } catch (err) {
    console.error("❌ categorizeEmail error:", err);
    throw err;
  }
}

/* ======================================================
   EXTRACT ACTION ITEMS
====================================================== */
export async function extractActions(id) {
  try {
    const res = await api.post(`/emails/${id}/actions`);
    if (!res.data.ok) throw new Error(res.data.error);
    return res.data.actions;
  } catch (err) {
    console.error("❌ extractActions error:", err);
    throw err;
  }
}

/* ======================================================
   GENERATE DRAFT REPLY
====================================================== */
export async function generateDraft(id) {
  try {
    const res = await api.post(`/emails/${id}/draft`);
    if (!res.data.ok) throw new Error(res.data.error);
    return res.data.draft;
  } catch (err) {
    console.error("❌ generateDraft error:", err);
    throw err;
  }
}

/* ======================================================
   EMAIL AGENT CHAT (FINAL, CORRECT)
====================================================== */
/*
 Backend expects:
 POST /api/agent
 {
    email: { full email object },
    message: "user question"
 }
*/
export async function askAgent(email, message) {
  try {
    const res = await api.post("/agent", { email, message });

    if (!res.data.ok) throw new Error(res.data.error);

    return res.data.reply; // return only the assistant reply
  } catch (err) {
    console.error("❌ askAgent error:", err);
    throw err;
  }
}
