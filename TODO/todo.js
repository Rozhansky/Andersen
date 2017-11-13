var taskList = [];
var btn = document.getElementById("btn");
var currentList = document.getElementById("currentList");
var completedList  = document.getElementById("completedList");
var position = 0;

function Task(text, position){
    this.text = text;
    this.position = position;

}

function recountPositionsForReturn(task){
    for(var i = 0;i < taskList.length;i++){
        if(taskList[i].position >= task.position && taskList[i] != task){
            taskList[i].position++;
        }
    }
}

function recountPositionsForRemove(position){
    for(var i = 0;i < taskList.length;i++){
        if(taskList[i].position > position){
            taskList[i].position--;
        }
    }
}

function returnHtmkTask(position,taskDiv){
    if(position == taskList.length - 1){ 
        currentList.appendChild(taskDiv);
        return;
    } 
    for(var i = 0;i < taskList.length;i++){
        if(position <= i){
            currentList.insertBefore(taskDiv,currentList.childNodes[i]);
            break;
        }
    }
}

function createHtmlTask(task){
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    checkbox.onclick = function(){
        if(this.checked){
            taskDiv.remove();
            recountPositionsForRemove(task.position);
            completedList.appendChild(taskDiv);
        } else{
            taskDiv.remove();
            returnHtmkTask(task.position,taskDiv);
            recountPositionsForReturn(task);
        }
    }

    var taskDiv = document.createElement('div'); 
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(document.createTextNode(task.text));
    currentList.appendChild(taskDiv);
}

function addTask(){
    var text = document.getElementById('textEdit');
    var task = new Task(text.value,position);
    position++;
    taskList.push(task);
    createHtmlTask(task);
}
btn.onclick = function(){
    addTask();
}


