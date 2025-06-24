import { useState, useEffect, useCallback, useMemo, useReducer } from 'react';

import './App.css';
import styles from './App.module.css';

import fetchOptions from './shared/FetchOptions';
import fetchPayload from './shared/FetchPayload';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

// week12
import TodosPage from './pages/TodosPage';
import About from './pages/About';
import NotFound from './pages/NotFound';

import Header from './shared/Header';
import { useLocation, Routes, Route } from 'react-router';

/* ====================================================================================== */
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

const token = `Bearer ${import.meta.env.VITE_PAT}`;

/* ====================================================================================== */
function App() {
  // week12
  const [title, setTitle] = useState('Todo List');

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  // Week9
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;

    let searchQuery = '';

    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH(LOWER("${todoState.queryString}"),LOWER({title}))`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);
  // console.log('encodeUrl = ', encodeUrl());

  // week12
  const location = useLocation();

  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    //
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      const options = fetchOptions('GET', token);

      try {
        const resp = await fetch(encodeUrl(), options);

        if (!resp.ok) {
          const status = resp.status;

          const { error } = await resp.json();
          // console.log('error = ', error);
          // console.log('errorMessage type = ', error.type);
          // console.log('errorMessage message = ', error.message);

          if (status === 404) {
            throw new Error(error);
          } else {
            throw new Error(error.message);
          }
        }

        const { records } = await resp.json();
        // console.log('useEffect Airtable records = ', records);

        dispatch({
          type: todoActions.loadTodos,
          records,
        });
      } catch (error) {
        console.log(error.message);

        //
        dispatch({
          type: todoActions.setLoadError,
          error,
        });
      } finally {
        console.log('useEffect completed');
      }
    };

    fetchTodos();
  }, [encodeUrl]);

  // week12
  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Todo List');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else {
      setTitle('Not Found');
    }
  }, [location]);

  ///////////////////////////////////////////////////////////////////////////////////
  async function handleAddTodo(newTodo) {
    const payload = fetchPayload(newTodo, false);

    const options = fetchOptions('POST', token, payload);

    try {
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        const status = resp.status;

        const { error } = await resp.json();

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      // return the todo which have just added
      const { records } = await resp.json();
      // console.log('new records = ', records);

      dispatch({
        type: todoActions.addTodo,
        records,
      });
    } catch (error) {
      //
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    } finally {
      console.log('handleAddTodo End!');

      dispatch({
        type: todoActions.endRequest,
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  async function completeTodo(todoId) {
    const originalTodo = todoState.todoList.find((todo) => todo.id === todoId);

    const payload = fetchPayload(
      originalTodo.title,
      !originalTodo.isCompleted,
      originalTodo.id
    );

    const options = fetchOptions('PATCH', token, payload);

    try {
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        const status = resp.status;

        const { error } = await resp.json();

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      // return only record which have just updated
      const { records } = await resp.json();
      // console.log('completeTodo records = ', records);

      const updatedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: !records[0].fields.isCompleted ? false : true,
        createdTime: new Date(records[0].fields.createdTime).toLocaleString(),
        lastModified: new Date(records[0].fields.lastModified).toLocaleString(),
      };

      const updatedTodos = todoState.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }

        return todo;
      });

      dispatch({
        type: todoActions.completeTodo,
        updatedTodos,
      });

      //
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: todoActions.revertTodo,
        error,
      });
    } finally {
      console.log('completeTodo End!');
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  async function updateTodo(editedTodo) {
    const payload = fetchPayload(
      editedTodo.title,
      editedTodo.isCompleted,
      editedTodo.id
    );

    const options = fetchOptions('PATCH', token, payload);

    try {
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        const status = resp.status;

        const { error } = await resp.json();

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      // return only record has just updated
      const { records } = await resp.json();
      // console.log('updateTodo records = ', records);

      const updatedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: !records[0].fields.isCompleted ? false : true,
        createdTime: new Date(records[0].fields.createdTime).toLocaleString(),
        lastModified: new Date(records[0].fields.lastModified).toLocaleString(),
      };

      const updatedTodos = todoState.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }

        return todo;
      });

      //
      dispatch({
        type: todoActions.updateTodo,
        updatedTodos,
      });
      //
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: todoActions.revertTodo,
        error,
      });
    } finally {
      console.log('updateTodo End!');
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  async function deleteTodo(todoId) {
    const originalTodo = todoState.todoList.find((todo) => todo.id === todoId);
    // console.log('originalTodo = ', originalTodo);

    const urlDelete = encodeURI(`${url}/${todoId}`);

    const options = fetchOptions('Delete', token);

    try {
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(urlDelete, options);

      if (!resp.ok) {
        const status = resp.status;

        const { error } = await resp.json();

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      const record = await resp.json();
      //console.log('Delete data = ', record); // record = {deleted: true, id: 'recoAtWwa3OGtHLLN'}

      if (record.deleted) {
        //
        const updatedTodos = todoState.todoList.filter(
          (todo) => todo.id !== record.id
        );

        dispatch({
          type: todoActions.updateTodo,
          updatedTodos,
        });
      }

      //
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: todoActions.revertTodo,
        error,
      });
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.container}>
      <Header title={title} />

      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todoState={todoState}
              todoActions={todoActions}
              dispatch={dispatch}
              handleAddTodo={handleAddTodo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {todoState.errorMessage ? (
        <>
          <hr />
          <div className={styles.error_message}>
            <p>{todoState.errorMessage}</p>

            <button onClick={() => dispatch({ type: todoActions.clearError })}>
              Dismiss Error Message
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ============================================= */
export default App;
