import React, { useState } from "react";
import "./SearchBar.css";
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (e) => {
      console.log("e", e);
      console.log("e.target.value", e.target.value);
      onSearch(e.target.value);
      setSearchTerm(e.target.value);
    };
  
    return (
      <>
        <input
          id="search"
          type="text"
          placeholder="🔎Search textbooks..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </>
    );
  };
  
  export default SearchBar;