// src/context/TodoReducer.js

import { act } from "react";

export const ACTIONS = {
 ADD_TODO: 'ADD_TODO',
 TOGGLE_TODO: 'TOGGLE_TODO',
 DELETE_TODO: 'DELETE_TODO',
 EDIT_TODO: 'EDIT_TODO',
 CLEAR_DONE: 'CLEAR_DONE',
 SET_TODOS: 'SET_TODOS',
 SET_TODOS_ORDER: 'SET_TODOS_ORDER',
};

export const todoReducer = (state, action) => {
 switch (action.type) {

    case ACTIONS.ADD_TODO:
  if (!action.payload.text.trim()) return state;

  return [
    ...state,
    {
      id: Date.now().toString(),
      text: action.payload.text.trim(),
      dueDate: action.payload.dueDate,
      priority: action.payload.priority || 'medium',
      done: false,
      createdAt: new Date().toISOString(),
    }
  ];

    case ACTIONS.TOGGLE_TODO:
        return state.map(todo =>
            todo.id === action.id
            ? { ...todo, done: !todo.done }
            : todo
    );

    case ACTIONS.SET_TODOS_ORDER:
        return action.payload;

    case ACTIONS.DELETE_TODO:
        return state.filter(todo => todo.id !== action.id);

    case ACTIONS.EDIT_TODO:
        return state.map(todo =>
            todo.id === action.id
                ? { ...todo, text: action.payload }
            : todo
        );

    case ACTIONS.CLEAR_DONE:
        return state.filter(todo => !todo.done);
            default:
        return state; // Selalu ada default!

    case ACTIONS.SET_TODOS:
    return action.payload;
  }
};