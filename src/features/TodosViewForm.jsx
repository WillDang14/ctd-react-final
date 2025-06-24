import { useState, useEffect } from 'react';

import styled from 'styled-components';

// new reuse component
import SelectInputWithLabel from '../shared/SelectInputWithLabel';

/* ============================================= */
function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
  filterTodos,
  setFilterTodos,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    //
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setLocalQueryString]);

  function preventRefresh(event) {
    event.preventDefault();
    // console.log('TodosViewForm value: ', event.target.value); // undefined
  }

  return (
    <StyledForm onSubmit={preventRefresh}>
      <div className="search">
        <label htmlFor="search">Search todos:</label>

        <input
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        />

        <button
          onClick={() => {
            setLocalQueryString('');
          }}
        >
          Clear
        </button>
      </div>

      {/* Added for Final project */}
      <div className="sortFilter">
        <SelectInputWithLabel
          labelText="Sort by"
          elementId="sortby"
          value={sortField}
          onChange={(e) => {
            setSortField(e.target.value);
          }}
          optionsData={[
            { value: 'title', label: 'Title' },
            { value: 'createdTime', label: 'Time added' },
            { value: 'lastModified', label: 'Last Modified' },
          ]}
        />

        <SelectInputWithLabel
          labelText="Direction"
          elementId="direction"
          value={sortDirection}
          onChange={(e) => {
            setSortDirection(e.target.value);
          }}
          optionsData={[
            { value: 'desc', label: 'Descending' },
            { value: 'asc', label: 'Ascending' },
          ]}
        />

        <SelectInputWithLabel
          labelText="Filter Todo by"
          elementId="filteredTodos"
          value={filterTodos}
          onChange={(e) => {
            setFilterTodos(e.target.value);
          }}
          optionsData={[
            { value: 'all', label: 'All' },
            { value: 'done', label: 'Done' },
            { value: 'working', label: 'On Working' },
          ]}
        />
      </div>
    </StyledForm>
  );
}

/* ============================================= */

const StyledForm = styled.form`
  & div {
    margin: 20px 0;
  }

  & div.sortFilter {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    grid-template-rows: repeat(2, 1fr);

    grid-column-gap: 10px;

    grid-row-gap: 10px;

    & > div {
      margin: 0;

      display: flex;
      align-items: center;
    }
  }

  & div.sortFilter div:nth-child(3) {
    grid-column: span 2 / span 2;

    justify-content: center;
  }

  & input {
    padding: 8px 14px;
    margin: 0 10px;
  }

  & button {
    padding: 8px 14px;
    transition: 0.2s;
  }

  & button:hover {
    background: #a7a7a7;
  }

  & label {
    margin-right: 5px;
  }

  & label[for='search'] {
    margin-right: 0px;
  }

  select {
    border: 2px solid #ddd;
    padding: 4px 10px;
    background: #efefef;
    transition: 0.3s;
  }

  select:hover,
  select:focus {
    background: #a7a7a7;
  }
`;

/* ============================================= */
export default TodosViewForm;

/* 
<div>
  <label htmlFor="sortby">Sort by:</label>

  <select
    id="sortby"
    value={sortField}
    onChange={(e) => {
      setSortField(e.target.value);
    }}
  >
    <option value="title">Title</option>
    <option value="createdTime">Time added</option>
  </select>
</div>

<div>
  <label htmlFor="direction">Direction:</label>

  <select
    id="direction"
    value={sortDirection}
    onChange={(e) => {
      setSortDirection(e.target.value);
    }}
  >
    <option value="desc">Descending</option>
    <option value="asc">Ascending</option>
  </select>
</div>

<div>
  <label htmlFor="filteredTodos">Filter Todo by:</label>
  <select
    id="filteredTodos"
    value={filterTodos}
    onChange={(e) => {
      setFilterTodos(e.target.value);
    }}
  >
    <option value="all">All</option>
    <option value="done">Done</option>
    <option value="working">On Working</option>
  </select>
</div> 
*/
