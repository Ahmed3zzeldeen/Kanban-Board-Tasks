let addTaskBtn = Array.from(document.querySelectorAll('.board-container .add-btn'));

let tasksLists = Array.from(document.querySelectorAll('.tasks-list'));
let boardsDiv = document.querySelector('.boards');
let boardContainer = document.querySelectorAll('.board-container');
let drag = null;

// <=============== get Lists from Local Storage ==========>
if (window.localStorage.getItem("list-1") != null) {
  getListsFromLocalStorage();
  controlsHandler();
  dragItem();
}


addTaskBtn.forEach(btn => {
  btn.addEventListener('click', function addTaskHandler(btn) {
    // create task container
    let newTask = document.createElement('div');
    newTask.className = "task-cont";
    newTask.setAttribute("draggable", "true");
    // create task input
    let newInput = document.createElement('input');
    newInput.className = "task";
    newInput.type = "text";
    newInput.value = "New Task";
    newInput.placeholder = "New Task";
    newInput.setAttribute('disabled', 'true');
    newTask.appendChild(newInput);
    let ctrBtnCont = document.createElement('div');
    // create Controls btn for task  
    ctrBtnCont.className = "control-btns";
    // create edit btn
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
    ctrBtnCont.appendChild(editBtn);
    // create remove btn
    let removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
    ctrBtnCont.appendChild(removeBtn);
    newTask.appendChild(ctrBtnCont);
    let tasksList = this.parentElement.children[1];
    tasksList.appendChild(newTask);
    dragItem();
    controlsHandler();
  })

});


function dragItem() {
  let tasks = document.querySelectorAll('.task-cont');
  tasks.forEach(task => {
    task.addEventListener('dragstart', function () {
      drag = task;
      task.style.opacity = '0.5';
    })

    task.addEventListener('dragend', function () {
      drag = null;
      task.style.opacity = '1';
      // set Lists To Local Storage
      setListsToLocalStorage();
    })

    boardContainer.forEach(list => {
      list.addEventListener('dragover', function (e) {
        let currentList = this.querySelector(".tasks-list");
        e.preventDefault();
        currentList.style.background = '#03ac6bce';
      })

      list.addEventListener('dragleave', function () {
        let currentList = this.querySelector(".tasks-list");
        currentList.style.background = 'transparent';
      })
      list.addEventListener('drop', function () {
        let currentList = this.querySelector(".tasks-list");
        currentList.appendChild(drag);
        currentList.style.background = 'transparent';
      })
    })
  })
  // set Lists To Local Storage
  setListsToLocalStorage();
}


function makeAllTasksDisable(currentTask) {
  window.onclick = (e) => {
    if (!currentTask.contains(e.target)) {
      let editBtns = Array.from(document.querySelectorAll('.tasks-list .task-cont .control-btns .edit'));
      editBtns.forEach(btn => {
        let allTasksInput = btn.parentElement.parentElement.children[0];
        allTasksInput.setAttribute('value', `${allTasksInput.value}`);
        allTasksInput.setAttribute('disabled', 'true');
        btn.classList.remove('hide');
        // set Lists To Local Storage
        setListsToLocalStorage();
      })
    }
  }
}

function controlsHandler() {
  let editBtns = Array.from(document.querySelectorAll('.tasks-list .task-cont .control-btns .edit'));
  let removeBtns = Array.from(document.querySelectorAll('.tasks-list .task-cont .control-btns .remove'));
  editBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      let currentTask = this.parentElement.parentElement.children[0];
      let currentTaskContainer = this.parentElement.parentElement;
      currentTask.removeAttribute("disabled");
      currentTask.focus();
      this.classList.add('hide');
      makeAllTasksDisable(currentTaskContainer);
    })
  });
  removeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      let currentTaskContainer = this.parentElement.parentElement;
      currentTaskContainer.remove();
      setListsToLocalStorage()
    })
  });
}

// <============== Local Storage ===============> 

function setListsToLocalStorage() {
  let tasksLists = Array.from(document.querySelectorAll('.tasks-list'));
  let tasksFromList0 = tasksLists[0].innerHTML;
  let tasksFromList1 = tasksLists[1].innerHTML;
  let tasksFromList2 = tasksLists[2].innerHTML;
  window.localStorage.setItem("list-0", tasksFromList0);
  window.localStorage.setItem("list-1", tasksFromList1);
  window.localStorage.setItem("list-2", tasksFromList2);
}


function getListsFromLocalStorage() {
  tasksLists[0].innerHTML = window.localStorage.getItem("list-0");
  tasksLists[1].innerHTML = window.localStorage.getItem("list-1");
  tasksLists[2].innerHTML = window.localStorage.getItem("list-2");
}
