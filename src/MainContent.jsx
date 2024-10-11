import React, { useState, useEffect } from 'react'
import ChecklistItem from './ChecklistItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const apiUrl =import.meta.env.VITE_API_URL || 'https://todoappbackend-4udy.onrender.com' // Replace with your backend API URL 

const MainContent = () => {
  let toDoList = []
  const [checked, setChecked] = useState(toDoList)
  const [inputValue, setInputValue] = useState('')
  const [updatedValue, setUpdateValue] = useState('')
  const [isEditClicked, setIsEditClicked] = useState(false)
  const [editInputValue, setEditInputValue] = useState('')
  const [editItemId, setEditItemId] = useState(null)
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${apiUrl}/todos`); // Adjust backend URL accordingly
        const data = await response.json();
        setChecked(data.todos); // Update state with fetched todos
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);
  const handleUserClick = async (id) => {
    console.log("Checkbox clicked with id:", id);
    const todoToUpdate = checked.find((item) => item._id === id); // Find the todo to update
    console.log("todoToUpdate", todoToUpdate);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    try {
      const response = await fetch(`${apiUrl}/edit-item/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: updatedTodo.text,
          completed: updatedTodo.completed,
        }),
      });
  const updatedData = await response.json();
      console.log("Updated Todo:", updatedData);

      setChecked((prev) =>
        prev.map((item) => (item._id === id ? updatedData : item))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };
  const handleAddItem = async () => {
    if (!inputValue.trim()) return; // Prevent empty inputs
    const newItem = {
      text: inputValue,
    };

    try {
      const response = await fetch(
        `${apiUrl}/add-item`, //todo-app-backend-0iqe.onrender.com/add-item",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        }
      ); // Adjust backend URL accordingly
      const createdItem = await response.json();
      console.log("Created Item", createdItem);
      setChecked([...checked, createdItem]); // Update state with fetched todos
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
    setInputValue(""); // Clear input field after adding
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleEdit = async (id) => {
    let newItem = { ...checked.find((item) => item._id === id) };
    newItem.text === editInputValue;
    console.log("NewItem", newItem);
    try {
      const response = await fetch(`${apiUrl}/edit-item/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: editInputValue,
          completed: newItem.completed,
        }),
      }); // Adjust backend URL accordingly
      const updatedTodo = await response.json();
      console.log("Updated Todo", updatedTodo);
      setChecked((prev) =>
        prev.map(
          (item) => (item._id === id ? updatedTodo : item) // Update the state with the modified todo
        )
      );
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
    setIsEditClicked(false); // Close edit mode after editing
  };
  const handleDelete = async (id) => {
    setChecked((prev) => prev.filter((item) => item._id !== id));
    try {
      await fetch(`${apiUrl}/delete-item/${id}`, {
        method: "DELETE",
      }); // Adjust backend URL accordingly
      //const data = await response.json();
      //setChecked(data.todos); // Update state with fetched todos
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };
  const mappingToDoList = checked.map(
    ({ text, completed, _id, }) => (
      <ChecklistItem
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        text={text}
        key={_id}
        completed={completed}
        _id={_id}
        handleUserClick={handleUserClick}
        isEditClicked={isEditClicked}
        setIsEditClicked={setIsEditClicked}
        editInputValue={editInputValue}
        setEditInputValue={setEditInputValue}
        editItemId={editItemId}
        setEditItemId={setEditItemId}
      />
    )
  )
  return (
    <>
      <TextField
        type='text'
        value={inputValue}
        name='addToDo'
        onChange={(e) => handleInputChange(e)}
        variant='filled'
      />
      <Button onClick={() => handleAddItem()} variant='contained'>
        + Add
      </Button>
      {mappingToDoList}
    </>
  )
}
export default MainContent