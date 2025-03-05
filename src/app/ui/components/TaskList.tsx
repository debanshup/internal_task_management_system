import React, { useState } from "react";

const TaskList = ({ tasks, children, setCurrentTask=(p0: { _id: any; status: any; })=>{} }) => {
  const [openTask, setOpenTask] = useState(null);

  const toggleAccordion = (taskId) => {
    setOpenTask(openTask === taskId ? null : taskId);
  };

  return (
    <div className="w-full px-2">
      <div className="space-y-0">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border-b mx-auto border-gray-100 overflow-hidden transition-transform transform hover:scale-x-[1.009] "
          >
            {/* Accordion Header */}
            <div
              onClick={() => {
                // alert(typeof setCurrentTask)
                toggleAccordion(task._id);
                  setCurrentTask({ _id: task._id, status: task.status });
              }}
              className={`flex justify-between items-center px-6 py-4 cursor-pointer transition-colors duration-300 ${
                openTask === task._id
                  ? "bg-blue-100 text-blue-800"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{task.name}</h2>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 font-light">
                  {new Date(task.assignedAt).toLocaleString()}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-lg inline-flex items-center justify-center whitespace-nowrap w-auto ${
                    task.status === "completed"
                      ? "bg-green-200 text-green-600"
                      : task.status === "in-progress"
                      ? "bg-sky-100 text-sky-600" // Changed color for "In Progress"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status === "in-progress" && "In Progress"}
                  {task.status === "pending" && "Pending"}
                  {task.status === "completed" && "Completed"}
                </span>

                <span className="text-xl hover:text-gray-600">
                  {openTask === task._id ? (
                    // Up Arrow (Open Task)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    // Down Arrow (Closed Task)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {openTask === task._id && (
              <div className="p-6 bg-gray-100 border-l border-r border-t border-gray-100">
                <div className="space-y-6">
                  {children}
                  {/* Task Description */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Description
                      </h3>
                      <p className="mt-1 text-gray-700">{task.description}</p>
                    </div>
                  </div>

                  {/* Assigned Date */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Assigned Date
                      </h3>
                      <p className="mt-1 text-gray-700 font-semibold">
                        {new Date(task.assignedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Deadline
                      </h3>
                      <p className="mt-1 text-gray-700 font-semibold">
                        {new Date(task.deadline).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 w-fill py-5">
        End of result
      </p>
    </div>
  );
};



TaskList.defaultProps = {
  tasks: [],
  children: null,
  setCurrentTask: function () {
  },
};




export default TaskList;
