import refreshToken from "./refreshToken";

export default async function authFetch(url, options = {}){
    let accessToken = localStorage.getItem('accessToken');

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type' : 'application/json',
        }
    })

     if (response.status === 401 || response.status === 403) {
        accessToken = await refreshToken();
        if (!accessToken) throw new Error('Session Expired');

        const retry = await fetch (url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          return retry;
     }
     return response;
}