import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const todoKey = 'reactTodo'

const getLocalTodoData = () => {
  const rawTodo = localStorage.getItem(todoKey);
  if(!rawTodo) return []
  return JSON.parse(rawTodo)
}
const TodoApp = () => {
  const [task, setTask] = useState(() => getLocalTodoData());
  const [dateTime, setDateTime] = useState(null);
  const [clearAll, setClearAll] = useState(false);
  const [show, setShow] = useState(true);

  
  const handleForm = (formValue) => {
    const {id, content, checked} = formValue
    if (!formValue) return;

    /* if (task.includes(formValue)) {
      return;
    } */
    const ifTodoContentChecked = task.find((item) => item.content === content)
    if(ifTodoContentChecked) return

    setTask((prevTask) => [...prevTask, {id, content, checked}]);
    setClearAll(true);
  };
  localStorage.setItem(todoKey, JSON.stringify(task))
  const handleDelete = (value) => {
    const updatedTask = task.filter((item) => item.content !== value);
    setTask(updatedTask);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setDateTime(`${date} - ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleClearAll = () => {
    setTask([]);
    setClearAll(false);
  };
  const handleCheckedTodo = (content) => {
    const updatedTasks = task.map((item) => {
      if(item.content === content) {
        return {...item, checked: !item.checked}
      }
      else {

        return item;
      }
    })
    setTask(updatedTasks)
  }
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex justify-center items-center">
      <div className="bg-white w-[600px] p-16 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">Todo App</h1>
        <h1 className="text-xl font-semibold text-center mt-5">{dateTime}</h1>
        <div className="mt-6">
          <TodoForm onAddTodo={handleForm} />
        </div>
        <div className="mt-12 flex items-center flex-col gap-6">
          {task.map((item) => (
            <TodoList
              item={item.content}
              key={item.id}
              handleDelete={handleDelete}
              setShow={show}
              onHandleCheckedTodo={handleCheckedTodo}
              checked={item.checked}
            />
          ))}
        </div>
        {clearAll && (
          <div className="flex gap-6 justify-between items-center mt-8">
            <button
              onClick={handleClearAll}
              className="bg-rose-600 px-6 py-2 text-white text-lg font-semibold rounded-lg text-center"
            >
              Clear All
            </button>
            <button
              onClick={() => setShow(!show)}
              className="bg-indigo-600 px-6 py-2 text-white text-lg font-semibold rounded-lg text-center"
            >
              {show ? "Hide Tasks" : "Show Tasks"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
