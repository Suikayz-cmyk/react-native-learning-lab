// src/context/TodoContext.js

import React, {
 createContext,
 useContext,
 useReducer,
 useEffect,
 useCallback
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todoReducer, ACTIONS } from './TodoReducer';

// Context = cara share state ke seluruh component tanpa prop drilling
const TodoContext = createContext(null);

const STORAGE_KEY = '@todos';

export const TodoProvider = ({ children }) => {
 const [todos, dispatch] = useReducer(todoReducer, []);

 // Load pertama kali → hydration dari local storage
 useEffect(() => {
    const loadTodos = async () => {
    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: ACTIONS.SET_TODOS, payload: parsed });
    }
    } catch (error) {
           console.error('Error loading todos:', error);
      }
    };
    loadTodos();
 }, []);

 // Sync otomatis ke storage setiap todos berubah
 // Ini bikin persistence "transparent"
 useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
        .catch(err => console.error('Error saving:', err));
 }, [todos]);

 // Action wrapper → biar komponen ga langsung dispatch (lebih clean)
 const addTodo = useCallback((text, dueDate, priority) => {
  dispatch({
    type: ACTIONS.ADD_TODO,
    payload: { text, dueDate, priority }
  });
}, []);

 const toggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, id });
 }, []);

 const deleteTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, id });
 }, []);

 const clearDone = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_DONE });
 }, [])

 const reorderTodos = useCallback((newOrder) => {
  dispatch({
    type: ACTIONS.SET_TODOS_ORDER,
    payload: newOrder,
  });
}, []);
    
 // Value yang dibagikan ke seluruh tree
 const value = {
    todos,
    dispatch,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    reorderTodos,
 };

 return (
    <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
 );
};

//Export custom hook untuk konsumsi
export const useTodoContext = () => {
 const context = useContext(TodoContext);
 if (!context) {
    throw new Error('useTodoContext harus digunakan dalam TodoProvider!');
 }
 return context;
};
