import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./compliance.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database schema
export function initDatabase() {
  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');

  // Clients table
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      country TEXT,
      entity_type TEXT
    )
  `);

  // Tasks table
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      due_date TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'medium',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id)
    )
  `);

  // Seed data
  seedDatabase();
}

// Seed database with sample data
function seedDatabase() {
  db.get('SELECT COUNT(*) as count FROM clients', (err, row) => {
    if (err) {
      console.error('Error checking clients:', err);
      return;
    }

    if (row.count === 0) {
      // Insert sample clients
      const clients = [
        { company_name: 'Acme Corporation', country: 'USA', entity_type: 'LLC' },
        { company_name: 'Global Industries Inc', country: 'Canada', entity_type: 'Corp' },
        { company_name: 'Tech Solutions Ltd', country: 'UK', entity_type: 'Ltd' },
        { company_name: 'Finance Partners GmbH', country: 'Germany', entity_type: 'GmbH' }
      ];

      clients.forEach(client => {
        db.run(
          'INSERT INTO clients (company_name, country, entity_type) VALUES (?, ?, ?)',
          [client.company_name, client.country, client.entity_type]
        );
      });

      // Insert sample tasks
      const tasks = [
        { client_id: 1, title: 'Annual Tax Filing', description: 'File annual tax returns', category: 'Tax', due_date: '2026-04-15', status: 'pending', priority: 'high' },
        { client_id: 1, title: 'Quarterly Report', description: 'Submit Q1 financial report', category: 'Reporting', due_date: '2026-03-30', status: 'overdue', priority: 'high' },
        { client_id: 1, title: 'Audit Preparation', description: 'Prepare documents for audit', category: 'Audit', due_date: '2026-05-01', status: 'pending', priority: 'medium' },
        { client_id: 1, title: 'Compliance Review', description: 'Internal compliance check', category: 'Compliance', due_date: '2026-04-05', status: 'pending', priority: 'medium' },
        { client_id: 2, title: 'T1 General Filing', description: 'File T1 General form', category: 'Tax', due_date: '2026-06-15', status: 'pending', priority: 'high' },
        { client_id: 2, title: 'Corporation Tax Return', description: 'File corporation tax return', category: 'Tax', due_date: '2026-05-30', status: 'in-progress', priority: 'high' },
        { client_id: 2, title: 'Records Management', description: 'Organize and file records', category: 'Admin', due_date: '2026-03-25', status: 'overdue', priority: 'low' },
        { client_id: 3, title: 'VAT Return', description: 'Submit VAT return', category: 'Tax', due_date: '2026-04-20', status: 'pending', priority: 'high' },
        { client_id: 3, title: 'Annual Accounts Filing', description: 'File annual accounts with Companies House', category: 'Filing', due_date: '2026-09-30', status: 'pending', priority: 'high' },
        { client_id: 3, title: 'Director Compliance', description: 'Annual director compliance check', category: 'Compliance', due_date: '2026-03-27', status: 'pending', priority: 'medium' },
        { client_id: 4, title: 'Tax Advisory', description: 'Annual tax planning review', category: 'Tax', due_date: '2026-05-15', status: 'pending', priority: 'medium' },
        { client_id: 4, title: 'Payroll Filing', description: 'Monthly payroll report', category: 'Payroll', due_date: '2026-03-25', status: 'overdue', priority: 'high' }
      ];

      tasks.forEach(task => {
        db.run(
          'INSERT INTO tasks (client_id, title, description, category, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [task.client_id, task.title, task.description, task.category, task.due_date, task.status, task.priority]
        );
      });

      console.log('Database seeded with sample data');
    }
  });
}

// Database operations
export function getClients() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clients ORDER BY company_name', (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

export function getTasks(clientId) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM tasks WHERE client_id = ? ORDER BY due_date ASC',
      [clientId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
}

export function addTask(taskData) {
  return new Promise((resolve, reject) => {
    const { clientId, title, description, category, dueDate, priority } = taskData;
    db.run(
      'INSERT INTO tasks (client_id, title, description, category, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [clientId, title, description, category, dueDate, 'pending', priority],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            clientId,
            title,
            description,
            category,
            dueDate,
            status: 'pending',
            priority
          });
        }
      }
    );
  });
}

export function updateTaskStatus(taskId, status) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, taskId],
      function(err) {
        if (err) {
          reject(err);
        } else {
          db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        }
      }
    );
  });
}
