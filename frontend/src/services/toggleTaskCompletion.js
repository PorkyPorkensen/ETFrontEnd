export default async function toggleTaskCompletion(id, state, setState) {
    try {
        const response = await fetch(`https://etbackend-production.up.railway.app/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to update task status');
        }

        const data = await response.json();

    } catch (error) {
        console.error('Error updating task:', error);
    }
    setState(state + 1);
};
