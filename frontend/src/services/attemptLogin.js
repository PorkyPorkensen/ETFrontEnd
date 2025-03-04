export default async function attemptLogin(loginUserName, loginUserID, setUserID) {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Server Error: ${data.error}`);
        }

        console.log(data);
        let foundUser = data.find(user => user.userName === loginUserName);
        if (!foundUser) {
            alert('User not found');
            return;
        }

        if (foundUser.userID === loginUserID) {
            localStorage.setItem('userName', loginUserName);
            localStorage.setItem('userID', loginUserID);
            setUserID(loginUserID)
            alert(`Welcome back, ${loginUserName}`);
            window.location.reload();
        } else {
            alert('Incorrect User ID');
        }
    } catch (error) {
        alert('Error:', error);
    }
}