export default async function attemptLogin(loginUserName, loginUserID, setUserID) {
    try {
        const response = await fetch('https://etbackend-production.up.railway.app/login', { // Change this to your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: loginUserName,
                userID: loginUserID,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Login failed');
            return;
        }

        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userID', data.userID);
        setUserID(data.userID);
        alert(`Welcome back, ${data.userName}`);
        window.location.reload();
    } catch (error) {
        console.error('Login error:', error);
        alert('Something went wrong logging in.');
    }
}