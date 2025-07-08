import React from "react";
import Select from "react-select";
import { AiOutlineSearch, AiOutlineFilter, AiOutlineClear } from "react-icons/ai";
import "./style.css";

export const sortOptions = [
  { value: "price", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '48px',
    border: state.isFocused ? '2px solid var(--primary-color)' : '1px solid var(--gray-300)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: state.isFocused ? '0 0 0 3px var(--primary-color-alpha)' : 'none',
    backgroundColor: 'var(--white)',
    transition: 'all var(--transition-base)',
    '&:hover': {
      borderColor: 'var(--primary-color)',
    }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--white)',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1000,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? 'var(--primary-color)' 
      : state.isFocused 
        ? 'var(--primary-color-alpha)' 
        : 'transparent',
    color: state.isSelected ? 'var(--white)' : 'var(--gray-900)',
    '&:hover': {
      backgroundColor: state.isSelected ? 'var(--primary-color)' : 'var(--primary-color-alpha)',
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--gray-900)',
    fontWeight: 'var(--font-medium)',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--gray-500)',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'var(--gray-500)',
    transition: 'all var(--transition-base)',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
  clearIndicator: (base) => ({
    ...base,
    color: 'var(--gray-500)',
    '&:hover': {
      color: 'var(--red-500)',
    }
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--primary-color-alpha)',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--primary-color)',
    fontWeight: 'var(--font-medium)',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--primary-color)',
    '&:hover': {
      backgroundColor: 'var(--red-500)',
      color: 'var(--white)',
    }
  })
};

const Filter = ({ filters, handleFilters, categoryOptions }) => {
  const hasActiveFilters = filters.sort || filters.category || filters.search;

  const clearAllFilters = () => {
    handleFilters("sort", null);
    handleFilters("category", null);
    handleFilters("search", "");
  };

  return (
    <div className="filters-sidebar">
      <div className="filters-header">
        <div className="filters-header-icon">
          <AiOutlineFilter size={20} />
        </div>
        <h3 className="filters-title">Filters</h3>
        {hasActiveFilters && (
          <button 
            className="clear-filters-btn"
            onClick={clearAllFilters}
            title="Clear all filters"
          >
            <AiOutlineClear size={16} />
          </button>
        )}
      </div>

      <div className="filters-content">
        {/* Search Filter */}
        <div className="filter-group">
          <label className="filter-label">
            <AiOutlineSearch size={16} />
            Search Products
          </label>
          <div className="search-input-wrapper">
            <input
              className="search-input"
              placeholder="Search products..."
              value={filters.search}
              onChange={(event) => handleFilters("search", event.target.value)}
            />
            <AiOutlineSearch className="search-icon" size={18} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <Select
            options={categoryOptions}
            styles={customSelectStyles}
            onChange={(selectedOption) => {
              handleFilters("category", selectedOption?.value || null);
            }}
            value={categoryOptions.find((option) => option.value === filters.category) || null}
            isClearable={true}
            placeholder="All categories"
            noOptionsMessage={() => "No categories available"}
          />
        </div>

        {/* Sort Filter */}
        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <Select
            options={sortOptions}
            styles={customSelectStyles}
            onChange={(selectedOption) => {
              handleFilters("sort", selectedOption?.value || null);
            }}
            value={sortOptions.find((option) => option.value === filters.sort) || null}
            isClearable={true}
            placeholder="Default sorting"
            noOptionsMessage={() => "No sorting options available"}
          />
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="active-filters">
            <h4 className="active-filters-title">Active Filters</h4>
            <div className="active-filters-list">
              {filters.search && (
                <div className="active-filter-tag">
                  <span>Search: "{filters.search}"</span>
                  <button 
                    onClick={() => handleFilters("search", "")}
                    className="remove-filter-btn"
                  >
                    ×
                  </button>
                </div>
              )}
              {filters.category && (
                <div className="active-filter-tag">
                  <span>Category: {filters.category}</span>
                  <button 
                    onClick={() => handleFilters("category", null)}
                    className="remove-filter-btn"
                  >
                    ×
                  </button>
                </div>
              )}
              {filters.sort && (
                <div className="active-filter-tag">
                  <span>Sort: {sortOptions.find(opt => opt.value === filters.sort)?.label}</span>
                  <button 
                    onClick={() => handleFilters("sort", null)}
                    className="remove-filter-btn"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
