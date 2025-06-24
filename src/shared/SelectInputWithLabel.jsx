import React from 'react';

/* ============================================= */
const SelectInputWithLabel = ({
  labelText,
  elementId,
  value,
  onChange,
  optionsData,
}) => {
  return (
    <div>
      <label htmlFor={elementId}>{labelText}:</label>

      <select id={elementId} value={value} onChange={onChange}>
        {optionsData.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

/* ============================================= */
export default SelectInputWithLabel;
