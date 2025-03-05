/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import DetailsTemplate from "../ui/components/DetailsTemplate";
import React, { useEffect, useState } from "react";
import NewTaskForm from "../ui/components/NewTaskForm";
import TaskList from "../ui/components/TaskList";
import Filters from "../ui/components/Filters";
import EmployeeList from "../ui/components/EmployeeList";
import Search from "../ui/components/Search";
import axiosInstance from "../utils/axiosInstance";

const Page = () => {
  const [task, setTask] = useState({ name: "", description: "", deadline: "" });
  const [taskList, setTasklist] = useState<unknown[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new-to-old");
  const [filter, setFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(true); // expand left section for small screen
  const [employees, setEmployees] = useState<unknown[]>([]);
  const [taskAssigned, setTaskAssigned] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<unknown>(null);
  const onSelectEmployee = (employee: unknown) => {
    setSelectedEmployee(employee);
    toggleExpand();
  };

  async function getTasks() {
    try {
      // alert(JSON.stringify(selectedEmployee))
      if (!selectedEmployee) {
        return;
      }
      // alert(filter + " " + sort);
      const response = await axiosInstance.get("/manager/get-tasks", {
        params: {
          employeeId: (selectedEmployee as { _id: string })._id || "",
          filter,
          sort,
        },
      });
      const { tasks, success } = response.data;
      if (!success) {
        throw "";
      }
      setTasklist([...tasks]);
    } catch (error) {}
  }

  useEffect(() => {
    getTasks();
  }, [selectedEmployee]);
  useEffect(() => {
    if (taskAssigned) {
      getTasks();
      setTaskAssigned(false);
    }
  }, [taskAssigned]);
  useEffect(() => {
    // alert(filter + " " + sort);
    getTasks();
  }, [filter, sort]);
  async function getEmployees() {
    try {
      const response = await axiosInstance.get("/manager/get-employees");
      const { data, success } = response.data;
      if (!success) {
        throw "Failed to fetch employees";
      }
      setEmployees([...data]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
    }
  }
  async function handleSearch() {
    try {
      // alert(query);
      const response = await axiosInstance.get("/manager/get-employees", {
        params: { query },
      });
      const { data, success, status } = response.data;
      if (!success) {
        throw "Failed to fetch employees";
      }
      setEmployees([...data]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error occurred");
    }
  }

  useEffect(() => {
    handleSearch();
  }, [query]);

  useEffect(() => {
    getEmployees();
  }, []);

  // for small screen
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  async function assignTask() {
    try {
      const response = await axiosInstance.post("/manager/assign-task", {
        employeeId: (selectedEmployee as { _id: string })._id,
        task,
      });

      const { assignedTask, success, status } = response.data;
      if (!success) {
        throw "";
      }
      alert("Task assigned successfully");
      setTaskAssigned(true);
    } catch (error) {
      // handle error
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div
        className={`lg:w-2/6 sm:w-2/4 ${
          isExpanded ? "w-full" : "w-0"
        } max-h-screen border-r flex flex-col transition-all duration-300`}
      >
        {/* Sticky Search */}
        <div className="sticky top-0 z-10">
          <Search queryAction={{ query, setQuery }} />
        </div>

        {/* Scrollable Employee List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <EmployeeList clickHandler={onSelectEmployee} employees={employees} />
        </div>
        {/* Expand/Collapse Button */}
        <button
          className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg sm:hidden z-30 flex items-center justify-center"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            // Expand Icon (Chevron Right)
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          ) : (
            // Collapse Icon (Chevron Left)
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:w-3/4 ${
          isExpanded ? "w-0" : "w-full"
        } bg-white flex flex-col max-h-screen overflow-y-auto transition-all duration-300 z-20`}
      >
        {/* Details Template */}
        {selectedEmployee ? (
          <>
            <div className="bg-zinc-50 flex justify-evenly flex-wrap items-start gap-4">
              {/* Details Section */}
              <div className="flex-1 min-w-[45%] p-4">
                <DetailsTemplate employee={selectedEmployee} />
              </div>

              {/* New Task Form Section */}
              <div className="flex-1 min-w-[45%] p-4">
                <NewTaskForm
                  employee={selectedEmployee}
                  assignTask={assignTask}
                  taskAction={{ task, setTask }}
                />
              </div>
            </div>
            <div className="sticky top-0 z-20 px-0 mb-4">
              <Filters
                fetcher={getTasks}
                changeAction={{ setSort, setFilter }}
                action={{ sort, filter }}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            Select an employee to view details
          </div>
        )}

        {/* Scrollable Task List */}
        <div className="flex-1 justify-start ">
          <TaskList tasks={taskList}></TaskList>
        </div>
      </div>
    </div>
  );
};

export default Page;
