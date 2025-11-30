export default function InboxList({ emails, onSelect, selectedId }) {
  return (
    <div className="w-[350px] bg-white rounded-xl shadow-md p-4 border border-gray-200 overflow-y-auto h-[90vh]">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Inbox</h2>

      {emails.length === 0 ? (
        <p className="text-sm text-gray-500">No emails available.</p>
      ) : (
        emails.map((email) => (
          <div
            key={email.id}
            className={`p-4 mb-3 rounded-lg cursor-pointer transition border
              ${
                selectedId === email.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-300"
              }
            `}
            onClick={() => onSelect(email)}
          >
            <p className="text-sm font-semibold text-gray-900">{email.subject}</p>
            <p className="text-xs text-gray-600 mt-1">{email.from}</p>
            <p className="text-[11px] text-gray-500 mt-1">{email.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
