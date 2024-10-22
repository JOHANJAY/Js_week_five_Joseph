// Task Class representing a task object
class Task {
  constructor(title, description) {
    this.id = new Date().getTime();
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

// App class handling task logic
class TaskApp {
  constructor() {
    // Load tasks from localStorage
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.taskListElement = document.getElementById("task-list");
    this.renderTasks();
  }

  // Add a new task
  addTask() {
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;

    if (title && description) {
      const task = new Task(title, description);
      this.tasks.push(task);
      this.saveTasks();
      this.renderTasks();

      // Clear form
      document.getElementById("task-title").value = "";
      document.getElementById("task-desc").value = "";
    } else {
      alert("Please fill out both fields");
    }
  }

  // Mark a task as completed
  toggleTaskCompletion(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.toggleComplete();
      this.saveTasks();
      this.renderTasks();
    }
  }

  // Delete a task
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Render tasks on the page
  renderTasks() {
    this.taskListElement.innerHTML = ""; // Clear the task list
    this.tasks.forEach((task) => {
      const taskElement = document.createElement("li");
      taskElement.className = `task ${task.completed ? "completed" : ""}`;
      taskElement.innerHTML = `
                <span>
                    <strong>${task.title}</strong><br>
                    ${task.description}
                </span>
                <span>
                    <button onclick="app.toggleTaskCompletion(${task.id})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button onclick="app.deleteTask(${task.id})">Delete</button>
                </span>
            `;
      this.taskListElement.appendChild(taskElement);
    });
  }
}

// Initialize the app
const app = new TaskApp();
