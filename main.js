const sendForm = document.querySelector('#addTask')
const btn = document.querySelector('#btn')
const tasks = document.querySelector('#taskList')

//Inputs
const taskInput = document.querySelector('#task')
const dateInput = document.querySelector('#date')
const categoryInput = document.querySelector('#category')

const dateInputValue = dateInput.value
const todaysDate = document.getElementById('date').valueAsDate = new Date() 

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

let todoID=0
const taskArray = []

//pushar in objekt på submit
    sendForm.addEventListener('submit',function (event) {
    event.preventDefault()
     taskArray.push({
      id: todoID++,
      title: taskInput.value ,
      date: dateInput.value,
      category: categoryInput.value,
    })
    
    taskInput.value = ''
    dateInput.valueAsDate = new Date()
    categoryInput.value = ''

    drawList(taskArray)
})


function drawList(filteredTasks) {
  tasks.innerHTML=''
   
  for (let i = 0; i < filteredTasks.length; i++) {
    //title
    const li = document.createElement('li')
    li.textContent = filteredTasks[i].title
    tasks.appendChild(li)
    
    //date
    const div=document.createElement('div')
    div.classList.add('date')
    li.appendChild(div)
    const pDate= document.createElement('p')
    pDate.textContent=filteredTasks[i].date
    div.appendChild(pDate)

    //category
    const pCategory=document.createElement('p')
    pCategory.textContent=filteredTasks[i].category
    div.appendChild(pCategory)

    //add grafic warning on passed deadline
    if (formatDate(todaysDate) > filteredTasks[i].date) { 
      const deadlineIcon = document.createElement('i')
      deadlineIcon.classList.add('fa','fa-warning')
      pDate.appendChild(deadlineIcon)
     }
       //delete
      const deleteIcon = document.createElement('i')
      deleteIcon.classList.add('fa','fa-times')
      deleteIcon.addEventListener('click',function (event) {

          const index = taskArray.id //filtredTasks
          filteredTasks.splice(index,1)
          event.currentTarget.parentElement.remove()

         })
        li.appendChild(deleteIcon)
   }
}

 //filter variabels
const allRadio = document.querySelector('#all')
const jobbRadio = document.querySelector('#jobb')
const skolaRadio = document.querySelector('#skola')
const filterby = document.querySelector('#filter')

 function filterByCategory() {
  allRadio.addEventListener('click',function (event) {
    if (allRadio.checked === true){
     return drawList(taskArray)
    }
  })
  
  jobbRadio.addEventListener('click',function (event) {
    if (jobbRadio.checked === true){
      const jobbCategory =taskArray.filter(function (task) {
        return task.category.includes('Jobb')
      }) 
     drawList(jobbCategory)
    } 
  })
  
  skolaRadio.addEventListener('click',function (event) {
    if (skolaRadio.checked === true){
      const skolaCategory =taskArray.filter(function (task) {
        return task.category.includes('Skola')
      })
     drawList(skolaCategory)
    }
  })
 
}

function filterList() {
  filterby.addEventListener('input',function (event) {
  const searchFor = event.currentTarget.value.toLowerCase()
  const filteredTasks = taskArray.filter(function (task) {
    return task.title.toLowerCase().includes(searchFor)
  })
   drawList(filteredTasks)
  })
}

filterByCategory()
filterList()

