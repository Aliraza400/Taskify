//import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const TodoList = ({ item, handleDelete, setShow, onHandleCheckedTodo, checked }) => {
  return (
    <div>
      {setShow && (
        <div className="bg-white shadow-lg w-[450px] mx-auto rounded-full p-8 flex items-center justify-between">
          <h1 className={`text-lg font-medium ${checked ? 'line-through' : 'none'}`}>{item}</h1>
          <div className="flex gap-4">
          <button
            
            className={`text-xl px-4 py-2 ${checked ? 'bg-green-500' : 'bg-gray-200'}  rounded-lg ${checked ? 'text-white' : 'text-black'}`} onClick={() => onHandleCheckedTodo(item)}
          >
            <TiTick />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="text-xl px-4 py-2 bg-rose-600 text-white rounded-lg"
          >
            <MdDelete />
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
