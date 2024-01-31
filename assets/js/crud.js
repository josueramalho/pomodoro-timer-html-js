const addTaskBt = document.querySelector('.app__button--add-task')
const formAddTask = document.querySelector('.app__form-add-task')
const textAreaForm = document.querySelector('.app__form-textarea')
const tasks = []

addTaskBt.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden')
})

formAddTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const task = {
        descricao: textAreaForm.value
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
})