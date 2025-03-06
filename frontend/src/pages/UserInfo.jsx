import { useState } from "react";
import submitUser from "../services/submitUser";
import attemptLogin from "../services/attemptLogin";
import updateUsername from "../services/updateUsername";

export default function UserInfo(){
    const [userName, setUserName] = useState('')
    const [userID, setUserID] = useState('')
    const [loginUserName, setLoginUserName] = useState('')
    const [loginUserID, setLoginUserID] = useState('')
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [newUsername, setNewUsername] = useState('')
    const idPlaceholder = userID || loginUserID || localStorage.getItem('userID');

    function signOut(){
        localStorage.clear()
        window.location.reload()
    }

    function copyToClipboard(){
        navigator.clipboard.writeText(userID || loginUserID || localStorage.getItem('userID'))
        alert('User ID was Copied to Clipboard')
    }


    if (!localStorage.getItem('userName')){
        return (
            <div className="defaultDiv">
                <h1>Welcome to EasyTask!</h1>
                <h2 className="subheader">Lets get Started</h2>
                <div className=" inputDiv loginDiv">
                    <h2>Have an account? Log in here</h2>
                    <label htmlFor="loginUserName">Username:</label>
                    <input
                            type="text"
                            id="loginUserName"
                            value={loginUserName}
                            onChange={(e) => setLoginUserName(e.target.value)}
                            required
                        />
                    <br />
                    <label htmlFor="loginUserID">Password / User ID:</label>
                    <input
                            type="password"
                            id="loginUserID"
                            value={loginUserID}
                            onChange={(e) => setLoginUserID(e.target.value)}
                            required
                        />
                        <br />
                        <button className="userButton login" onClick={() => attemptLogin(loginUserName, loginUserID, setUserID)}>Log in</button>

                </div>
                            <h2 className="subHeader">Don't have an account? Create one here</h2>
                        <div className="loginDiv">
                            <label htmlFor="userName">Requested Username:</label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <br />
                            <button className="userButton green" onClick={() => submitUser(userName, setUserID)}>Generate User ID</button>
                        </div>
            </div>
        )}
    else {

        return (
            <div className="userInfoDiv loginDiv">
                <h1 className="misch1">Hello {localStorage.getItem('userName')}!</h1>
                <button className='signoutButton' onClick={() => signOut()}>Sign Out</button>
                <div className="userInfo">
                <p style={passwordHidden ? {display: "none"} : {display: "block"}}>User ID (This is your 'password', keep it safe!):</p>
                <p  className='userid' style={passwordHidden ? {display: "none"} : {display: "block"}}> {localStorage.getItem('userID')}</p>
                <div className="buttonDiv">
                    <button className='userButton' style={passwordHidden ? {display: "none"} : {display: "block"}} onClick={copyToClipboard}>Copy ID</button>
                    <button className='userButton' onClick={() => setPasswordHidden(!passwordHidden)}>{passwordHidden ? 'Show Password' : 'Hide Password'}</button>
                </div>
                <div className="changeUsernameDiv">
                    <label className='CU' htmlFor="newUsername">Change Username:</label>
                    <input
                        type="text"
                        id="newUsername"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <button className='userButton' onClick={() => updateUsername(idPlaceholder, newUsername, setNewUsername )}>Update Username</button>
                </div>
                <br />
                <br />
                </div>
            </div>
        )
    }
}