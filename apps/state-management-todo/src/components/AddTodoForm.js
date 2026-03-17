// src/components/AddTodoForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddTodoForm = ({ onAdd }) => {
 const [text, setText] = useState('');

 const [dueDate, setDueDate] = useState('');
 
 const handleSubmit = () => {
    if (text.trim()) {
        onAdd(text, dueDate);
        setText(''); // Reset input
        setDueDate('');
    }
 };

 return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder='Tambahkan todo baru...'
            placeholderTextColor='#94A3B8'
            onSubmitEditing={handleSubmit}
            returnKeyType='done'
        />

        <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="Due date (YYYY-MM-DD)"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
 flexDirection: 'row',
 marginBottom: 16,
 gap: 8,
 },
 input: {
 flex: 1,
 backgroundColor: '#FFFFFF',
 borderRadius: 12,
 padding: 14,
 fontSize: 16,
 color: '#1E293B',
 borderWidth: 1,
 borderColor: '#E2E8F0',
 },
 button: {
 width: 52,
 height: 52,
 backgroundColor: '#38BDF8',
 borderRadius: 12,
 alignItems: 'center',
 justifyContent: 'center',
 },
 buttonText: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' },
});

export default AddTodoForm;