import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDatabase, getClients, getTasks, addTask, updateTaskStatus } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Get all clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks for a client
app.get('/api/clients/:clientId/tasks', async (req, res) => {
  try {
    const { clientId } = req.params;
    const tasks = await getTasks(clientId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { clientId, title, description, category, dueDate, priority } = req.body;
    
    if (!clientId || !title || !category || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const task = await addTask({
      clientId,
      title,
      description,
      category,
      dueDate,
      priority: priority || 'medium'
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status
app.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const task = await updateTaskStatus(taskId, status);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from frontend build
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = join(__dirname, '../frontend/dist');

app.use(express.static(buildPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(buildPath, 'index.html'));
  }
});

// Initialize database and start server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
