# Compliance Tracker

A simple, effective web application for managing compliance tasks across multiple clients. Built with Node.js/Express backend and React frontend.

## ✨ Features

- **Client Management**: View and select from a list of clients
- **Task Management**: Create, update, and track compliance tasks
- **Status Tracking**: Track task status (Pending, In Progress, Completed)
- **Overdue Alerts**: Automatically highlight overdue pending tasks
- **Filtering & Search**: Filter by status, category, or search by title/description
- **Summary Statistics**: Overview of total, pending, completed, and overdue tasks
- **Priority Levels**: Mark tasks with Low, Medium, or High priority
- **Categories**: Organize tasks by category (Tax, Reporting, Audit, Compliance, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Tech Stack

**Backend:**
- Node.js with Express.js
- SQLite3 for persistent storage
- CORS for cross-origin requests
- Body-parser for JSON handling

**Frontend:**
- React 18
- Vite for fast development and production builds
- CSS3 for styling
- Fetch API for backend communication

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd compliance-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   cd ..

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

4. **Start the development server**
   ```bash
   # From the root directory
   cd backend
   npm start
   ```
   The app will be available at `http://localhost:3001`

### Development with Hot Reload

For faster development with both frontend and backend hot reload:

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend  
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` with proxy to backend at `http://localhost:3001`

## 📊 Data Models

### Client
```javascript
{
  id: number,
  company_name: string,
  country: string,
  entity_type: string
}
```

### Compliance Task
```javascript
{
  id: number,
  client_id: number,
  title: string,
  description: string,
  category: string,
  due_date: string (YYYY-MM-DD),
  status: string ('pending', 'in-progress', 'completed'),
  priority: string ('low', 'medium', 'high'),
  created_at: datetime
}
```


## 🗄️ Database

The application uses SQLite for data persistence. The database file (`compliance.db`) is created automatically on first run with seed data included.

### Seed Data
The database comes pre-populated with:
- 4 sample clients (Acme Corporation, Global Industries Inc, Tech Solutions Ltd, Finance Partners GmbH)
- 12 sample tasks across clients with various statuses and due dates

## 📝 Key Design Decisions & Tradeoffs

### 1. **SQLite vs Cloud Database**
   - **Decision**: Used SQLite for simplicity and quick deployment
   - **Tradeoff**: SQLite works great for single-instance deployments but doesn't scale for multi-instance or distributed systems
   - **Alternative**: Would use PostgreSQL for production at scale

### 2. **Single Server (Frontend + Backend)**
   - **Decision**: Frontend builds and serves from Express server
   - **Tradeoff**: Simpler deployment (one service instead of two), but less flexibility for separate scaling
   - **Alternative**: Separate frontend deployment would allow independent scaling

### 3. **Simple Authentication**
   - **Decision**: No authentication implemented (open access)
   - **Assumption**: This is an internal tool for a team
   - **Future**: Would add Auth0 or similar for multi-tenant support

### 4. **In-Memory State Management (React)**
   - **Decision**: Used React hooks and local component state
   - **Tradeoff**: Simple and sufficient for current needs; lacks persistence
   - **Alternative**: Would use Redux or Zustand for complex state management

### 5. **No Pagination**
   - **Decision**: Loads all tasks at once
   - **Assumption**: Small dataset (assume <1000 tasks per client)
   - **Alternative**: Would implement pagination/infinite scroll at scale

### 6. **Custom CSS (No Framework)**
   - **Decision**: Pure CSS with utility-like approach
   - **Tradeoff**: More CSS code but full control, no framework overhead
   - **Alternative**: Tailwind CSS or Material-UI for faster development

### 7. **Overdue Calculation (Client-Side)**
   - **Decision**: Calculated in frontend by comparing due_date with current date
   - **Tradeoff**: Time zone issues possible; inconsistent if client clocks are off
   - **Alternative**: Calculate status on backend, send as field


## 📦 Project Structure

```
compliance-tracker/
├── backend/
│   ├── server.js          # Express server setup and routes
│   ├── db.js              # SQLite database operations
│   ├── package.json       # Backend dependencies
│   └── compliance.db      # SQLite database (auto-created)
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Global styles
│   │   ├── main.jsx       # React entry point
│   │   └── components/    # React components
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── dist/              # Built frontend (production)
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

