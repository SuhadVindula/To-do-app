const COMPLETED = 1;
const NOT_COMPLETED = 0;
const inputElm = document.querySelector('#txt-input');
const btnElm = document.querySelector("#btn-add");
const taskListElm = document.querySelector("#task-list");
const formElm = document.querySelector("form");
let selectedTaskId = null;

formElm.addEventListener('submit', (eventData)=> {
    eventData.preventDefault();
});

class Task {
    id;
    description;
    status;

    constructor(id, description, status){
        this.id = id;
        this.description = description;
        this.status = status;
    }

    getTaskElm() {
        const liElm = document.createElement('li');
        liElm.innerHTML = `
                    <label>
                        <input type="checkbox" selected="${this.status === COMPLETED}"> 
                        <span class="task-desc">${this.description}</span>
                    </label>
                    <div>
                        <span title="Edit Task" class="edit-task material-symbols-outlined">
                            edit
                        </span>
                        <span title="Remove Task" class="delete-task material-symbols-outlined">
                            delete
                        </span>   
                    </div> 
                    `;
        liElm.setAttribute('data-task-id', this.id);
        return liElm;
    }
}

const taskList = [];

function addTask(taskDescription){
    if (!taskDescription.trim()){
        inputElm.select();
        return;
    }

    const newTaskId = (!taskList.length)? 1 : +taskList[taskList.length - 1].id + 1;
    const newTask = new Task(newTaskId, taskDescription, NOT_COMPLETED);
    taskList.push(newTask);
    taskListElm.append(newTask.getTaskElm());
    inputElm.value = "";
    inputElm.focus();
}

function updateTask(taskDescription){
    if (!taskDescription.trim()){
        inputElm.select();
        return;
    }

    const task = getTask(selectedTaskId);
    task.description = taskDescription;
    document.querySelector(`[data-task-id="${task.id}"]`).replaceWith(task.getTaskElm());
}

function removeTask(taskId){
    const task = getTask(taskId);
    const index = taskList.indexOf(task);
    taskList.splice(index, 1);
    document.querySelector(`[data-task-id="${task.id}"]`).remove();
}

function getTask(taskId){
    return taskList.find(task => task.id == taskId);
}   

btnElm.addEventListener('click', ()=> {
    if (btnElm.innerText === 'ADD'){
        addTask(inputElm.value);
    }else {
        updateTask(inputElm.value);
        btnElm.innerText = 'ADD';
        inputElm.value = "";
        inputElm.focus();
        selectedTaskId = null;
    }
});

taskListElm.addEventListener('click', (eventData)=> {
    if (eventData?.target.classList.contains("edit-task")){
        const taskDesc = eventData.target.closest("li").querySelector("label span").innerText;
        inputElm.value = taskDesc;
        inputElm.select();
        selectedTaskId = eventData.target.closest("li").getAttribute("data-task-id");
        btnElm.innerText = "UPDATE";
    }else if (eventData?.target.classList.contains("delete-task")){
        const taskId = eventData.target.closest("li").getAttribute("data-task-id");
        removeTask(taskId);
    }
});
