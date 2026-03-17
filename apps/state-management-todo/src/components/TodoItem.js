// src/components/TodoItem.js
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = memo(({ todo, onToggle, onDelete }) => {

  const isOverdue =
    todo.dueDate &&
    new Date(todo.dueDate) < new Date() &&
    !todo.done;
console.log(todo);

  return (
    <View style={styles.container}>

      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, todo.done && styles.checkboxDone]}
        onPress={() => onToggle(todo.id)}
      >
        {todo.done && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* 🔥 TEXT CONTAINER (FIX DI SINI) */}
      <View style={styles.textContainer}>
        <Text style={[styles.text, todo.done && styles.textDone]}>
          {todo.text}
        </Text>

        {todo.dueDate && (
          <Text style={[
            styles.dueDate,
            isOverdue && styles.overdue
          ]}>
            Due: {todo.dueDate}
          </Text>
        )}
      </View>

      {/* Hapus */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  checkboxDone: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  },

  // 🔥 container tengah
  textContainer: {
    flex: 1,
  },

  text: {
    fontSize: 16,
    color: '#1E293B'
  },

  textDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8'
  },

  dueDate: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  overdue: {
    color: 'red',
    fontWeight: 'bold'
  },

  deleteBtn: {
    padding: 6
  },

  deleteText: {
    color: '#F97316',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default TodoItem;