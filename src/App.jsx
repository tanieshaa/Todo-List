import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import './App.css'


function App() {

  const [todo, setTodo] = useState("") // This holds the current value of the input field
  const [todos, setTodos] = useState([]) // This holds the list of todo items

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (index) => {
    const itemToEdit = todos[index] // Get the todo item to edit using its index
    setTodo(itemToEdit.todo) // Set the input field to the text of the todo item
    const newTodos = [...todos] // Create a copy of the todos array
    newTodos.splice(index, 1) // Remove the todo item from the array
    setTodos(newTodos) // Update the todos state with the new array
    saveToLS(newTodos)
  }

  const handleDelete = (index) => {
    const newTodos = [...todos] // Create a copy of the todos array
    newTodos.splice(index, 1) // Remove the todo item at the specified index
    setTodos(newTodos) // Update the todos state with the new array
    saveToLS(newTodos)
  }

  const handleAdd = ()=>{
    const newTodoList = [...todos, {todo, isCompleted: false}] // Add the new todo item to the list
    setTodos(newTodoList)
    setTodo("")  // Clear the input field
    saveToLS(newTodoList)
  }

  const handleChange = (e) =>{
    setTodo(e.target.value) // Update the todo state with the new input value
  }

  const handleToggle = (index) => {
    const newTodos = [...todos] // Create a copy of the todos array
    newTodos[index].isCompleted = !newTodos[index].isCompleted // Toggle the isCompleted property of the todo item
    setTodos(newTodos) // Update the todos state with the new array
    saveToLS(newTodos)
  }

  return (
    <>
    <Navbar/>
      <div className=" bg-[#1b151f] shadow-inner shadow-[#56405e] text-white p-4 mx-12 my-5 rounded-xl min-h-[80vh] flex flex-col items-center justify-start">
      <div className='addtodo'>
        <h2 className='text-xl font-bold mt-5'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} className='text-black p-1 rounded-md w-[600px] my-4' type='text'/>
        <button onClick={handleAdd} disabled={todo.length<=0} className='bg-[#c89816] hover:bg-[#a0811a] py-1 px-3 mx-6 rounded-md '>Add</button>
      </div>
        <h2 className='text-2xl font-bold my-5'>Your Todos</h2>
        <div className='todos'>
          {todos.length === 0 && <div>No Tasks to Display.</div>}
        {todos.map((item, index)=>{
         return <div key={index} className="todo flex w-[1000px] justify-between mt-3 mb-3">
          <div className='flex gap-4'>
          <input 
            type='checkbox' 
            checked={item.isCompleted}
            onChange={() => handleToggle(index)}
            className='h-5 w-5 mt-1 accent-[#e8b834]'
          />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={() => handleEdit(index)} className='bg-[#921953] hover:bg-[#631b47] p-2 py-1  font-bold px-3 mx-1 rounded-md'>Edit</button>
              <button onClick={() => handleDelete(index)} className='bg-[#921953] hover:bg-[#631b47] p-2 py-1 font-bold px-3 mx-1 rounded-md'>Delete</button>
            </div>
          </div>
          })}
        </div>
          
    </div>
    </>
  )
}

export default App

