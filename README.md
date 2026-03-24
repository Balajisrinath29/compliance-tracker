# Compliance Tracker

A simple, effective web application for managing compliance tasks across multiple clients. Built with Node.js/Express backend and React frontend.

## 🚀 Live Demo

**[View the deployed app]** - Deployment coming soon! 

**To deploy locally:**
1. Clone the repository
2. Follow the "Local Development" section below
3. Visit `http://localhost:3001`

**To deploy to the cloud:**
See the "Deployment" section for Railway, Render, or Docker setup.

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

## 🔌 API Endpoints

### Clients
- `GET /api/clients` - Get all clients

### Tasks
- `GET /api/clients/:clientId/tasks` - Get tasks for a specific client
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:taskId` - Update task status

## 🚀 Deployment

### Prerequisites for Deployment
- A free deployment service account (Railway, Render, Vercel + external backend, etc.)
- Git repository (GitHub, GitLab, etc.)

### Deploying to Railway (Recommended)

1. **Push to GitHub**
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin master
   ```

2. **Deploy on Railway**
   - Go to [Railway.app](https://railway.app)
   - Create a new project
   - Connect your GitHub repository
   - Railway will auto-detect Node.js and build the project
   - Add environment variables if needed
   - Deploy!

### Deploying to Render

1. **Push to GitHub**
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin master
   ```

2. **Deploy on Render**
   - Go to [Render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm run build && cd ../backend && npm install`
   - Set start command: `cd backend && npm start`
   - Deploy!

### Deploying with Docker

This project includes Docker support for easy containerized deployment.

**Prerequisites:**
- Docker installed
- Docker Hub account (optional, for pushing images)

**Steps:**

1. **Build Docker image**
   ```bash
   docker build -t compliance-tracker:latest .
   ```

2. **Run locally**
   ```bash
   docker run -p 3001:3001 compliance-tracker:latest
   ```
   Visit `http://localhost:3001`

3. **Deploy to cloud (e.g., Railway, Heroku)**
   - Push image to Docker Hub
   - Deploy from Docker Hub on your chosen platform

**Using Docker Compose:**
```bash
docker-compose up
```
This starts the app at `http://localhost:3001`

### Deployment Checklist

- [ ] Push code to GitHub
- [ ] Choose deployment platform (Railway/Render/Docker)
- [ ] Set production environment variables
- [ ] Connect repository to platform
- [ ] Deploy!
- [ ] Test live app
- [ ] Update `README.md` with live deployment URL

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

## 🧪 Testing

The application includes seed data for testing. Sample overdue tasks are available immediately on startup.

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

## 🐛 Troubleshooting

**Issue: "Cannot find module" errors**
- Solution: Run `npm install` in both backend and frontend directories

**Issue: Port 3001 already in use**
- Solution: Change port in `backend/server.js` or kill existing process using the port

**Issue: Frontend doesn't connect to backend**
- Solution: Ensure backend is running on port 3001; check Vite proxy config

**Issue: Database not persisting data**
- Solution: Check file permissions; ensure `backend/` directory is writable

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Multiple workspace/organization support
- [ ] Task assignment and notifications
- [ ] Email reminders for overdue tasks
- [ ] Export to CSV/PDF
- [ ] Task comments and activity log
- [ ] Recurring tasks
- [ ] Integration with calendars (Google, Outlook)
- [ ] Advanced reporting and analytics
- [ ] Mobile app

## 📄 License

ISC

## 👥 Author

Built as a compliance tracking solution for LedgersCFO teams.

---

**Questions or issues?** Please open an issue in the repository.
