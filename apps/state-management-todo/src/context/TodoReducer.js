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

// Reducer = pusat semua perubahan state
// Semua logic manipulasi todo DIKUNCI di sini biar predictable & scalable
export const todoReducer = (state, action) => {
 switch (action.type) {

    case ACTIONS.ADD_TODO:
   // Guard clause → mencegah todo kosong masuk state
  // Ini penting biar data tetap valid dari awal
  if (!action.payload.text.trim()) return state;

  return [
    ...state,
    {
        // Date.now dipakai karena simple unique id generator
      // (cukup aman untuk skala kecil, tapi bukan best practice di production)
      id: Date.now().toString(),

      // trim lagi untuk safety → double validation
      text: action.payload.text.trim(),

      // nullable → optional feature (deadline)
      dueDate: action.payload.dueDate,

      // fallback ke medium → jaga konsistensi data
      priority: action.payload.priority || 'medium',
      done: false,

      // timestamp → useful kalau nanti mau sorting by created time
      createdAt: new Date().toISOString(),
    }
  ];

    case ACTIONS.TOGGLE_TODO:
        // Immutable update → penting di React biar re-render ke trigger
        return state.map(todo =>
            todo.id === action.id
            ? { ...todo, done: !todo.done }
            : todo
    );

    case ACTIONS.SET_TODOS_ORDER:
        // Digunakan saat drag & drop → replace seluruh urutan
        return action.payload;

    case ACTIONS.DELETE_TODO:
        // Filter = cara paling clean untuk remove item
        return state.filter(todo => todo.id !== action.id);

    case ACTIONS.EDIT_TODO:
        // Partial update → hanya ubah field tertentu
        return state.map(todo =>
            todo.id === action.id
                ? { ...todo, text: action.payload }
            : todo
        );

    case ACTIONS.CLEAR_DONE:
        // Bulk operation → remove semua yang selesai
        return state.filter(todo => !todo.done);
            default:
        return state; // Selalu ada default!

    case ACTIONS.SET_TODOS:
        // Digunakan saat load dari storage
        return action.payload;

  }
};