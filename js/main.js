function list() {
  const inputTasks = document.querySelector('#input-tasks')
  const btnTasks = document.querySelector('.btn-add-tasks')
  const tasks = document.querySelector('.tasks')

  // HABILITANDO O ENTER PARA ADICIONAR TAREFA
  inputTasks.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      if (!inputTasks.value) return
      creatTasks(inputTasks.value)
    } /*13 corresponde a tecla ENTER -- ou seja, se enter for cliclado::: */
  })

  // LIMPANDO O INPUT QUANDO ELE FOR SUBMITIDO
  function cleanInput() {
    inputTasks.value = '' /*igual a nada */
    inputTasks.focus()
  }

  // CRIANDO LI

  function creatLi() {
    const li = document.createElement('li')
    return li
  }

  // CRIANDO BUTTON

  function creatButton(li) {
    const button = document.createElement('button')
    button.innerHTML += 'Apagar'
    button.setAttribute('class', 'delete')
    button.setAttribute('title', 'Apagar esta tarefa')

    li.innerText += ' ' //para ficar um espaço entre li e button. //n é necessário
    li.appendChild(button)
  }

  // EXIBINDO AS TASKS
  function creatTasks(textInput) {
    /*const li = document.createElement('li')
    const button = document.createElement('button')

    li.innerHTML += inputTasks.value
    button.innerHTML += 'Apagar'*/
    const li = creatLi()

    li.innerText += textInput
    tasks.appendChild(li)

    cleanInput()
    creatButton(li)
    saveTasks()
  }

  // HABILITANDO QUE APAREÇA AS TASKS QUANDO O BUTTON FOR CLICADO
  btnTasks.addEventListener('click', function () {
    if (!inputTasks.value) return
    creatTasks(inputTasks.value)
  })

  document.addEventListener('click', function (e) {
    const el = e.target

    if (el.classList.contains('delete')) {
      el.parentElement.remove()
      saveTasks()
    }
  })

  //Salvando as tarefas
  function saveTasks() {
    const liTasks = tasks.querySelectorAll('li')
    const toDoList = []

    for (let task of liTasks) {
      let textTask = task.innerText
      textTask = textTask.replace('Apagar', '') /*replace sig. substituir */
      toDoList.push(textTask)
    }

    const tasksJSON = JSON.stringify(toDoList) //converti o array em um json em string e agr posso salvar em algum lugar e converter de volta em um array

    localStorage.setItem('tasks', tasksJSON)
  }

  //lendo as tarefas e jogando elas de volta na web

  function addSavedTasks() {
    const tasks = localStorage.getItem('tasks')
    const toDoList = JSON.parse(tasks)

    for (let task of toDoList) {
      creatTasks(task)
    }
  }
  addSavedTasks()
}

list()
