import { useState, useEffect } from 'react';

import TextInputWithLabel from '../../shared/TextInputWithLabel';

import styles from './TodoListItem.module.css';

/* ============================================================ */
function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  // console.log(todo);

  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setWorkingTitle(todo.title);

    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!isEditing) return;

    onUpdateTodo({ ...todo, title: workingTitle });

    setIsEditing(false);
  }

  return (
    <li className={styles.listItem}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <div className="todo-edit">
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>

            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </div>
        ) : (
          <>
            <div className="todo-contents">
              <label>
                <input
                  type="checkbox"
                  id={`checkbox${todo.id}`}
                  checked={todo.isCompleted}
                  onChange={() => onCompleteTodo(todo.id)}
                />
              </label>

              <span
                className={todo.isCompleted ? styles.done : ''}
                onClick={() => setIsEditing(true)}
              >
                {todo.title}
              </span>
            </div>

            <div className="todo-actions">
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>

              <button type="button" onClick={() => onDeleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </form>

      <div className={styles.dateTime}>
        <p>Created At: {todo.createdTime}</p>
        <p>Last Modified: {todo.lastModified}</p>
      </div>
    </li>
  );
}

/* ============================================================ */
export default TodoListItem;
