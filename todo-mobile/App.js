import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './i18n';

const API_URL = 'https://todo-api-production-2863.up.railway.app';

export default function App() {
  const { t, i18n } = useTranslation();

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      // Inicializamos completado en false, ya que backend no lo guarda
      const todosWithCompleted = res.data.map(todo => ({ ...todo, completed: false }));
      setTodos(todosWithCompleted);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(`${API_URL}/todos`, { task });
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Cambiar completado solo localmente
  const toggleCompleted = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const totalTasks = todos.length;
  const pendingTasks = todos.filter(todo => !todo.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}</Text>

      <View style={styles.stats}>
        <Text>{t('totalTasks')}: <Text style={{ fontWeight: 'bold' }}>{totalTasks}</Text></Text>
        <Text>{t('pendingTasks')}: <Text style={{ fontWeight: 'bold' }}>{pendingTasks}</Text></Text>
      </View>

      <View style={styles.langButtons}>
        <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage('es')}>
          <Text style={styles.langButtonText}>{t('spanish')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage('en')}>
          <Text style={styles.langButtonText}>{t('english')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage('pt')}>
          <Text style={styles.langButtonText}>{t('portuguese')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('addTaskPlaceholder')}
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>{t('addTaskButton')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleCompleted(item.id)} style={styles.checkbox}>
              {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
            </TouchableOpacity>
            <Text style={[styles.todoText, item.completed && styles.completed]}>
              {item.task}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebe3',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#66577c',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 16,
    color: '#7a6f8a',
  },
  langButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  langButton: {
    backgroundColor: '#b295d6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  langButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addTaskContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    backgroundColor: '#faf6ff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d3c0e8',
    color: '#4a4a4a',
  },
  addButton: {
    backgroundColor: '#b295d6',
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  todoItem: {
    backgroundColor: '#f4e9ff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#9e8fb1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#b295d6',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkmark: {
    color: '#b295d6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  todoText: {
    color: '#66577c',
    fontSize: 16,
    flexShrink: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#a99bd1',
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#de6f74',
    borderRadius: 20,
    padding: 10,
    marginLeft: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
