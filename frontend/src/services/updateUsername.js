export default async function updateUsername(id, newUsername, setNewUsername) {
    try {
        const response = await fetch(`https://etbackend-production.up.railway.app/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: newUsername, id: id }),
        });

        if (response.ok) {
            setNewUsername(newUsername);
            localStorage.setItem('userName', newUsername);
            alert('Username updated successfully!')
            window.location.reload();
        } else {
            console.error('Failed to update username');
            alert('Failed to update username!')
        }
    } catch (error) {
        console.error('Error:', error);
    }}