import React from "react";

const Filters = ({ action, changeAction, fetcher }) => {
  const { setSort, setFilter } = changeAction;
  const { sort, filter } = action;

  async function refreshHandler() {
    try {
      await fetcher();
    } catch (error) {
      alert(error.message);
    }
  }

  // useEffect(() => {
  //   fetcher();
  // }, []);

  // Handle sort order change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  return (
    <div className="p-6 w-full bg-zinc-50 flex flex-wrap items-center gap-6 justify-between">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 flex-1 flex items-center">
        Assigned Tasks
        <button
          onClick={refreshHandler}
          className="text-green bg-blue-500 text-white text-sm font-light ml-3 px-2 rounded-lg hover:bg-blue-600 "
        >
          Refresh
        </button>
      </h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Sort By Time */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto gap-2">
          <label className="text-sm font-medium text-gray-600">
            Sort by Time:
          </label>
          <select
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="new-to-old">New to Old</option>
            <option value="old-to-new">Old to New</option>
          </select>
        </div>

        {/* Filter By Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto gap-2">
          <label className="text-sm font-medium text-gray-600">
            Filter by Status:
          </label>
          <select
            value={filter}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
