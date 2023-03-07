let addBtns = Array.from(document.querySelectorAll('.board-container .add-btn'));

addBtns.forEach(btn => {
  btn.addEventListener('click', function addTaskHandler(btn) {
    let newTask = document.createElement('div');
    newTask.className = "task-cont";
    let newInput = document.createElement('input');
    newInput.className = "task";
    newInput.type = "text";
    newInput.placeholder = "New task";
    newInput.value = "New task";
    newTask.appendChild(newInput);
    let ctrBtnCont = document.createElement('div');
    ctrBtnCont.className = "control-btns";
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    let removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    ctrBtnCont.appendChild(editBtn);
    ctrBtnCont.appendChild(removeBtn);
    newTask.appendChild(ctrBtnCont);
    let tasksList = this.parentElement.children[1];
    tasksList.appendChild(newTask);
  })
});

let editBtns = Array.from(document.querySelectorAll('.tasks-list .task-cont .control-btns .edit'));
let removeBtns = Array.from(document.querySelectorAll('.tasks-list .task-cont .control-btns .remove'));


editBtns.forEach(btn => {
  btn.classList.add('');
});

removeBtns.forEach(btn => {
  this.parentElement.children[1]
});