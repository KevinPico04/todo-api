import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';

const API_URL = 'https://todo-api-production-2863.up.railway.app';

function App() {
  const { t, i18n } = useTranslation();
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      const todosWithCompleted = res.data.map(todo => ({ ...todo, completed: false }));
      setTodos(todosWithCompleted);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(`${API_URL}/todos`, { task });
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

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
    <div className="container">
      <h1>{t('title')}</h1>
      <div className="stats">
        <div>{t('totalTasks')}: <strong>{totalTasks}</strong></div>
        <div>{t('pendingTasks')}: <strong>{pendingTasks}</strong></div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>

      <div className="add-task">
        <input
          type="text"
          placeholder={t('addTaskPlaceholder')}
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addTask(); }}
        />
        <button onClick={addTask}>{t('addTaskButton')}</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.task}
            </span>
            <div className="buttons">
              <button
                className="delete-btn"
                onClick={() => deleteTask(todo.id)}
                aria-label={t('delete')}
                title={t('delete')}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
