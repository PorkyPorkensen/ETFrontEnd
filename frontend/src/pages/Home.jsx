import { useEffect, useState } from 'react';
import sortTasks from '../services/sortTasks';
import toggleSortOrder1 from '../services/toggleSortOrder1';
import deleteTask from '../services/deleteTask';
import toggleTaskCompletion from '../services/toggleTaskCompletion';

function Home() {

  const [tasks, setTasks] = useState([]);
  const [updatedTasks, setUpdatedTasks] = useState(0);
  const [sortOrder, setSortOrder] = useState('new-old');
  const userName = localStorage.getItem('userName') || '';

  useEffect(() => {
    fetch('https://etbackend-production.up.railway.app/api/tasks')
      .then(response => response.json())
      .then(data => {
        const userData = data.filter(task => task.postedBy === userName)
        const sortedData = sortTasks(userData, sortOrder);
        setTasks(sortedData)

      })
      .catch(error => console.error('Error fetching tasks:', error));
    }, [updatedTasks, sortOrder]);

    const [ isModalOpen, setIsModalOpen ] = useState(true);
    if (userName === '' || userName === null) {
        return (
          <div className='modal-overlay' style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className='modalDiv'>
            <h2>Must have an account to view Tasks</h2>
            <p>Go to the <a href='/userinfo'>User Info</a> page to create an account or log in.</p>
            <p>Enjoy 0 Strings Attatched Signup!</p>
            <button className='userButton' onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
  
          </div>
        )
      }
 
  return (
    <div className='mainDiv'>
      <h1>{userName ? `${userName}'s` : 'All'} Tasks</h1>
      <button className='sortBtn'
      onClick={() => setSortOrder(toggleSortOrder1(sortOrder))}>Sort: {sortOrder === 'new-old' ? 'Newest First' : 'Oldest First'}</button>
        { tasks.length < 1 ? (
            <h2>No tasks available. Add a new task!</h2>
          ) : 
            (<ul>
            {tasks.map(task => (
              <li className={`taskLi sticky-note ${task.color}`} key={task._id}>
                <div className='taskHead'>
                  <h2 className='taskTitle'>{task.title}</h2> 
                  <p className='taskDesc'>{task.description ? task.description : 'No Description Provided'} </p>
                </div>
                <div className='taskInfo'>
                  <div className='taskFacts'>
                    <h3 style={{ color: task.completed ? 'green' : 'rgb(196, 0, 0)'}}>{task.completed ? 'Completed' : 'Incomplete'} </h3>
                    <p>{`Created at: ${task.createdAtFormatted}`}</p>
                  </div>
                  <i onClick={() => toggleTaskCompletion(task._id, updatedTasks, setUpdatedTasks)} className={ !task.completed ? "fa-regular fa-circle-xmark incomplete" : "fa-regular fa-circle-check completed"}></i>
                </div>
                <button className='delBtn' onClick={() => deleteTask(task._id)}>Remove Task</button>
              </li>
        ))}
      </ul>)}
    </div>
  );
}

export default Home;