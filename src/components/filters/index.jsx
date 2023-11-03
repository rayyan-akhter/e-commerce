import React from "react";
import Select from "react-select";
import "./style.css";

export const sortOptions = [
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
];

const customStyle = {
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
};

const Filter = ({ filters, handleFilters, categoryOptions }) => {
  return (
    <div className="filters">
      <div className="containers">
        <div className="heading">
          <p>Sort :</p>
        </div>
        <div className="App">
          <Select
            options={sortOptions}
            openMenuOnFocus
            styles={customStyle}
            onChange={(selectedOption) => {
              if (!selectedOption) handleFilters("sort", null);
              else handleFilters("sort", selectedOption.value);
            }}
            className="custom-react-select"
            value={sortOptions.find((option) => option.value === filters.sort)}
            isClearable={true}
          />
        </div>
      </div>

      <div className="containers">
        <div className="heading">
          <p>Categories :</p>
        </div>
        <div className="App">
          <Select
            options={categoryOptions}
            openMenuOnFocus
            styles={customStyle}
            onChange={(selectedOption) => {
              if (!selectedOption) handleFilters("category", null);
              else handleFilters("category", selectedOption.value);
            }}
            isClearable={true}
            className="custom-react-select"
          />
        </div>
      </div>

      <div className="containers">
        <div className="heading">
          <p>Search :</p>
        </div>
        
        <input
          className="search"
          placeholder="What are you looking for ?"
          onChange={(event) => handleFilters("search", event.target.value)}
        />
      </div>
    </div>
  );
};

export default Filter;
