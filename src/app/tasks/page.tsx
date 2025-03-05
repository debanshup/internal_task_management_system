/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import TaskList from "../ui/components/TaskList";
import Filters from "../ui/components/Filters";
import axiosInstance from "../utils/axiosInstance";
import UpdateStatus from "../ui/components/UpdateStatus";

const Page = () => {
  const [taskList, setTasklist] = useState<unknown[]>([]);
  const [currentTask, setCurrentTask] = useState({ _id: "", status: "" });
  const [sort, setSort] = useState("new-to-old");
  const [filter, setFilter] = useState("all");
  const [statusChanged, setStatusChanged] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    // alert(currentTask.status)
    return () => {};
  }, [currentTask]);

  async function getTasks() {
    try {
      // alert(filter + " " + sort);
      const response = await axiosInstance.get("/employees/get-tasks", {
        params: { filter, sort },
      });
      const { tasks, success, name } = response.data;
      if (!success) {
        throw "";
      }
      // alert(name);
      setName(name);
      setTasklist([...tasks]);

      // alert(tasks.length);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error occurred");
    }
  }

  useEffect(() => {
    // alert(filter + " " + sort);
    getTasks();
  }, [filter, sort]);

  useEffect(() => {
    if (statusChanged) {
      getTasks();
      // alert("got status")
      setStatusChanged(false);
    }
  }, [statusChanged]);

  async function updateStatus() {
    try {
      // post taskId and status
      // alert(newStatus);
      const response = await axiosInstance.post("/employees/update-status", {
        taskId: currentTask._id,
        status: currentTask.status,
      });

      const { task, success } = response.data;

      if (!success) {
        throw "";
      }

      setStatusChanged(true);

      // alert(task.status);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error occurred");
    }
  }

  return (
    <div>
      <header className="sticky top-0 bg-zinc-50 p-4 z-10">
        {name ? (
          <div
            className="text-xl font-semibold transition-all duration-500 transform scale-100 opacity-100"
            style={{ animation: "fadeIn 0.5s ease-in-out" }}
          >
            Welcome, <span className="text-blue-500">{name}</span>!
          </div>
        ) : (
          <span className="animate-pulse flexbox bg-gray-400 rounded-full px-20 py-2 transition-all duration-500 transform scale-0 opacity-0"></span>
        )}
      </header>
      <div className="sticky top-0 z-20 px-0 mb-0">
        <Filters
          fetcher={getTasks}
          action={{ sort, filter }}
          changeAction={{ setSort, setFilter }}
        />
      </div>
      <TaskList tasks={taskList} setCurrentTask={setCurrentTask}>
        <UpdateStatus
          statusAction={{
            currentTask,
            setCurrentTask,
            updateStatus,
          }}
        />
      </TaskList>
    </div>
  );
};

export default Page;
