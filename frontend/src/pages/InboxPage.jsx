// src/pages/InboxPage.jsx
import { useEffect, useState } from "react";

import {
  getEmails,
  categorizeEmail,
  extractActions,
  generateDraft,
  askAgent,
} from "../api/emailApi";

import InboxList from "../components/InboxList";
import EmailViewer from "../components/EmailViewer";
import ActionsPanel from "../components/ActionsPanel";
import ChatAgent from "../components/ChatAgent";

export default function InboxPage() {
  const [emails, setEmails] = useState([]);
  const [selected, setSelected] = useState(null);

  const [category, setCategory] = useState(null);
  const [actions, setActions] = useState(null);
  const [draft, setDraft] = useState(null);

  const [loadingCategorize, setLoadingCategorize] = useState(false);
  const [loadingActions, setLoadingActions] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const [agentReply, setAgentReply] = useState(null);
  const [loadingAgent, setLoadingAgent] = useState(false);

  const [error, setError] = useState(null);

  /* ============================================================
     LOAD EMAILS ON MOUNT
  ============================================================ */
  useEffect(() => {
    getEmails()
      .then((emailsArray) => {
        setEmails(emailsArray || []);
      })
      .catch(() => {
        setError("Failed to load emails");
      });
  }, []);

  /* ============================================================
     SELECT EMAIL → RESET PREVIOUS AI OUTPUT
  ============================================================ */
  const handleSelectEmail = (email) => {
    setSelected(email);
    setCategory(null);
    setActions(null);
    setDraft(null);
    setAgentReply(null);
  };

  /* ============================================================
     CATEGORIZE EMAIL
  ============================================================ */
  const handleCategorize = async () => {
    if (!selected) return;

    setLoadingCategorize(true);
    setCategory(null);

    try {
      const result = await categorizeEmail(selected.id);
      setCategory(result);
    } catch (e) {
      setError("Categorization failed");
    } finally {
      setLoadingCategorize(false);
    }
  };

  /* ============================================================
     ACTION ITEMS
  ============================================================ */
  const handleExtract = async () => {
    if (!selected) return;

    setLoadingActions(true);
    setActions(null);

    try {
      const extracted = await extractActions(selected.id);
      setActions(extracted);
    } catch (e) {
      setError("Failed to extract action items");
    } finally {
      setLoadingActions(false);
    }
  };

  /* ============================================================
     GENERATE DRAFT
  ============================================================ */
  const handleDraft = async () => {
    if (!selected) return;

    setLoadingDraft(true);
    setDraft(null);

    try {
      const generated = await generateDraft(selected.id);
      setDraft(generated);
    } catch (e) {
      setError("Draft generation failed");
    } finally {
      setLoadingDraft(false);
    }
  };

  /* ============================================================
     CHAT AGENT → SEND QUESTION
  ============================================================ */
  const handleAskAgent = async (message) => {
    if (!selected) {
      setError("Select an email first.");
      return;
    }

    setLoadingAgent(true);
    setAgentReply(null);

    try {
      const replyText = await askAgent(selected, message);
      setAgentReply(replyText);
    } catch (e) {
      setError("AI Agent failed to respond");
    } finally {
      setLoadingAgent(false);
    }
  };

  /* ============================================================
     UI LAYOUT
  ============================================================ */
  return (
    <div className="grid grid-cols-4 gap-4 p-4 h-screen overflow-hidden">

      {/* LEFT: INBOX */}
      <div className="col-span-1 overflow-y-auto border-r border-gray-300">
        <InboxList
          emails={emails}
          onSelect={handleSelectEmail}
          selectedId={selected?.id}
        />
      </div>

      {/* MIDDLE: EMAIL VIEWER */}
      <div className="col-span-2 overflow-y-auto">
        <EmailViewer
          email={selected}
          category={category}
          actions={actions}
          draft={draft}
        />

        {/* SHOW AI AGENT REPLY */}
        {agentReply && (
          <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">AI Agent Reply</h3>
            <p className="text-gray-800 whitespace-pre-line">{agentReply}</p>
          </div>
        )}
      </div>

      {/* RIGHT: ACTIONS + CHAT */}
      <div className="col-span-1 flex flex-col gap-4 overflow-y-auto">
        <ActionsPanel
          onCategorize={handleCategorize}
          onExtract={handleExtract}
          onDraft={handleDraft}
          category={category}
          actions={actions}
          draft={draft}
          loadingCategorize={loadingCategorize}
          loadingActions={loadingActions}
          loadingDraft={loadingDraft}
        />

        {/* CHAT AGENT */}
        <ChatAgent onAsk={handleAskAgent} loading={loadingAgent} />
      </div>

      {/* ERROR POPUP */}
      {error && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
