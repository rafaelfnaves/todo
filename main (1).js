var taskInput=document.getElementById("new-task");//Add todo
var addButton=document.getElementsByTagName("button")[0];//primeiro botao
var incompleteTaskHolder=document.getElementById("incomplete-tasks");// #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completadas

//Nova tarefa da lista
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	var checkBox=document.createElement("input");
	
	var label=document.createElement("label");
	
	var editInput=document.createElement("input");

	var editButton=document.createElement("button");

	var deleteButton=document.createElement("button");

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText..caracterere especial
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";


	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

var addTask=function(){
	console.log("Add Task...");
	//Criar uma lista
	var listItem=createNewTaskElement(taskInput.value);

	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";
	saveToStorage();

}


var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		
		if(containsClass){

			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
		saveToStorage();
}




var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove task
		ul.removeChild(listItem);
		saveToStorage();

}


var taskCompleted=function(){
		console.log("Complete Task...");
	
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);
				saveToStorage();

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Marcar task incompleta.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}


addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);



var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");

var checkBox=taskListItem.querySelector("input[type=checkbox]");
var editButton=taskListItem.querySelector("button.edit");
var deleteButton=taskListItem.querySelector("button.delete");

			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
			
}



//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}
	