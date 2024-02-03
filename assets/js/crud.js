// Declaração de constantes
const addTaskBt = document.querySelector('.app__button--add-task')
const formAddTask = document.querySelector('.app__form-add-task')
const cancelFormBt = document.querySelector('.app__form-footer__button--cancel')
const textAreaForm = document.querySelector('.app__form-textarea')
const ulTasks = document.querySelector('.app__section-task-list')

// Função para adicionar ou atualizar tarefa
const tasks = JSON.parse(localStorage.getItem('tasks')) || []
function refreshTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Função para inserir tarefa e seus elementos HTML
function createTask(task) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
</svg>`

    const p = document.createElement('p')
    p.classList.add('app__section-task-list-item-description')
    p.textContent = task.descricao
    
    const button = document.createElement('button')
    button.classList.add('app_button-edit')
    const buttonImg = document.createElement('img')
    buttonImg.setAttribute('src', '../assets/img/edit.png')

    // Alterar descrição da tarefa
    button.onclick = () => {
        const newDescription = prompt('Digite o novo nome da tarefa')
        if (newDescription) {
            p.textContent = newDescription
            task.descricao = newDescription
            refreshTasks()
        }
    }

    // Inserindo elementos HTML na lista
    button.append(buttonImg)
    li.append(svg)
    li.append(p)
    li.append(button)
    return li
}

// Abrir formulário para inserir nova tarefa
addTaskBt.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden')
})

// Enviar dados do formulário, criar nova tarefa e esconder formulário após o processo
formAddTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const task = {
        descricao: textAreaForm.value
    }
    tasks.push(task)

    const elementTask = createTask(task)
    ulTasks.append(elementTask)
    refreshTasks()
    textAreaForm.value = ''
    formAddTask.classList.add('hidden')
})

// Quando botão Cancelar receber click limpar formulário e esconde-lo
cancelFormBt.addEventListener('click', () => {
    textAreaForm.value = ''
    formAddTask.classList.add('hidden')
})

// Pegar todas as tarefas no array e inserir na lista para serem visíveis
tasks.forEach(task => {
    const elementTask = createTask(task)
    ulTasks.append(elementTask)
});