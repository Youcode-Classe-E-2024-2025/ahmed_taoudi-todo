const mainPage = document.querySelector('main');
const formZone = document.querySelector('#form-add');
const taskDetails = document.querySelector('#task-details');
const detailsDiv= document.querySelector('#details-div');
const welcome= document.querySelector('.welcome');
//  const allTasks ;

// cons



async function fetchTasks() {
    try {
        const response = await fetch('./data/data.json');
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const tasks = await response.json();
        console.log(tasks);
        displayTasks(tasks);
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayTasks(allTasks) {
    let todoTasks = allTasks.filter(item=> item.status==='todo' );
    let doingTasks = allTasks.filter(item=> item.status==='doing' );
    let doneTasks = allTasks.filter(item=> item.status==='done' );

    const _todo= document.getElementById('_todo');
    const _doing= document.getElementById('_doing');
    const _done= document.getElementById('_done');
    
    _todo.innerHTML="";
    _doing.innerHTML="";
    _done.innerHTML="";

    todoTasks.forEach( task => createTask(task,_todo))
    doingTasks.forEach( task => createTask(task,_doing))
    doneTasks.forEach( task => createTask(task,_done))
       

    const canbanCarts = document.querySelectorAll('.canban-cart');
    addEventListenerForTask(canbanCarts)
}

function createTask(task,zone){
   
        const taskDiv = document.createElement('div');
        taskDiv.id = task.id
        if(task.priority=='low'){
            taskDiv.className = 'canban-cart my-4 p-4  h-fit hover:bg-green-500 rounded-md bg-green-300';

        }else if(task.priority=='high'){
            taskDiv.className = 'canban-cart my-4 p-4  h-fit rounded-md  hover:bg-red-500 bg-red-400';

        }else{
            taskDiv.className = 'canban-cart my-4 p-4  h-fit rounded-md  hover:bg-orange-500 bg-orange-300';

        }
        
        taskDiv.innerHTML = `
        <div class="flex justify-between">
                                <!-- name -->
                                <h3 class="text-xl"> ${task.title}</h3>
                                <!-- edit icon -->
                                <div class=" w-16 flex justify-between">
                                    <div >
                                        <svg role="button" class="edit-icon h-5  fill-slate-800" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                            <path
                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                                        </svg>
                                    </div>
                                    <!-- delete icon -->
                                    <div >
                                        <svg role="button" class="delete-icon h-5 fill-slate-800" xmlns="http://www.w3.org/2000/svg"
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
 
}
function deleteTask(){
    // need work
}
function editTask(){
    // need work
}
{/* <h3>${task.title} <span>(${task.priority})</span></h3>
<p>${task.description}</p>
<p>Status: ${task.status}</p>
<p>Due Date: ${task.dueDate}</p> */}
// Call fetchTasks when the script loads

fetchTasks();


// function displayData(){

// }
// function displayData(){

// }
// New
const newTaskBtn = document.querySelector('#new-task-btn');

// Add
const addTaskBtn = document.querySelector('#add-task-btn');

// Cancel
const cancelAddTaskBtn = document.querySelector('#cancel-add-task-btn');

// search
const searchIcon = document.querySelector('#search-icon');

// add task listener
addTaskBtn.addEventListener('click', () => {
   
    mainPage.classList.remove('blur');
    formZone.classList.add('hidden');
})
// new task listener
newTaskBtn.addEventListener('click', () => {
   
    mainPage.classList.add('blur');
    formZone.classList.remove('hidden');
})

// cancel add task listener

cancelAddTaskBtn.addEventListener('click', () => {
    // mainPage
    mainPage.classList.remove('blur');
    formZone.classList.add('hidden');
})

function addEventListenerForTask(canbanCarts){
    canbanCarts.forEach(cart =>{
    
        // console.log(cart)
        console.log("out");
        cart.addEventListener('click',(event)=>{
            // console.log(event.target.closest(".canban-cart").id);
            
            // console.log(event.target, event.target.classList.contains("edit-icon") || event.target.parentElement.classList.contains("edit-icon"), event.target.parentElement);
           if(event.target.classList.contains("edit-icon") || event.target.parentElement.classList.contains("edit-icon")) {
            //  cart.classList.add('hidden');
            alert(`inside edit for ${cart.id}`);
             editTask(cart.id);
             console.log("inside edit");

           }else if(event.target.classList.contains("delete-icon") || event.target.parentElement.classList.contains("delete-icon")) 
           {
            deleteTask(cart.id);
            console.log("inside delete");
            console.log(cart.id); 
            cart.classList.add('hidden');
           }else{
            mainPage.classList.add('blur');
            taskDetails.classList.remove('hidden');
           } 
        })
        // cart.querySelector(".edit-icon").addEventListener("click",()=>{
        //     welcome.textContent="44444444444444444444444444"
        // })
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