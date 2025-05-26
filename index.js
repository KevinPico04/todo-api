const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let idCounter = 1;

// Crear tarea
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task required' });
  const todo = { id: idCounter++, task };
  todos.push(todo);
  res.status(201).json(todo);
});

// Listar tareas
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Borrar tarea
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === initialLength) return res.status(404).json({ error: 'Todo not found' });
  res.json({ message: 'Deleted' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
