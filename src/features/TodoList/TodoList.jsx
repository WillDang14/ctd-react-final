import { useEffect, useState } from 'react';

import TodoListItem from './TodoListItem';

import styles from './TodoList.module.css';

import { useSearchParams, useNavigate } from 'react-router';

/* ============================================= */
/* 
Chú ý là không dùng "filteredTodoList" nữa mà vẫn dùng "todoList"

để show hết nội dung
*/
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

  // const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  // tự thêm vô
  const indexOfLastTodo = currentPage * itemsPerPage; // this is not mentioned in instruction

  // const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const totalPages = Math.ceil(todoList.length / itemsPerPage);

  // const currentEntries = filteredTodoList.slice(
  //   indexOfFirstTodo,
  //   indexOfLastTodo
  // );
  // console.log('filterTodos = ', filterTodos);

  // const currentEntries = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  // =====================================
  // let currentEntries;
  // if (filterTodos === 'all') {
  //   currentEntries = todoList.slice(indexOfFirstTodo, indexOfLastTodo);
  //   //
  // } else if (filterTodos === 'working') {
  //   const filteredWorking = todoList.filter((todo) => !todo.isCompleted);

  //   currentEntries = filteredWorking.slice(indexOfFirstTodo, indexOfLastTodo);
  //   //
  // } else if (filterTodos === 'done') {
  //   const filteredDone = todoList.filter((todo) => todo.isCompleted);

  //   currentEntries = filteredDone.slice(indexOfFirstTodo, indexOfLastTodo);
  // }
  // =====================================
  function filterTodoStatus(value) {
    switch (value) {
      case 'all':
        return todoList;

      case 'working': {
        const filteredWorking = todoList.filter((todo) => !todo.isCompleted);

        return filteredWorking;
      }

      case 'done': {
        const filteredDone = todoList.filter((todo) => todo.isCompleted);

        return filteredDone;
      }

      default:
        return [];
    }
  }

  const currentEntries = filterTodoStatus(filterTodos).slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }

    //
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
          Page {currentPage} of {totalPages}
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
