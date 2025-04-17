export default async function refreshToken(){
    const token = localStorage.getItem('refreshToken');
    if (!token) return null;

    try {
        const res = await fetch('https://etbackend-production.up.railway.app/token', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        })

        if (!res.ok) throw new Error('Failed to refresh token')

        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken)    

        return data.accessToken
    } catch (error) {
        console.error(error);
        return null
    }
}