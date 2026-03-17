// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodos } from '../hooks/useTodos';
import { useFilter } from '../hooks/useFilter';
import AddTodoForm from '../components/AddTodoForm';
import TodoItem from '../components/TodoItem';
import FilterBar from '../components/FilterBar';

const HomeScreen = () => {
 // Custom hook untuk filter
 const { activeFilter, setFilter, FILTERS } = useFilter();

 // Custom hook untuk semua todo operations
 const {
    todos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
 } = useTodos(activeFilter);

 return (
    <SafeAreaView style={styles.safe}>
        <StatusBar barStyle='light-content' backgroundColor='#0F172A' />
        <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
         <Text style={styles.title}>My Todos</Text>
         <Text style={styles.subtitle}>
            {stats.completed} dari {stats.total} selesai
         </Text>
        </View>

        {/* Form tambah todo */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filter bar */}
        <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setFilter}
            stats={stats}
        />

        {/* Daftar todo */}
        <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TodoItem
                    todo={item}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                />
            )}
            ListEmptyComponent={(
                <Text style={styles.emptyText}>
                    Tidak ada todo{' '}
                    {activeFilter !== 'all' ? `dengan filter '${activeFilter}'` : ''}
                </Text>
            )}
            showsVerticalScrollIndicator={false}
        />

        {/* Clear done button */}
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
 safe: { flex: 1, backgroundColor: '#0F172A' },
 container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
 header: { marginBottom: 24, paddingTop: 8 },
 title: {
 fontSize: 32,
 fontWeight: 'bold',
 color: '#0F172A',
 marginBottom: 4,
 },
 subtitle: { fontSize: 14, color: '#64748B' },
 emptyText: {
 textAlign: 'center',
 color: '#94A3B8',
 marginTop: 60,
 fontSize: 16,
 },
 clearBtn: {
 textAlign: 'center',
 color: '#F97316',
 padding: 12,
 fontSize: 14,
 },
});

export default HomeScreen;