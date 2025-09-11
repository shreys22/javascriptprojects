document.addEventListener("DOMContentLoaded", () => {
    let tasks = [];

    const taskInput = document.getElementById("task");
    const taskList = document.querySelector(".task-list");
    const progressBar = document.querySelector(".progress");
    const taskCounter = document.getElementById("numbers");
    const form = document.querySelector("form");

    // Function to Add a Task
    const addTask = (text) => {
        tasks.push({ text, completed: false });
        updateTaskList();
    };

    // Function to Toggle Task Completion
    const toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTaskList();
    };

    // Function to Remove a Task
    const removeTask = (index) => {
        tasks.splice(index, 1);
        updateTaskList();
    };

    // Function to Edit a Task
    const editTask = (index) => {
        const newText = prompt("Edit your task:", tasks[index].text);
        if (newText) {
            tasks[index].text = newText.trim();
            updateTaskList();
        }
    };

    // Function to Update the Task List UI
    const updateTaskList = () => {
        taskList.innerHTML = ""; // Clear list before updating

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("task-item");

            listItem.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} 
                        onchange="toggleTask(${index})">
                    <p class="${task.completed ? "completed" : ""}">${task.text}</p>
                </div>
                <div class="icons">
                    <button onclick="editTask(${index})">✏️</button>
                    <button onclick="removeTask(${index})">❌</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });

        updateProgress();
    };

    // Function to Update Progress Bar
    const updateProgress = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;

        if (totalTasks > 0) {
            progressBar.style.width = `${(completedTasks / totalTasks) * 100}%`;
        } else {
            progressBar.style.width = "0%";
        }

        taskCounter.textContent = `${completedTasks}/${totalTasks}`;
    };

    // Form Submit Event Listener
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
            taskInput.value = "";
        }
    });

    // Expose Functions to Window (for Event Handling)
    window.toggleTask = toggleTask;
    window.removeTask = removeTask;
    window.editTask = editTask;
});
