import { useEffect, useState, useCallback, useMemo } from 'react';

import TodoListItem from './TodoListItem';

import styles from './TodoList.module.css';

import { useSearchParams, useNavigate } from 'react-router';

/* ============================================= */
function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  onDeleteTodo,
  filterTodos,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(5);

  function filterTodoStatus(value) {
    switch (value) {
      case 'working': {
        return todoList.filter((todo) => !todo.isCompleted);
      }

      case 'done': {
        return todoList.filter((todo) => todo.isCompleted);
      }

      default:
        return todoList;
    }
  }

  const filteredTodoList = filterTodoStatus(filterTodos);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  const indexOfLastTodo = currentPage * itemsPerPage;

  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  const currentEntries = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams((searchParams) => {
        searchParams.set('page', currentPage - 1);
        return searchParams;
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams((searchParams) => {
        searchParams.set('page', currentPage + 1);
        return searchParams;
      });
    }
  };

  function todosPerPage(e) {
    e.preventDefault();

    setItemsPerPage(e.target[0].value);
  }

  return (
    <>
      <ul className={styles.list_container}>
        {isLoading ? (
          <p>Todo list loading...</p>
        ) : todoList.length === 0 ? (
          <div>
            <p>Todo list is empty!</p>
            <p>Need to add new tasks to list.</p>
          </div>
        ) : (
          currentEntries.map((todo) => (
            <TodoListItem
              todo={todo}
              key={todo.id}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))
        )}
      </ul>

      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages === 0 ? '1' : totalPages}
        </span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>

        <select
          id="select-box"
          value={itemsPerPage}
          onChange={(e) => {
            console.log('select = ', e.target.value);

            setItemsPerPage(e.target.value);
          }}
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="15">15 / page</option>
          <option value="20">20 / page</option>
        </select>
      </div>

      <form className={styles.paginationControls} onSubmit={todosPerPage}>
        <label htmlFor="quantity">Todos per page (max=20):</label>

        <input type="number" id="quantity" name="quantity" min="1" max="20" />

        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================================= */
export default TodoList;
