import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { CompletedTasks, Home, NewTask, UserInfo, About } from '../pages';
import { useEffect, useState } from 'react';

export default function Header(){
    
    const [linksHidden, setLinksHidden] = useState(true);

    return (
        <div>
            <div className='headerDiv'>
            <Link className='siteHeader' to='/'><h1>EasyTask</h1></Link>
                    <div className={`linkDiv ${linksHidden ? 'hidden' : ''}`}>
                        <Link className='links' to='/'>Home</Link>
                        <Link className='newTask links' to='/api/tasks/new'>New Task</Link>
                        <Link className='links' to='/api/tasks/completed'>Completed Tasks</Link>
                        <Link className='links' to='/userinfo'>User Info</Link>
                        <Link className='links' to='/about'>About</Link>
                    </div>
            </div>
            <button  className="linksBtn"onClick={() => setLinksHidden(!linksHidden)}><i className="fa-solid fa-bars"></i></button>
               <Routes>
                    <Route path='/api/tasks/completed' element={<CompletedTasks />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/api/tasks/new' element={<NewTask />} />
                    <Route path='/userinfo' element={<UserInfo />} />
                    <Route path='/about' element={<About />} />
                </Routes>
        </div>
    )
}