export default function sortTasks(tasks, sortOrder = 'new-old'){

return [...tasks].sort((a, b) => {

    if (a.completed - b.completed) {
        return a.completed ? 1 : -1;
    } else return sortOrder === 'new-old' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt;
})}