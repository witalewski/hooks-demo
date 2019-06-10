import React, { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = { todos: null, nextTodoId: 0, newTodoLabel: "" };

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        ...state,
        todos: action.payload,
        nextTodoId: action.payload.length
      };
    case "add":
      return {
        todos: [
          ...state.todos,
          {
            id: state.nextTodoId,
            label: state.newTodoLabel,
            done: false
          }
        ],
        nextTodoId: state.nextTodoId + 1,
        newTodoLabel: ""
      };
    case "remove":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case "markAsDone":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, done: true } : todo
        )
      };
    case "markAsNotDone":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, done: false } : todo
        )
      };
    case "updateLabel":
      return {
        ...state,
        newTodoLabel: action.payload
      };
    default:
      return state;
  }
}

export const TodoListFunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos, newTodoLabel } = state;

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json"
      )
      .then(({ data }) => dispatch({ type: "reset", payload: data }));
  }, []);

  return todos ? (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={({ target }) =>
                dispatch({
                  type: target.checked ? "markAsDone" : "markAsNotDone",
                  payload: todo.id
                })
              }
              label={todo.label}
            />
            <span className={todo.done ? "done" : ""}>{todo.label}</span>
            <button
              onClick={() =>
                dispatch({
                  type: "remove",
                  payload: todo.id
                })
              }
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="new-todo">
        <input
          type="text"
          value={newTodoLabel}
          onChange={({ target }) =>
            dispatch({
              type: "updateLabel",
              payload: target.value
            })
          }
        />
        <button onClick={() => dispatch({ type: "add" })}>Add</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
