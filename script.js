'use strict'
const mainPage = document.querySelector('main');
const formZone = document.querySelector('#form-add-zone');
const formEditZone = document.querySelector('#form-edit-zone');
const addForm = document.querySelector('#add-form');
const editForm = document.querySelector('#edit-form');
const taskDetails = document.querySelector('#task-details');
const detailsDiv= document.querySelector('#details-div');
const welcome= document.querySelector('.welcome');
const _todo= document.getElementById('_todo');
const _doing= document.getElementById('_doing');
const _done= document.getElementById('_done');
const todoCount= document.getElementById('todo-count');
const doingCount= document.getElementById('doing-count');
const doneCount= document.getElementById('done-count');
let  canbanCarts;
let allTasks=[
    {
        id: 0,
        title: "home work",
        description: "math, info, pc ",
        status: "todo",
        dueDate: "2024-11-30",
        priority: "low"
    },
    {
        id: 1,
        title: "Grocery * Shopping",
        description: "Buy fruits, vegetables, and dairy products.",
        status: "todo",
        dueDate: "2024-10-30",
        priority: "medium"
    },
    {
        id: 2,
        title: "Finish Project * Report",
        description: "Complete the final report for the project due next week.",
        status: "done",
        dueDate: "2024-11-05",
        priority: "high"
    },
    {
        id: 3,
        title: "Call Mom",
        description: "Catch up with mom and check how she's doing.",
        status: "done",
        dueDate: "2024-10-25",
        priority: "low"
    },
    {
        id: 4,
        title: "Workout",
        description: "Go to the gym for a cardio session.",
        status: "doing",
        dueDate: "2024-10-29",
        priority: "medium"
    },
    {
        id: 5,
        title: "Read Book",
        description: "Read at least 30 pages of the current book.",
        status: "done",
        dueDate: "2024-10-27",
        priority: "low"
    },
    {
        id: 6,
        title: "Prepare Presentation",
        description: "Create slides for the upcoming presentation.",
        status: "todo",
        dueDate: "2024-11-01",
        priority: "high"
    },
    {
        id: 7,
        title: "Clean the House",
        description: "Do a thorough cleaning of the living room and kitchen.",
        status: "todo",
        dueDate: "2024-10-31",
        priority: "low"
    },
    {
        id: 8,
        title: "Update Resume",
        description: "Revise and update the resume with recent experience.",
        status: "doing",
        dueDate: "2024-11-10",
        priority: "medium"
    }
];
// let idc=21;
//  const allTasks ;
 
welcome.addEventListener("click",()=>{
    console.log(allTasks);
})
 
// **** affiche ****

function displayTasks(allTasks) {
    let todoTasks = allTasks.filter(item => item.status==='todo' );
    let doingTasks = allTasks.filter(item=> item.status==='doing' );
    let doneTasks = allTasks.filter(item=> item.status==='done' );
    todoCount.textContent = `${todoTasks.length}`
    doingCount.textContent = `${doingTasks.length}`
    doneCount.textContent = `${doneTasks.length}`
 
    _todo.innerHTML="";
    _doing.innerHTML="";
    _done.innerHTML="";
    // console.log('Todo Tasks ', todoTasks); 
    // console.log('Doing Tasks ', doingTasks); 
    // console.log('Done Tasks ', doneTasks);
 
    todoTasks.forEach( task => createTask(task,_todo))
    doingTasks.forEach( task => createTask(task,_doing))
    doneTasks.forEach( task => createTask(task,_done))
       
    canbanCarts = document.querySelectorAll('.canban-cart');
    addEventListenerForTask(canbanCarts)
}
// **** create ****

function createTask(task,zone){
   
        const taskDiv = document.createElement('div');
        taskDiv.id = `${task.id}`
        taskDiv.draggable=true;
        if(task.priority=='low'){
            taskDiv.className = 'canban-cart my-4 p-2 md:p-4 border-4 border-sky-50 h-fit hover:bg-green-500 rounded-lg bg-green-300';

        }else if(task.priority=='high'){
            taskDiv.className = 'canban-cart my-4 p-2 md:p-4 border-4 border-sky-50 h-fit rounded-lg  hover:bg-red-500 bg-red-400';

        }else{
            taskDiv.className = 'canban-cart my-4 p-2 md:p-4 border-4 border-sky-50 h-fit rounded-lg  hover:bg-orange-500 bg-orange-300';

        } 
        taskDiv.innerHTML = `
        <div class="flex justify-between">
                                <!-- name -->
                                <h3 class="text-xl"> ${task.title}</h3>
                                <!-- edit icon -->
                                <div class=" w-10 flex flex-col items-end justify-between">
                                    <div class="hover:scale-110">
                                        <svg role="button" class="edit-icon h-5  fill-slate-800 hover:fill-slate-100  " xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                            <path
                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                                        </svg>
                                    </div>
                                    <!-- delete icon -->
                                    <div class="hover:scale-110  mt-8">
                                        <svg role="button" class="delete-icon h-5 fill-slate-800 hover:fill-slate-100 " xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                            <path
                                                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="text-sm">
                            ${task.dueDate}
                            </div>
           
        `;
        zone.appendChild(taskDiv);
        // zone.insertBefore(taskDiv, zone.firstChild);
        
        // canbanCarts = document.querySelectorAll('.canban-cart');
 
}
// **** delete ****

function deleteTask(taskId){
     
    allTasks =allTasks.filter(tsk=> Number(tsk.id) !== Number(taskId));
    displayTasks(allTasks); 
}
// **** edit ****

function editTask(taskId){ 
        const index = allTasks.findIndex(tsk => tsk.id == taskId);
        if (index === -1) return;  
    
        const taskToEdit = allTasks[index];
        editForm['EtaskName'].value = taskToEdit.title;
        editForm['Edesc'].value = taskToEdit.description;
        editForm['EtaskStatus'].value = taskToEdit.status;
        editForm['EdeadLine'].value = taskToEdit.dueDate;
        editForm['EtaskLevel'].value = taskToEdit.priority;
     
        mainPage.classList.add('blur');
        formEditZone.classList.remove('hidden');
     
        editTaskBtn.onclick = () => updateTask(index);
    } 
    function updateTask(index) {
        const updatedTask = {
            id: allTasks[index].id, 
            title: editForm['EtaskName'].value,
            description: editForm['Edesc'].value,
            status: editForm['EtaskStatus'].value,
            dueDate: editForm['EdeadLine'].value,
            priority: editForm['EtaskLevel'].value,
        };
     
        allTasks[index] = updatedTask;
     
        displayTasks(allTasks);
     
        mainPage.classList.remove('blur');
        formEditZone.classList.add('hidden');
     
        editForm.reset(); 
}
 
function displayDetails(selectedTask ){
    
    
    console.log("inside display dtl",selectedTask);
    detailsDiv.innerHTML="";
    detailsDiv.innerHTML=`<h3 class="text-center text-3xl font-medium text-gray-900 mb-8">task details</h3>
                <div>
                    <div id="task-title" class="">
                        <p class=" text-xl font-medium text-gray-700 mb-2">Title</p>
                        <p class="p-4">${selectedTask.title} </p>
                    </div>
                    <div id="task-desc" class="">
                        <p class=" text-xl font-medium text-gray-700 mb-2"> Description</p>
                        <p class="p-4"> ${selectedTask.description}</p>
                    </div>
                    <div id="task-deadline" class="">
                        <p class=" text-xl font-medium text-gray-700 mb-2">deadLine</p>
                        <p class="p-4">${selectedTask.dueDate}</p>
                    </div>
                    <div id="task-status" class="">
                        <p class=" text-xl font-medium text-gray-700 mb-2">Status</p>
                        <p class="p-4">${selectedTask.status}  &copy id : ${selectedTask.id}</p>
                    </div>
                    <div id="task-priority" class="">
                        <p class=" text-xl font-medium text-gray-700 mb-2"> Priority</p>
                        <p class="p-4">${selectedTask.priority}</p>
                    </div>
                </div> `;
    mainPage.classList.add('blur');
    taskDetails.classList.remove('hidden');
}


displayTasks(allTasks); 

 
// New
const newTaskBtn = document.querySelector('#new-task-btn');


// Add
const addTaskBtn = document.querySelector('#add-task-btn');
// edit
const editTaskBtn = document.querySelector('#edit-task-btn');
// sort
const sortTasksBtn = document.querySelector('#sort-tasks-btn');

sortTasksBtn.addEventListener('click',()=>{
    const sortType=document.getElementById('sortType').value
    if(sortType!=='-1'){
        if (sortType==='date') {
            const sortedTasks = allTasks.sort((tsk1,tsk2)=>{
                return  tsk1.dueDate < tsk2.dueDate ? -1:1
              });
              displayTasks(sortedTasks);
        } else if (sortType==='priority') {
            const prtyOrder = {
                high: 1, // red high
                medium: 2, // orange meduim
                low: 3 // green low
            };
            const sortedTasks = allTasks.sort((tsk1,tsk2)=>{
              return prtyOrder[tsk1.priority] - prtyOrder[tsk2.priority]
              });
              displayTasks(sortedTasks);
        }
    }else{
        displayTasks(allTasks);
    }
})

// filter
const filterTaskBtn = document.querySelector('#filter-tasks-btn');

filterTaskBtn.addEventListener('click',()=>{
    const level=document.getElementById('filterLevel').value
    // console.log(level,"9--0");
    if(level!=='-1'){const filteredTasks = allTasks.filter(tsk=> tsk.priority === `${level}`);
    displayTasks(filteredTasks);
    }else{
        displayTasks(allTasks);
    }
 
})

// Cancel add
const cancelAddTaskBtn = document.querySelector('#cancel-add-task-btn');

// Cancel edit
const cancelEditTaskBtn = document.querySelector('#cancel-edit-task-btn');

// search
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-text');

// add task listener

// 
function valideForm() {
const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(error => error.innerText = '');

        let isValid = true;

         // Regex  A-z 0-9
         const validCharsRegex = /^[a-zA-Z0-9\s]+$/;

         // Validate Task Name
         const taskName = document.getElementById('taskName').value.trim();
         if (!taskName) {
             document.getElementById('taskName').insertAdjacentHTML('afterend', '<span class="error text-red-500">Task name is required.</span>');
             isValid = false;
         } else if (!validCharsRegex.test(taskName)) {
             document.getElementById('taskName').insertAdjacentHTML('afterend', '<span class="error text-red-500">Task name contains invalid characters.</span>');
             isValid = false;
         }
 
         // Validate Deadline
         const deadLine = document.getElementById('deadLine').value;
         if (!deadLine) {
             document.getElementById('deadLine').insertAdjacentHTML('afterend', '<span class="error text-red-500">Deadline is required.</span>');
             isValid = false;
         }
 
         // Validate Task Status
         const taskStatus = document.getElementById('taskStatus').value;
         if (!taskStatus) {
             document.getElementById('taskStatus').insertAdjacentHTML('afterend', '<span class="error text-red-500">Task status is required.</span>');
             isValid = false;
         }
 
         // Validate Task Level
         const taskLevel = document.getElementById('taskLevel').value;
         if (!taskLevel) {
             document.getElementById('taskLevel').insertAdjacentHTML('afterend', '<span class="error text-red-500">Task priority is required.</span>');
             isValid = false;
         }
 
         // Validate Description
         const desc = document.getElementById('desc').value.trim();
         if (!desc) {
             document.getElementById('desc').insertAdjacentHTML('afterend', '<span class="error text-red-500">Description is required.</span>');
             isValid = false;
         } else if (!validCharsRegex.test(desc)) {
             document.getElementById('desc').insertAdjacentHTML('afterend', '<span class="error text-red-500">Description contains invalid characters.</span>');
             isValid = false;
         }
 

        // If all fields are valid, proceed (for example, submit the form or handle data)
        if (isValid) {

           
            return true;
            
        }
    }
// 

addTaskBtn.addEventListener('click', (ev) => {
   if(valideForm()){
        const newTask={
            id: new Date().valueOf(), //id simple by time 
            title: addForm['taskName'].value ,
            description: addForm['desc'].value ,
            status: addForm['taskStatus'].value ,
            dueDate: addForm['deadLine'].value,
            priority: addForm['taskLevel'].value 
        }; 
        
        // console.log(newTask);
        console.log('New Task:', newTask);
        allTasks.push(newTask);
       displayTasks(allTasks);
       addForm.reset() 
    } 
})

// new task listener
newTaskBtn.addEventListener('click', () => {
    addForm.reset() 
    mainPage.classList.add('blur');
    formZone.classList.remove('hidden');
})

// cancel add task listener

cancelAddTaskBtn.addEventListener('click', () => {
    // mainPage
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(error => error.innerText = '');
    mainPage.classList.remove('blur');
    formZone.classList.add('hidden');
})

// cancel edit task listener

cancelEditTaskBtn.addEventListener('click', () => {
    // mainPage
    // editForm.reset();
    mainPage.classList.remove('blur');
    formEditZone.classList.add('hidden');
})

function addEventListenerForTask(canbanCarts){
    canbanCarts.forEach(cart =>{
        
        cart.addEventListener('click',(event)=>{ 
            
            // console.log(event.target, event.target.classList.contains("edit-icon") || event.target.parentElement.classList.contains("edit-icon"), event.target.parentElement);
        //    edit-icon
          if(event.target.classList.contains("edit-icon") || event.target.parentElement.classList.contains("edit-icon")) {
            
             editTask(cart.id); 
             
             console.log("inside edit");

           }
        //    delete-icon
           else if(event.target.classList.contains("delete-icon") || event.target.parentElement.classList.contains("delete-icon")) 
           {
            deleteTask(cart.id);
            console.log(allTasks); 
            
           }
        //    details
           else{  
            
            const selectedTask = allTasks.find((tsk) => tsk.id == cart.id);
            // console.log(selectedTask,"fdfdfdf");
             console.log("inside b detials");
            displayDetails(selectedTask);
            
           } 
        }) 
    })
}

detailsDiv.addEventListener('click',(event)=>{
    event.stopPropagation()
})
taskDetails.addEventListener('click', ( event) => {
    // mainPage
    // event.stopPropagation()
    mainPage.classList.remove('blur');
    taskDetails.classList.add('hidden');
})


//  search
// searchBtn.addEventListener('click',()=>{
// //    console.log('ff', searchInput.value); 
// const searchTable = allTasks.filter(tsk=> tsk.title.toLowerCase().includes(searchInput.value) || tsk.description.toLowerCase().includes(searchInput.value) )
// //  console.log(searchTable);
// displayTasks(searchTable);
// })

searchInput.addEventListener('input',()=>{
    //    console.log('ff', searchInput.value); 
    const searchTable = allTasks.filter(tsk=> tsk.title.toLowerCase().includes(searchInput.value) || tsk.description.toLowerCase().includes(searchInput.value) )
    //  console.log(searchTable);
    displayTasks(searchTable);
    })
