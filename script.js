let todoArr = [];
const completeArr = [];
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completeBtn = document.getElementById("complete");
const clearBtn = document.getElementById("clear");

const modifyTodo = (taskArr) => {
    todoList.innerHTML = "";
    taskArr.map((value, index) => {
        const newTask = document.createElement("div");
        const taskname = document.createElement("p");
        const taskBtnContainer = document.createElement("div");
        const checkBtn = document.createElement("button");
        const checkIcon = document.createElement("img");
        const deleteBtn = document.createElement("button");
        const deleteIcon = document.createElement("img");

        taskname.textContent = value;
        taskname.classList.add("task-name");
        if (completeArr.indexOf(value) !== -1)
            taskname.classList.add("complete-task");

        taskBtnContainer.appendChild(checkBtn);
        taskBtnContainer.appendChild(deleteBtn);

        checkIcon.src = "images/checked.png";
        checkIcon.classList.add("task-icon");

        checkBtn.classList.add("task-btn");
        checkBtn.classList.add("checkTask");
        checkBtn.setAttribute("onClick", `completeTask(${index})`);
        checkBtn.appendChild(checkIcon);

        deleteIcon.src = "images/trash-bin.png";
        deleteIcon.classList.add("task-icon");

        deleteBtn.classList.add("task-btn");
        deleteBtn.setAttribute("onClick", `deleteTask(${index})`);
        deleteBtn.classList.add("deleteTask");
        deleteBtn.appendChild(deleteIcon);

        newTask.appendChild(taskname);
        newTask.appendChild(taskBtnContainer);
        newTask.classList.add("task-container");

        todoList.appendChild(newTask);
    });
};

const addTask = () => {
    const task = todoInput.value.trim();
    todoInput.value = "";

    if (todoArr.indexOf(task) === -1 && task !== "") todoArr.unshift(task);

    modifyTodo(todoArr);
};

addBtn.addEventListener("click", () => {
    addTask();
});

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

const deleteTask = (index) => {
    todoArr.splice(index, 1);
    modifyTodo(todoArr);
};

const completeTask = (index) => {
    if (completeArr.indexOf(todoArr[index]) === -1)
        completeArr.unshift(todoArr[index]);
    else 
        completeArr.splice(completeArr.indexOf(todoArr[index]),1);

    document.getElementsByClassName('task-name')[index].classList.toggle('complete-task');
};

allBtn.addEventListener("click", () => {
    modifyTodo(todoArr);
});

activeBtn.addEventListener("click", () => {
    const activeArr = todoArr.filter((value) => completeArr.indexOf(value) === -1);
    modifyTodo(activeArr);
});

completeBtn.addEventListener("click", () => {
    modifyTodo(completeArr);
});

clearBtn.addEventListener("click", () => {
    todoArr = todoArr.filter((value) => completeArr.indexOf(value) === -1);
    completeArr.splice(0, completeArr.length);
    modifyTodo(completeArr);
});