import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

const TopNavbar = ({ onSearch, searchQuery, onClearSearch }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Focus input when search opens
  useEffect(() => {
    if (showSearchInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchInput]);

  // Sync input with external search query
  useEffect(() => {
    if (searchQuery) {
      setInputValue(searchQuery);
      setShowSearchInput(true);
    }
  }, [searchQuery]);

  const handleSearchClick = () => {
    setShowSearchInput(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        onSearch(inputValue.trim());
      }
    } else if (e.key === 'Escape') {
      handleCloseSearch();
    }
  };

  const handleCloseSearch = () => {
    setShowSearchInput(false);
    setInputValue('');
    if (onClearSearch) {
      onClearSearch();
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />

      {showSearchInput ? (
        <div className="search-container">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search hashtags..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="search-close" onClick={handleCloseSearch}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ) : (
        <h2>
          Following <span>For You</span>
        </h2>
      )}

      <FontAwesomeIcon 
        icon={faSearch} 
        className="icon search-icon" 
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default TopNavbar;
