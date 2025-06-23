import TodoList from '../features/TodoList/TodoList';

import TodoForm from '../features/TodoForm';

import TodosViewForm from '../features/TodosViewForm';

/* ======================================== */
function TodosPage({
  todoState,
  todoActions,
  dispatch,
  handleAddTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
}) {
  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
        onDeleteTodo={deleteTodo}
        filterTodos={todoState.filterTodos}
      />

      <hr />

      <TodosViewForm
        sortDirection={todoState.sortDirection}
        setSortDirection={(sortDirection) =>
          dispatch({ type: todoActions.sortDirection, sortDirection })
        }
        sortField={todoState.sortField}
        setSortField={(sortField) =>
          dispatch({ type: todoActions.sortField, sortField })
        }
        queryString={todoState.queryString}
        setQueryString={(queryString) =>
          dispatch({ type: todoActions.queryString, queryString })
        }
        filterTodos={todoState.filterTodos}
        setFilterTodos={(filterTodos) =>
          dispatch({ type: todoActions.filterTodos, filterTodos })
        }
      />
    </div>
  );
}

/* ======================================== */
export default TodosPage;
