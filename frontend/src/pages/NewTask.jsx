import { useState } from 'react';
import formatDate from '../services/formatDate';

export default function NewTask() {
    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskColor, setTaskColor] = useState('');
    const userName = localStorage.getItem('userName') || ''
    const userId = localStorage.getItem('userID') || ''
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
    console.log(localStorage)
    // localStorage.clear()
    async function handleSubmit(e){
        e.preventDefault()
        const newTask = {
            title: taskName,
            description: taskDesc,
            createdAtFormatted: formatDate(new Date()),
            createdAt: Date.now(),
            color: taskColor,
            postedBy: userName,
            userID: userId,
        };
        if (userName === ''){
            alert('Must create a user first, head to the User Info section!')
            return
        }
        try {
            const response = await fetch('https://etbackend-production.up.railway.app/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
            console.log(response)
            if (response.ok) {
                console.log('Task created successfully!')
                setTaskName('')
                setTaskDesc('')
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='mainDiv'>
            <h1>Add New Task</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputDiv'>
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="taskDesc">Description (Optional):</label>
                    <input
                        type="text"
                        id="taskDesc"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                    />
                </div>
                <div className='colorDiv'>
                    <label htmlFor="taskColor">Color:</label>
                        <select id="taskColor" name="taskColor" value={taskColor} onChange={(e) => setTaskColor(e.target.value)}>
                        <option value="">Yellow (default)</option>
                        <option value="blue">Blue</option>
                        <option value="pink">Pink</option>
                        <option value="orange">Orange</option>
                        <option value="green">Green</option>
                        </select>
                </div>
                <button className='addBtn' type="submit"><i className="fa-solid fa-circle-plus"></i></button>
            </form>
            <br />
            <div className={`sticky-note ${taskColor ? taskColor : 'yellow'}`}>
            <div className='taskHead'>
                  <h2 className='taskTitle'>{taskName}</h2> 
                  <p className='taskDesc'>{taskDesc}</p>
                </div>
                <div className='taskInfo'>

                </div>
            </div>
        </div>
    );
}