// Check if there's any task in local storage
if(localStorage.getItem("num") !== null){
     window.num  =localStorage.getItem("num");
}else{
    window.num = 0;
}

// Define global variables
let toggle = document.getElementById("btn-check-4");
let submit_btn = document.getElementById("button-addon1");
let input = document.getElementById("input");

// Add event listener to add task button & switch theme button
document.addEventListener("DOMContentLoaded", () => {
    submit_btn.addEventListener("click", () => addItem());
    toggle.addEventListener("click", () => darkTheme());

})

// Function to switch themes
function darkTheme(){
    let body = document.querySelector("body");
    let li = document.getElementsByTagName("li");

    // Check if the button is clicked to turn dark theme on
    if(toggle.checked == true){
        toggle.setAttribute("checked", "true");
        body.setAttribute("class", "bg-dark");
        for(let i=0; i<li.length; i++){
            li[i].setAttribute("class", "list-group-item border-2 border-secondary bg-dark mt-2");
        }
        document.querySelector("hr").setAttribute("class", "col-lg-6 col-8 offset-lg-3 offset-2 border-3 text-secondary");
        submit_btn.setAttribute("class", "btn btn-outline-secondary border-2");
        input.setAttribute("class", "form-control border-secondary border-2");
        saveTheme();
    }
    // Otherwise it will turn the light theme on
    else{
        toggle.removeAttribute("checked");
        body.setAttribute("class", "bg-white");
        for(let i=0; i<li.length; i++){
            li[i].setAttribute("class", "list-group-item border-2 border-main mt-2");
        }
        document.querySelector("hr").setAttribute("class", "col-lg-6 col-8 offset-lg-3 offset-2 border-3 text-main");
        submit_btn.setAttribute("class", "btn btn-outline-main border-2 text-primary");
        input.setAttribute("class", "form-control border-main border-2");
        saveTheme();
    }
}



// Function that responsible of add tasks dynamically
function addItem(){
    // Check if tasks input is empty
    if(input.value==""){
        alert("You must add some text!");
    }
    // Otherwise it will add the task
    else{
        let li = document.createElement("li");
        if(toggle.checked){
            li.setAttribute("class", "list-group-item border-2 border-secondary mt-2 bg-dark");
        }else{
            li.setAttribute("class", "list-group-item border-2 border-main mt-2");
        }
        li.setAttribute("data-task-id", `${num}`);
    
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "form-check-input me-1 border-main");
        checkbox.setAttribute("id", `checkbox${num}`);

    
        let content = document.createElement("label");
        content.setAttribute("class", "form-check-label text-break text-primary")
        content.setAttribute("for", `checkbox${num}`);
        content.innerHTML = input.value;


        let div = document.createElement("div");
        div.setAttribute("class", "form-check");
        div.appendChild(checkbox);
        div.appendChild(content);

        li.appendChild(div);

        theList = document.getElementById("list");
        theList.appendChild(li);
        num++;
        checkbox.addEventListener("click", () => checkTask(li.getAttribute("data-task-id")));
        saveLists();
    }
    input.value = ""
}

// Function to check completed tasks "Accept ID as argument" "ID will be the key to what task to check"
function checkTask(id){
    let lis = document.querySelector(`[data-task-id="${id}"]`);
    let content = lis.getElementsByTagName("label")[0];
    let checkbox = lis.getElementsByTagName("input")[0];
    let del = document.createElement("del");
    let checkedList = document.getElementById("checkedList");
    let list = document.getElementById("list");

    // Check weather task is checked or not
    if(checkbox.checked == true){
        checkbox.setAttribute("checked", "true");
        del.innerHTML = content.textContent;
        content.innerHTML = "";
        content.appendChild(del);
        checkedList.appendChild(lis);
        saveLists();
    }else{
        checkbox.removeAttribute("checked");
        content.innerHTML = content.textContent;
        del.remove();
        list.appendChild(lis);
        saveLists();
    }
}

// Function to save last theme used to local storage for next visit
function saveTheme(){
    if(toggle.hasAttribute("checked")){
        localStorage.setItem("dark", "true");
    }else{
        localStorage.setItem("dark", "false");
    }
}

// Function to retrieve last theme used in older visits
function showTheme(){
    if(localStorage.getItem("dark") == "true"){
        toggle.setAttribute("checked", "true");
        darkTheme();
        console.log("1st condition");
    }else{
        darkTheme();
        console.log("2nd condition");
    }
}

// Function to save tasks in local storage for next visits 
function saveLists(){
    localStorage.setItem("num", num);
    let tasks = document.getElementsByTagName("li");
    let obj_tasks = []
    for(let i=0; i<tasks.length; i++){
        let input = tasks[i].getElementsByTagName("input")[0];
        let id = tasks[i].getAttribute("data-task-id");
        if(input.hasAttribute("checked")){
            let task = {
                checked: true,
                self: tasks[i].outerHTML,
                id: id,
            };
            obj_tasks.push(task);
        }else{
            let task = {
                checked: false,
                self: tasks[i].outerHTML,
                id: id
            };
            obj_tasks.push(task);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(obj_tasks));

}

// Function to show all tasks 
function showLists(){
    let checkedList = document.getElementById("checkedList");
    let uncheckList = document.getElementById("list");

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i=0; i<tasks.length; i++){
        let li = document.createElement("li");
        li = tasks[i].self;
        if(tasks[i].checked == true){
            checkedList.innerHTML += li;
        }else{
            uncheckList.innerHTML += li;
        }
        let checkbox = document.getElementById(`checkbox${tasks[i].id}`);
        checkbox.addEventListener("click", () => checkTask(Number(tasks[i].id)));
    }
}

// return all tasks and last theme used when page is visited
showLists();
showTheme();
