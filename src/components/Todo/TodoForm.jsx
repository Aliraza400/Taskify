import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [formValue, setFormValue] = useState("");

  const handleInput = (e) => {
    const input = e.target;
    const value = input.value;
    setFormValue({ id: value, content: value, checked: false });
  };
  const handleForm = (e) => {
    e.preventDefault();
    onAddTodo(formValue);
    setFormValue("");
  };
  return (
    <div>
      <form onSubmit={handleForm} className="flex flex-col gap-5">
        <input
          onChange={handleInput}
          value={formValue.content}
          type="text"
          className="p-3 w-full rounded-full text-lg border border-gray-400"
        />
        <button className="text-lg px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
