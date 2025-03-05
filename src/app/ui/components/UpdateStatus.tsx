import React from "react";

const UpdateStatus = ({ statusAction }) => {
  const { currentTask, setCurrentTask, updateStatus, newStatus, setNewStatus } =
    statusAction;
  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0"></div>

      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        Update Status
      </h2>
      <select
        value={currentTask.status}
        className="border border-gray-300 rounded px-2 py-1 text-xs"
        onChange={(e) => {
          setCurrentTask((prev) => ({ ...prev, status: e.target.value }));
        }}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={updateStatus}
        type="button"
        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateStatus;
