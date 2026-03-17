// src/screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTodos } from '../hooks/useTodos';
import { useFilter } from '../hooks/useFilter';

import AddTodoForm from '../components/AddTodoForm';
import TodoItem from '../components/TodoItem';
import FilterBar from '../components/FilterBar';
import { useTheme } from '../context/ThemeContext';


const HomeScreen = () => {
  // filter
  const { activeFilter, setFilter } = useFilter();

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // todos
  const {
    todos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    reorderTodos // 🔥 penting
  } = useTodos(activeFilter);

  return (
    <SafeAreaView style={[
    styles.safe,
    { backgroundColor: isDark ? '#0F172A' : '#0F172A' }
    ]}>
      <StatusBar barStyle='light-content' backgroundColor='#0F172A' />

      <View style={[
        styles.container,
        { backgroundColor: isDark ? '#020617' : '#F8FAFC' }
     ]}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[
            styles.title,
            { color: isDark ? '#FFFFFF' : '#0F172A' }
            ]}>My Todos</Text>
            
          <Text style={[
            styles.title,
            { color: isDark ? '#FFFFFF' : '#0F172A' }
            ]}>{stats.completed} dari {stats.total} selesai
          </Text>
        </View>

        <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
            <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={22}
                color={isDark ? '#FFD700' : '#0F172A'}
            />
        </TouchableOpacity>

        {/* Form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filter */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setFilter}
          stats={stats}
        />

        {/* 🔥 DRAGGABLE LIST */}
        <DraggableFlatList
          data={todos}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => reorderTodos(data)}
          renderItem={({ item, drag, isActive }) => (
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              style={{ opacity: isActive ? 0.8 : 1 }}
            >
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={(
            <Text style={styles.emptyText}>
              Tidak ada todo{' '}
              {activeFilter !== 'all'
                ? `dengan filter '${activeFilter}'`
                : ''}
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />

        {/* Clear done */}
        {stats.completed > 0 && (
          <Text style={styles.clearBtn} onPress={clearDone}>
            Hapus {stats.completed} item selesai
          </Text>
        )}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F172A'
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC'
  },

  header: {
  marginBottom: 24,
  paddingTop: 8,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B'
  },

  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 60,
    fontSize: 16
  },

 themeBtn: {
  padding: 8,
  borderRadius: 8,
 },

  clearBtn: {
    textAlign: 'center',
    color: '#F97316',
    padding: 12,
    fontSize: 14
  }
  
});

export default HomeScreen;