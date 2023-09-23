import React, { useState, useEffect } from 'react';

const Todo = () => {

  const getFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(() => {
    const savedTodos = getFromLocalStorage();
    return savedTodos || [];
  });

  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const savedTodos = getFromLocalStorage();
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);
  
  const handleSubmit = (e) => {

    e.preventDefault();

    if (todo !== ''){
      setTodos([{id: `${todos}-${Date.now()}`, todo}, ...todos]);
      setTodo('')
    }

    if (editId){
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) => 
        t.id === editTodo.id 
          ? {id: t.id, todo}
          : {id: t.id, todo: t.todo}
      );

      setTodos(updatedTodos);
      setEditId(0);
      setTodo('');
      return;
    }
  }

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  }

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  }

  return (
    <div className='h-[100vh] lg:w-[25%] md:w-[50%] sm:w-[65%] w-[75%] mx-auto'>
      <div className=' translate-y-[50%] h-96 shadow-green-900 shadow-lg rounded-xl bg-[#A0E4CB] overflow-y-auto'>
        <form onSubmit={handleSubmit}>
          
          <h1 className=' text-3xl font-bold text-[#6D9886] py-9'>TO-DO LIST</h1>

          <input
            type="text"
            className=' rounded-full px-5 py-1 w-[60%] mx-2 border-none outline-none text-teal-800 font-semibold overflow-auto'
            placeholder='Enter a list'
            value={todo}
            onChange={(e)=> setTodo(e.target.value)}
          /><br/>

          <button type='submit' className='text-[#4FA095] font-bold text-xl px-5 my-3'>{editId ? "Edit" : "Go"}</button>

        </form>

        {todos.map((t)=>(
          <div
            key={t.id}
            className='md:flex justify-between mx-8 py-2 border-[#CFFDE1] border-[1px] rounded-lg bg-[#CFFDE1] text-teal-900 my-3'
          >
            <p className='sm:px-4 px-2 font-semibold text-green-700'>{t.todo}</p>

            <div>
              <button className='mx-4 lg:py-0 py-2 hover:text-green-500 hover:scale-125 font-semibold transition delay-150 duration-300 ease-in-out' onClick={()=> handleEdit(t.id)}>Edit</button>
              <button className='mx-4 lg:py-0 py-2 hover:text-green-500 hover:scale-125 font-semibold transition delay-150 duration-300 ease-in-out' onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo;