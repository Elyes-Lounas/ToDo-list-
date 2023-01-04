let addBtn = document.querySelector(".addbtn")
let input = document.querySelector("input")
let removeAllBtn = document.querySelector(".removeAllBtn")
const todoCollection = document.querySelector(".todocollection");

let LS  = localStorage.getItem("todo");
//console.log(LS)
let arrTasks ;
if (LS) {
  arrTasks = JSON.parse(LS);
  arrTasks.map(task => {
    showToDo(task)
  })
} else {
  arrTasks = [];
} 
addBtn.addEventListener("click" , addToDo)

function addToDo() {
  let ID = new Date().getTime().toString()
  let todo = {
    todoTask: input.value,
    completed: false,
    id: ID
  }
  if(todo.todoTask) {
    arrTasks.push(todo);
  }
  input.value = "";
  showToDo(todo);
  localStorage.setItem("todo" , JSON.stringify(arrTasks));
}

function showToDo(todo) {
  if (todo.todoTask) {
    let todoel = document.createElement("li");
    todoel.className = "task";
    todoel.setAttribute("data-id" , todo.id);
    todoel.innerHTML = `<p>${todo.todoTask}</p>
      <button class="deletebtn"><i class="fa fa-trash deletebtn"></i></button>`;
    todoCollection.appendChild(todoel);
    showRemoveAllBtn()
  }
}
window.addEventListener("click" , (e) => {
 if(e.target.matches(".deletebtn")){
     e.target.closest(".task").remove()
     arrTasks = arrTasks.filter(task => {
      if(task.id !== e.target.closest(".task").dataset.id)
       return task;
     })
    localStorage.setItem("todo",JSON.stringify(arrTasks))
    showRemoveAllBtn()
 }
})

removeAllBtn.addEventListener("click" , () => {
  localStorage.clear();
  todoCollection.innerHTML="";
  removeAllBtn.style.setProperty("display" , "none")
})

function showRemoveAllBtn(){
   if (arrTasks.length > 1) {
    removeAllBtn.style.setProperty("display" , "block") 
    } else {
      removeAllBtn.style.setProperty("display" , "none") 
    }
}
