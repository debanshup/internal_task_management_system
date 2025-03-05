import { takeCoverage } from "node:v8";
import React, { useState } from "react";

const NewTaskForm = ({ assignTask, taskAction, employee }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const { task, setTask } = taskAction;
  const { name, description, deadline } = task;
  // alert(JSON.stringify(task));

  return (
    <div className="p-4 flex justify-center items-center h-full">
      {/* Button to Show/Hide Form */}
      <button
        className="px-5 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
        onClick={() => setFormVisible(!isFormVisible)}
      >
        New Task
      </button>

      {/* Task Form */}
      {isFormVisible && (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition-all ease-in-out duration-300 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full bg-black/50 cursor-pointer"
            onClick={() => setFormVisible(false)}
          ></div>

          <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-6">
            <div className="w-full py-6 bg-white cursor-default pointer-events-auto relative rounded-xl shadow-lg mx-auto max-w-lg">
              <button
                type="button"
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => setFormVisible(false)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>

              <div className="space-y-4 p-4">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    Assign a new task to{" "}
                    <span className="text-blue-600">{employee.name}</span>
                  </h2>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    assignTask();
                  }}
                  className="space-y-6 mt-6"
                >
                  {/* Task Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Task Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => {
                        setTask({ ...task, name: e.target.value });
                      }}
                      type="text"
                      name={"name"}
                      placeholder="Enter task name"
                      className="mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 transition-all duration-200 ease-in-out"
                      required
                    />
                  </div>

                  {/* Task Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setTask({ ...task, description: e.target.value });
                      }}
                      name={"description"}
                      placeholder="Enter task description"
                      rows={4}
                      className="mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 transition-all duration-200 ease-in-out"
                      required
                    ></textarea>
                  </div>

                  {/* Deadline */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Deadline
                    </label>
                    <input
                      value={deadline}
                      onChange={(e) => {
                        setTask({ ...task, deadline: e.target.value });
                      }}
                      type="date"
                      name={"deadline"}
                      className="mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 transition-all duration-200 ease-in-out"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 ease-in-out"
                  >
                    Assign Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTaskForm;
