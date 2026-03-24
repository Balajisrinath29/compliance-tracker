import { useState, useEffect } from 'react';
import './App.css';
import ClientList from './components/ClientList';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import SummaryStats from './components/SummaryStats';

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({ status: 'all', category: 'all', search: '' });
  const [loading, setLoading] = useState(false);

  // Fetch clients on mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch tasks when client is selected
  useEffect(() => {
    if (selectedClient) {
      fetchTasks(selectedClient.id);
    } else {
      setTasks([]);
    }
  }, [selectedClient]);

  // Apply filters to tasks
  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchTasks = async (clientId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/clients/${clientId}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = tasks;

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search)
      );
    }

    setFilteredTasks(filtered);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskStatusUpdated = async (taskId, newStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const isOverdue = (task) => {
    return new Date(task.due_date) < new Date() && task.status === 'pending';
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Compliance Tracker</h1>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <h2>Clients</h2>
          <ClientList
            clients={clients}
            selectedClient={selectedClient}
            onSelectClient={setSelectedClient}
          />
        </aside>

        <main className="content">
          {selectedClient ? (
            <>
              <div className="client-header">
                <h2>{selectedClient.company_name}</h2>
                <p className="client-meta">{selectedClient.country} • {selectedClient.entity_type}</p>
              </div>

              <SummaryStats tasks={tasks} isOverdue={isOverdue} />

              <TaskForm
                clientId={selectedClient.id}
                onTaskAdded={handleTaskAdded}
              />

              <TaskFilter
                filters={filters}
                onFilterChange={setFilters}
                tasks={tasks}
              />

              {loading ? (
                <div className="loading">Loading tasks...</div>
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  onStatusChange={handleTaskStatusUpdated}
                  isOverdue={isOverdue}
                />
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>Select a client to view and manage tasks</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
