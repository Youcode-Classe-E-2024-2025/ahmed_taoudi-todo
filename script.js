const mainPage = document.querySelector('main');
const formZone = document.querySelector('#form-add');



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
    // mainPage
    mainPage.classList.remove('blur');
    formZone.classList.add('hidden');
})
// new task listener
newTaskBtn.addEventListener('click', () => {
    // mainPage
    mainPage.classList.add('blur');
    formZone.classList.remove('hidden');
})

// cancel add task listener

cancelAddTaskBtn.addEventListener('click', () => {
    // mainPage
    mainPage.classList.remove('blur');
    formZone.classList.add('hidden');
})
