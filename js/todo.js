let add=document.getElementById("add");
console.log(add);
let TaskInput=document.getElementById("TaskInput");
console.log(TaskInput);
let UL=document.querySelector(".taskList");
console.log(UL);
let allTasks;
let DeleteAllBtn=document.getElementById("DeleteAll");
console.log(DeleteAllBtn);
if(localStorage.tasks==null){
  allTasks=[];
}else{
  allTasks=JSON.parse(window.localStorage.getItem("tasks"));
};

showData();
function DeleteAll(){
  allTasks.splice(0);
  localStorage.removeItem("tasks");
  showData();
}
add.addEventListener("click",function(e){
  e.preventDefault();
  allTasks.push({
    text:TaskInput.value,
    Accomplished:false
  });
  window.localStorage.setItem("tasks",JSON.stringify(allTasks));
  TaskInput.value="";
  showData();
  console.log(allTasks)
})
function toggleTask(index){
  allTasks[index].Accomplished=!allTasks[index].Accomplished;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showData();
};
function updateprogressUI(){
    const progressBar=document.getElementById("progressBar");
    const progressFill=document.getElementById("progress");
    const numbersEl=document.querySelector(".numbers");
    const total=allTasks.length;
    const done=allTasks.filter(t=>t.Accomplished).length;
    const percent=total===0?0:Math.round((done / total) * 100);
    numbersEl.innerText=`${done}/${total}`;
     progressFill.style.width = percent + '%'; 

}
function showData(){
  let li='';
  for(let i=0;i<allTasks.length;i++){
    let checked="";
    let taskClass="";
    if(allTasks[i].Accomplished){
    checked="checked";
    taskClass="Accomplished";

   }else{
    checked='';
    taskClass='';
   }
   li+=`<li>
   <div id="NewTask">
   <div class="task-info">
   <input ${checked} type="checkbox" onclick="toggleTask(${i})" name="" id="">
   <span class=" ${taskClass}  "> ${allTasks[i].text}</span>
   </div>
   <div class="icons">
   <span class="delete-btn" onclick="DeleteTask(${i})"><i class="fa-solid fa-trash"></i></span>
   <span class="edit-btn" onclick="editTask(${i})"><i class="fa-solid fa-pen-to-square"></i></span>
   
   
   </div>

   </div>
   </li>`
  
  }
  UL.innerHTML=li;
  if(allTasks.length===0){
    DeleteAllBtn.style.display="none";
  }else{
     DeleteAllBtn.style.display="block";
  }
  updateprogressUI();
};
function editTask(index){
  TaskInput.value=allTasks[index].text;
  allTasks.splice(index,1);
 window.localStorage.setItem("tasks",JSON.stringify(allTasks));
  showData();
  
}

function DeleteTask(index){
  allTasks.splice(index,1);
  window.localStorage.setItem("tasks",JSON.stringify(allTasks));
  showData();
}

