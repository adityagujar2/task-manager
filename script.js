const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
    renderTasks();
};

addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
