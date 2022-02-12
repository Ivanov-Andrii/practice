
// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   },

// variables
const url = "https://jsonplaceholder.typicode.com/todos";
let sendData = [];
const amountTasksforGet = document.querySelector(".amountTasksforGet");
const getTasks = document.querySelector(".getTasks");
const fieldset = document.querySelector(".fieldset");
let nameInput = 1;
let deleteTasks = document.querySelectorAll(".deleteTask");
const labels = document.querySelectorAll(".task");


const addTasks = document.querySelector(".addTasks");

// functions

const addLabel = (label, id) => {
    label.classList.add("task");
    label.dataset.id = id;
    return fieldset.appendChild(label);
}

const addInputCheckbox = (label) => {
    const input = document.createElement("input");
    input.classList.add("inputCheckbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", `checkbox${nameInput}`);
    nameInput++;
    return label.append(input);
}

const addCustomCheckbox = (label) => {
    const span = document.createElement("span");
    span.classList.add("customCheckbox");
    return label.appendChild(span);
}

const addTaskText = (el, label) => {
    return label.innerHTML += el.title;
}

const addDeleteTask = (label) => {
    const deleteTask = document.createElement("div");
    deleteTask.classList.add("deleteTask");
    deleteTask.innerHTML = `[ delete task ]`;
    return label.appendChild(deleteTask);
}

// const reassignDeleteTasks = (deleteTasks) => {
//     deleteTasks = document.querySelectorAll(".deleteTask");
// } ??

// listeners

// ПОЛУЧАЕМ ТАСКИ

getTasks.addEventListener("click", () => {
    if (!amountTasksforGet.value) alert("Choose how many tasks you want to receive");
    axios.get(url)
    .then(res => {
        const {data} = res;
        data.splice(amountTasksforGet.value);
        fieldset.innerHTML = "";
        data.forEach((el,index) => {
            const label = document.createElement("label");
            addLabel(label, data[index].id);
            addInputCheckbox(label);
            addCustomCheckbox(label);
            addTaskText(el, label);
            addDeleteTask(label);

            label.getElementsByClassName("deleteTask")[0].addEventListener("click", function(e) {
                this.parentNode.remove()
            })
            // reassignDeleteTasks(deleteTasks);??
        })
        console.log(data);
        return data;
    })
})

console.log(sendData);
// УДАЛЯЕМ ТАСКУ
// Почему не срабатывал этот метод удаления?????

for (let el of deleteTasks) {
    el.addEventListener("click", function(e) {
        this.parentNode.remove()
    })
}

// document.body.addEventListener('click', function(e) {
//     if (e.target.classList.contains("deleteTask")) {
//         e.target.parentNode.remove()
//     }
// })


// ОТПРАВЛЯЕМ ТАСКИ НА СЕРВЕР

addTasks.addEventListener("click", () => {
    if(sendData === []) alert("добавьте задание")
})












const postObj = {
    "userId": 1,
    "id": 1,
    "title": "Testing task 1",
    "completed": false
  };

