import React from "react";
function Search({ term, searchKey }) {
  function handleChange(e) {
    searchKey(e.target.value);
  }
  return (
    <div>
      <input
        className="input-field"
        type="text"
        value={term}
        placeholder="Enter Book Name"
        onChange={handleChange}
      ></input>
    </div>
  );
}
export default Search;
