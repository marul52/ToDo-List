const form1 = document.querySelector('.form1')
const addText = document.querySelector('.ekle-text')
const searchText = document.querySelector('.search-text')
const todoList = document.querySelector('.todo-list')
const clearAllTodo = document.querySelector('.clearAll')

// Eventler
runEvents();


function runEvents(){
    form1.addEventListener('submit',addTodo)
    document.addEventListener('DOMContentLoaded',pageLoaded)
    todoList.addEventListener('click',deleteTodo)
    todoList.addEventListener('click',complated)
    clearAllTodo.addEventListener('click',clearAll)
    searchText.addEventListener('keyup',searchTodo)
    
}

function complated(e){
    if (e.target.className.includes('itemClass')) {
        e.target.classList.toggle('clicked')
    }
    if (e.target.className.includes('clicked') && e.target.className!='fa-solid fa-trash') {
        showAlert('success','Görevinizi başarıyla tamamladınız, Tebrikler.')
    }else if(!e.target.className.includes('clicked') && e.target.className!='fa-solid fa-trash'){
        showAlert('warning','Bu görevi tamamlayamadınız!')
    }

    addTodoToStorage()
    
}

function addTodo(e) {
    const inputText = addText.value.trim()

    if (inputText==null||inputText=='') {
        showAlert('warning','Lütfen geçerli bir değer giriniz!')
    }else {
        Array.from(todoList.children).forEach(child=>{
            child.style.display = 'flex'
        })
        // Arayüze Ekleme
        addTodoToUI(inputText)
        // LocalStorage'a Ekleme
        addTodoToStorage()

        showAlert('success','To-Do başarıyla listeye eklendi.')
    }
    addText.value = ''
    
    e.preventDefault()
}

function addTodoToUI(textContent){
    todoList.innerHTML += `<div class="eklendi">
    <p class='itemClass'>${textContent}</p>
    <button>
        <i class="fa-solid fa-trash"></i>
    </button>
</div>`
}

function deleteTodo(e) {
    if (e.target.className == 'fa-solid fa-trash') {
        const eklendiDiv = e.target.parentNode.parentNode
        eklendiDiv.remove()
        showAlert('success','To-Do başarıyla silindi.')
    }
    addTodoToStorage()

}

function clearAll(){
    if (todoList.innerHTML=='') {
        showAlert('warning','Listede hiç ToDo bulunamadı!')
    }else {
        todoList.innerHTML = ''
        addTodoToStorage()
        showAlert('success','Tüm ToDolar başarıyla silindi.')
    }
}
function searchTodo(e){
    
    if (todoList.innerHTML == '') {
        showAlert('warning','Listede hiç ToDo yok!')
    }
    let silinenArray = []
    var searchValue = searchText.value.toLowerCase().trim()
    const todoListText = document.querySelectorAll('.todo-list p')
    
    if (searchValue=='') {
        
        Array.from(todoList.children).forEach(child=>{
            child.style.display = 'flex'
        })
        addTodoToStorage()
        getItemFromStorage()
    }else {
        Array.from(todoList.children).forEach(child=>{
            child.style.display = 'flex'
        })
        Array.from(todoListText).forEach(par=>{
            if (par.innerHTML.toLocaleLowerCase().trim().includes(searchValue)) {
                par.parentNode.style.display = 'flex'
            }else {
                par.parentNode.style.display = 'none'
                silinenArray.push(par)
            }
        })
        
        Array.from(todoList.children).forEach(child=>{
            if (silinenArray.length==todoListText.length) {
                showAlert('warning','ToDo bulunamadı!')
            }
        })
        
    }
}


function addTodoToStorage() {
    localStorage.setItem('todo',todoList.innerHTML)
}
function getItemFromStorage(){
    todoList.innerHTML = localStorage.getItem('todo')
}

function pageLoaded() {

    getItemFromStorage()
    
}

function showAlert(type,message) {
    
    const alertDiv = document.createElement('div')
    alertDiv.className = `alert ${type}`
    alertDiv.textContent = message
    document.body.appendChild(alertDiv)

    setTimeout(() => {
        alertDiv.remove();
    }, 1500);
    
}