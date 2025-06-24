/* ================================================ */
export const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',

  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',

  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',

  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',

  //reverts todos when requests fail
  revertTodo: 'revertTodo',

  //action on Dismiss Error button
  clearError: 'clearError',

  //
  sortDirection: 'sortDirection',
  sortField: 'sortField',
  queryString: 'queryString',

  //
  filterTodos: 'filterTodos',
};

/* ================================================ */
export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  sortField: 'createdTime',
  sortDirection: 'desc',
  queryString: '',
  filterTodos: 'all',
};

/* ================================================ */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case actions.loadTodos: {
      const fetchedRecords = action.records.map((record) => {
        //
        const todo = {
          id: record.id,
          title: record.fields.title,
          isCompleted: record.fields.isCompleted,
          createdTime: new Date(record.fields.createdTime).toLocaleString(),
          lastModified: new Date(record.fields.lastModified).toLocaleString(),
        };

        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }

        return todo;
      });

      // console.log('loadTodos fetchedRecords', fetchedRecords);

      return {
        ...state,
        isLoading: false,
        todoList: [...fetchedRecords],
      };
    }

    case actions.setLoadError:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
      };

    /* ================================================ */
    case actions.startRequest: {
      return {
        ...state,
        isSaving: true,
      };
    }

    case actions.addTodo: {
      // Added for Final project
      // New created todo will always stay on the top on Array
      // regardless sorting/filtering
      const updatedTodo = {
        id: action.records[0].id,
        title: action.records[0].fields.title,
        isCompleted: !action.records[0].fields.isCompleted ? false : true,
        createdTime: new Date(
          action.records[0].fields.createdTime
        ).toLocaleString(),
        lastModified: new Date(
          action.records[0].fields.lastModified
        ).toLocaleString(),
      };

      return {
        ...state,
        isSaving: false,
        todoList: [updatedTodo, ...state.todoList],
      };
    }

    case actions.endRequest: {
      // console.log('endRequest state = ', state);

      return {
        ...state,
        isSaving: false,
        isLoading: false,
      };
    }

    /* ================================================ */
    case actions.updateTodo: {
      // console.log('updateTodos = ', action.updatedTodos);

      return {
        ...state,
        isSaving: false,
        todoList: action.updatedTodos,
      };
    }

    case actions.completeTodo: {
      return {
        ...state,
        isSaving: false,
        todoList: action.updatedTodos,
      };
    }

    case actions.revertTodo:
      return {
        ...state,
        isSaving: false,
        errorMessage: `${action.error.message}. Reverting todo...`,
      };

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    /* ================================================ */
    case actions.sortDirection: {
      return {
        ...state,
        sortDirection: action.sortDirection,
      };
    }

    case actions.sortField: {
      return {
        ...state,
        sortField: action.sortField,
      };
    }

    case actions.queryString: {
      return {
        ...state,
        queryString: action.queryString,
      };
    }

    /* ================================================ */
    case actions.filterTodos: {
      console.log('action.filterTodos = ', action.filterTodos);

      return {
        ...state,
        filterTodos: action.filterTodos,
      };
    }
    /* ================================================ */
    default:
      return state;
  }
}

/* ================================================ */
