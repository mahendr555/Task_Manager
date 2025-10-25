# Task Manager - Full Stack Application

A simple task management application built with .NET 8 Web API backend and React TypeScript frontend.

![My Photo](https://github.com/mahendr555/Task_Manager/blob/main/Screenshot%20(25).png)

## Project Structure

```
TaskManager/
├── Backend/                 # .NET 8 Web API
│   ├── Controllers/
│   │   └── TasksController.cs
│   ├── Models/
│   │   └── TaskItem.cs
│   ├── Program.cs
│   └── TaskManager.csproj
├── Frontend/                # React TypeScript
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── Task.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## Features

- ✅ Display list of tasks
- ✅ Add new tasks
- ✅ Mark tasks as completed/uncompleted
- ✅ Delete tasks
- ✅ Filter tasks (All/Active/Completed)
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API with CORS enabled

## Prerequisites

- .NET 8 SDK
- Node.js (v18 or higher)
- npm or yarn
- Windows Package Manager (`winget`) for automated installations

## Setup Instructions

### Backend Setup (.NET 8 Web API)

1. Install the .NET SDK (if not already installed):
   ```cmd
   winget install Microsoft.DotNet.SDK.8
   ```

2. Navigate to the Backend directory:
   ```cmd
   cd Backend
   ```

3. Restore dependencies:
   ```cmd
   dotnet restore
   ```

4. Run the backend server:
   ```cmd
   dotnet run
   ```

   The API will be available at: `http://localhost:5000`

### Frontend Setup (React TypeScript)

1. Navigate to the Frontend directory:
   ```cmd
   cd Frontend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Start the development server:
   ```cmd
   npm run dev
   ```

   The frontend will be available at: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Toggle task completion |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Example API Calls

### Get all tasks
```bash
curl -X GET http://localhost:5000/api/tasks
```

### Create a new task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description": "Learn React", "isCompleted": false}'
```

### Toggle task completion
```bash
curl -X PUT http://localhost:5000/api/tasks/1
```

### Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

## How Backend and Frontend Connect

1. **CORS Configuration**: The backend enables CORS for `http://localhost:5173` (Vite's default port)
2. **API Service**: Frontend uses Axios to make HTTP requests to the backend
3. **Data Flow**: 
   - Frontend sends HTTP requests to backend API endpoints
   - Backend processes requests and returns JSON responses
   - Frontend updates the UI based on the responses

## Running Both Applications

1. **Start Backend** (Terminal 1):
   ```cmd
   cd Backend
   dotnet run
   ```

2. **Start Frontend** (Terminal 2):
   ```cmd
   cd Frontend
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173`

## Optional Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `dotnet publish -c Release -o out`
4. Set start command: `dotnet out/TaskManager.dll`

### Frontend (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the Frontend directory
3. Follow the prompts to deploy

## Technologies Used

### Backend
- .NET 8 Web API
- In-memory data storage
- CORS middleware

### Frontend
- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)

## Key Learning Points

1. **RESTful API Design**: Each endpoint follows REST conventions
2. **CORS**: Enables cross-origin requests between frontend and backend
3. **React Hooks**: Uses `useState` and `useEffect` for state management
4. **TypeScript**: Provides type safety for better development experience
5. **Async/Await**: Handles asynchronous API calls properly
6. **Component Architecture**: Clean separation of concerns in React components
