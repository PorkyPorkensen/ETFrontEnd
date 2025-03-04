import { v4 as uuidv4 } from "uuid";

export default async function submitUser(userName, setUserID){
    if (userName === ''){
        alert('Username cannot be empty')
        return
    } else if (localStorage.getItem('userName')){
        alert(`Already logged in as ${localStorage.getItem('userName')}. Please log out first`)
        return
    }
    let generatedID = uuidv4()
    localStorage.setItem("userName", userName)
    localStorage.setItem("userID", generatedID)
    setUserID(generatedID)
    
    const newUser = {
        userName: userName,
        userID: generatedID,
    }
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Server Error: ${data.error}`);
        }
    
        console.log("User added successfully:", data);
    } catch (error) {
        console.error('Error:', error);
    }
}