import authFetch from "./authFetch";

export default async function deleteTask(id){
    try {
        const response = await authFetch(`https://etbackend-production.up.railway.app/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Task deleted successfully!')
            alert('Task deleted successfully!')
            window.location.reload();
        } else {
            console.error('Failed to delete task');
            alert('Failed to delete task!')

        }
    } catch (error) {
        console.error('Error:', error);
    }

  }
