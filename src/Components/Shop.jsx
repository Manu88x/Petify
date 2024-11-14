import React, { useState } from "react";

function Shop() {
  
  const [tasks, setTasks] = useState([]);

  
  const [newTask, setNewTask] = useState({ name: "", price: "", image: "" });

  // Handle input changes for the form
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  // Add a new task
  function addTask() {
    const { name, price, image } = newTask;
    if (name.trim() && price.trim() && image.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { name, price, image },
      ]);
      setNewTask({ name: "", price: "", image: "" });  // Clear the form after adding the task
    }
  }

  // Delete a task
  function deleteTask(index) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  // Move a task up
  function moveTaskUp(index) {
    if (index > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
          updatedTasks[index - 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      });
    }
  }

  // Move a task down
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
          updatedTasks[index + 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      });
    }
  }

  return (
    <div className="todo-list">
      <h1>Shopping List</h1>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newTask.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newTask.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newTask.image}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add Item
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div className="task-info">
              <img src={task.image} alt={task.name} className="task-image" />

              <div className="task-details">
                <span className="task-name">{task.name}</span>
                
                <span className="task-price">${task.price}</span>
              </div>
            </div>

            <button onClick={() => deleteTask(index)} className="delete-button">
              Delete
            </button>

            <button onClick={() => moveTaskUp(index)} className="up-button">
              Up
            </button>

            <button onClick={() => moveTaskDown(index)} className="down-button">
              Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Shop;








