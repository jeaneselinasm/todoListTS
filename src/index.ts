/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import {v4 as uuidV4} from 'uuid'
// console.log(uuidV4())
type Task = {id : string, title : string, completed : boolean, createdAt : Date}
const list = document.querySelector<HTMLUListElement>('#list')
const form = document.getElementById('new-task-form') as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>('#new-task-title')
const tasks : Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener('submit', event =>{
  event.preventDefault()
  if(input?.value === '' || input?.value == null) return
  
  const newTask : Task = {
    id : uuidV4(),
    title : input.value,
    completed : false,
    createdAt : new Date()
  }
  tasks.push(newTask)
  saveTasks()
  addListItem(newTask)
  input.value = ''
})

function addListItem(task : Task){
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  checkbox.addEventListener('change', ()=>{
    task.completed = checkbox.checked
    saveTasks()
  })
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks() : Task[]{
  const tasksJSON= localStorage.getItem('TASKS')
  if(tasksJSON== null) return []
  return JSON.parse(tasksJSON)
}