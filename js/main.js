const inputElm=document.querySelector('#txt-input');
const btnElm=document.querySelector('#btn-add');
const taskListElm=document.querySelector('#task-list');

class Task{
    id;
    description;
    status;

    constructor(id,description,status){
        this.id=id;
        this.description=description;
        this.status=status;

    }
}
const taskList=[];

btnElm.addEventListener('click',()=>{
    const input=inputElm.value;
    if(input.trim().length===0){
        inputElm.select();
        return;
    }

    const liElm=document.createElement('li');
    liElm.innerHTML=`
    <label for="">
    <input type="checkbox"><span class="task-desc">${input}</span>
    </label>
    <div>
        <span title="edit task" class="edit-task material-symbols-outlined">
            pen_size_4
        </span>
        <span title="remove task" class="delete-task material-symbols-outlined">
            delete
        </span>
    </div>`
taskListElm.append(liElm);
inputElm.value="";
inputElm.focus();

});