import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('/tasks');
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    await axios.post('/tasks', { title, description });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

      <div className="bg-white p-6 rounded shadow max-w-lg">
        <form onSubmit={createTask} className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full input" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full textarea" />
          <button type="submit" className="btn">Add Task</button>
        </form>
      </div>

      <div className="mt-6 space-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleComplete(task)} className="btn">{task.completed ? 'Undo' : 'Done'}</button>
              <button onClick={() => deleteTask(task._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
