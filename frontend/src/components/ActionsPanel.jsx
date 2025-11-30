export default function ActionsPanel({
  onCategorize,
  onExtract,
  onDraft,
  loadingCategorize,
  loadingActions,
  loadingDraft
}) {
  return (
    <div className="w-[260px] bg-white rounded-xl shadow-md p-6 border border-gray-200 h-[90vh]">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Actions</h2>

      <div className="space-y-4">
        {/* CATEGORIZE BUTTON */}
        <button
          onClick={onCategorize}
          disabled={loadingCategorize}
          className="w-full py-2 rounded-lg text-white font-semibold transition 
                    bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loadingCategorize ? "Categorizing..." : "Categorize Email"}
        </button>

        {/* EXTRACT ACTION ITEMS */}
        <button
          onClick={onExtract}
          disabled={loadingActions}
          className="w-full py-2 rounded-lg text-white font-semibold transition 
                    bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
        >
          {loadingActions ? "Extracting..." : "Extract Action Items"}
        </button>

        {/* GENERATE DRAFT */}
        <button
          onClick={onDraft}
          disabled={loadingDraft}
          className="w-full py-2 rounded-lg text-white font-semibold transition
                    bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400"
        >
          {loadingDraft ? "Generating..." : "Generate Draft Reply"}
        </button>
      </div>
    </div>
  );
}
