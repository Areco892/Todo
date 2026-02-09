# Todo Site
## Project Overview
This Todo Site allows user to create, read, update, and delete tasks. It implements a client-server architecture with a RESTful API for managing todo tasks. The frontend is built with basic HTML, CSS, JavaScript, while the backend is powered by Node.js with Express.js and connected to a PostgreSQL database.

### Features:
- Create new todo tasks
- Read and view all tasks
- Update task descriptions and completion status
- Delete tasks
- Completion status can be toggled using checkboxes

## Usage
- Open the frontend (index.html) in your browser.
- Use the form to add a new task to your todo list.
- Mark tasks as complete/incomplete using the checkboxes.
- Edit tasks by changing the description.
- Delete tasks from the list.

## API Documentation
### Data Format
- todo_id: Unique identifier of the task.
- description: Brief description of the task.
- status: Current status of the task (Pending/Completed).

### Endpoints
- GET /todos
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js, JavaScript
- Database: PostgreSQL
