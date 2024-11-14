import React, { useState, useEffect } from "react";

function Shop() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the backend (GET)
  useEffect(() => {
    setLoading(true);
    fetch("https://shop-617v.onrender.com/items") 
      .then((response) => response.json())
      .then((data) => {
        setTasks(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching tasks");
        setLoading(false);
      });
  }, []);

  // Handle input changes for the form
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  // Add a new task (POST)
  function addTask() {
    const { name, price, image } = newTask;
    if (name.trim() && price.trim() && image.trim()) {
      setLoading(true);
      fetch("https://shop-617v.onrender.com/items", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, image }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks((prevTasks) => [...prevTasks, data]); // Add new task to state
          setNewTask({ name: "", price: "", image: "" });
          setLoading(false);
        })
        .catch((error) => {
          setError("Error adding task");
          setLoading(false);
        });
    }
  }

  // Delete a task (DELETE)
  function deleteTask(id) {
    setLoading(true);
    fetch(`https://shop-617v.onrender.com/items/${id}`, { 
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        setLoading(false);
      })
      .catch((error) => {
        setError("Error deleting task");
        setLoading(false);
      });
  }

  // Update a task (PATCH)
  function updateTask(id, updatedData) {
    setLoading(true);
    fetch(`https://shop-617v.onrender.com/items/${id}`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? data : task))
        );
        setLoading(false);
      })
      .catch((error) => {
        setError("Error updating task");
        setLoading(false);
      });
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
    <div className="shop-list">
      <h1>Shopping List</h1>

      {error && <p className="error">{error}</p>}

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
        <button
          className="add-button"
          onClick={addTask}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="item-info">
              <img
                src={task.image || "default-image.jpg"}
                alt={task.name}
                className="item-image"
              />
              <div className="item-details">
                <span className="item-name">{task.name}</span>
                <span className="item-price">${task.price}</span>
              </div>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
              disabled={loading}
            >
              Delete
            </button>

            <button
              onClick={() => moveTaskUp(tasks.indexOf(task))}
              className="up-button"
              disabled={loading}
            >
              Up
            </button>

            <button
              onClick={() => moveTaskDown(tasks.indexOf(task))}
              className="down-button"
              disabled={loading}
            >
              Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Shop;







