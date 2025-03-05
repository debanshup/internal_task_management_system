import React from "react";

const Search = ({ queryAction }) => {
 const { query, setQuery } = queryAction;
  return (
    <form className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or profession"
          className="flex-1 text-center p-3 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-200"
        />
        {/* Search Button */}
        {/* <button
          type="submit"
          className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button> */}
      </div>
    </form>
  );
};

export default Search;
