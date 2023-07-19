import React, { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleTaskAdd = () => {
    if (taskInput.trim() !== '') {
      const newTask: Task = {
        id: new Date().getTime(),
        description: taskInput,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setTaskInput('');
    }
  };

  const handleTaskDelete = (taskId: number) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
  };

  const handleTaskToggle = (taskId: number) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  const filterTasks = () => {
    switch (filter) {
      case 'completed':
        return taskList.filter((task) => task.completed);
      case 'pending':
        return taskList.filter((task) => !task.completed);
      default:
        return taskList;
    }
  };

  return (
    <div className="task-manager">
    <div className="h1">
      <h1>Task Manager</h1>
    </div>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task description"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button onClick={handleTaskAdd}>Add Task</button>
      </div>
      <div className="task-filters">
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('completed')}>Completed Tasks</button>
        <button onClick={() => setFilter('pending')}>Pending Tasks</button>
      </div>
      <div className="task-list">
        {filterTasks().map((task) => (
          <div className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
            />
            <span>{task.description}</span>
            <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
