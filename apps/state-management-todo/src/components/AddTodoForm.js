// src/components/AddTodoForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text, formatDate(dueDate));
      setText('');
      setDueDate(null);
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔥 BARIS ATAS */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder='Tambahkan todo baru...'
          placeholderTextColor='#94A3B8'
          returnKeyType='done'
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 BARIS BAWAH (DATE PICKER) */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          {dueDate ? formatDate(dueDate) : 'Pilih tanggal deadline'}
        </Text>
      </TouchableOpacity>

      {/* 🔥 DATE PICKER */}
      {showPicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 16,
    gap: 10,
  },

  // 🔥 row atas (input + tombol)
  row: {
    flexDirection: 'row',
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

  buttonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },

  dateButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  dateText: {
    color: '#1E293B',
    fontSize: 14,
  },
});

export default AddTodoForm;