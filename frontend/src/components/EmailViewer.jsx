export default function EmailViewer({ email, category, actions, draft }) {
  if (!email) {
    return (
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Select an email to view its details.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-200 overflow-y-auto h-[90vh]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{email.subject}</h2>

      <div className="mb-4">
        <p className="text-sm"><span className="font-semibold">From:</span> {email.from}</p>
        <p className="text-sm"><span className="font-semibold">Date:</span> {email.date}</p>
      </div>

      <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-300 text-gray-800">
        {email.body}
      </pre>

      {/* AI Results */}
      <div className="mt-6 space-y-4">
        {category && (
          <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-1">Category</h3>
            <p><span className="font-semibold">Type:</span> {category.category}</p>
            <p><span className="font-semibold">Reason:</span> {category.reason}</p>
          </div>
        )}

        {actions && (
          <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Action Items</h3>
            {actions.length === 0 ? (
              <p className="text-sm text-gray-700">No tasks found.</p>
            ) : (
              actions.map((task, idx) => (
                <div key={idx} className="mb-2">
                  <p><span className="font-semibold">Task:</span> {task.task}</p>
                  <p><span className="font-semibold">Deadline:</span> {task.deadline || "None"}</p>
                  <p><span className="font-semibold">Assignee:</span> {task.assignee || "None"}</p>
                  <p><span className="font-semibold">Context:</span> {task.context}</p>
                </div>
              ))
            )}
          </div>
        )}

        {draft && (
          <div className="p-4 bg-purple-50 border border-purple-300 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Generated Draft</h3>
            <p className="font-semibold">Subject: </p>
            <p className="mb-2">{draft.subject}</p>

            <p className="font-semibold">Body:</p>
            <pre className="whitespace-pre-wrap bg-purple-100 p-3 rounded-lg border border-purple-300">
              {draft.body}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
