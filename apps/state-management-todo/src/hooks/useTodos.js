// src/hooks/useTodos.js

import { useTodoContext } from '../context/TodoContext';
import { useMemo } from 'react';

export const useTodos = (filter = 'all') => {
 const { todos, addTodo, toggleTodo, deleteTodo, clearDone, reorderTodos  } = useTodoContext();

 // Memo → mencegah recalculation tiap render
 const filteredTodos = useMemo(() => {
    switch (filter) {
        case 'active': return todos.filter(t => !t.done);
        case 'completed': return todos.filter(t => t.done);
        default: return todos;
    }
 }, [todos, filter]);

  // Derived state → bukan disimpan, tapi dihitung
 const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.done).length,
    completed: todos.filter(t => t.done).length,
 }), [todos])

 const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1
};

// Sorting logic = decision engine
const sortedTodos = [...filteredTodos].sort((a, b) => {
  const now = new Date();

   // Convert ke Date object
  const dateA = a.dueDate ? new Date(a.dueDate) : null;
  const dateB = b.dueDate ? new Date(b.dueDate) : null;

  // Hitung jarak deadline ke sekarang (dalam hari)
  const diffA = dateA ? (dateA - now) / (1000 * 60 * 60 * 24) : Infinity;
  const diffB = dateB ? (dateB - now) / (1000 * 60 * 60 * 24) : Infinity;

  // Urgent = <= 2 hari → diprioritaskan
  const isUrgentA = diffA <= 2;
  const isUrgentB = diffB <= 2;

  // Step 1: Urgent dulu
  if (isUrgentA && !isUrgentB) return -1;
  if (!isUrgentA && isUrgentB) return 1;

  // Step 2: Priority
  const priorityDiff =
    priorityOrder[b.priority || 'medium'] -
    priorityOrder[a.priority || 'medium'];

  if (priorityDiff !== 0) return priorityDiff;

  // Step 3: Deadline terdekat
  return (dateA || Infinity) - (dateB || Infinity);
});

 return {
    todos: sortedTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    reorderTodos,
 };
};