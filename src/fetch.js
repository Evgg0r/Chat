export async function fetchUser(url, email, code) {
    return fetchData({
        url,
        method: 'POST',
        data: code === null ? {email: email} : {verificationCode: code, email: email},
    })
}

export async function fetchUpdateNameUser(url, token, newName) {
    return fetchData({
        url,
        method: 'PATCH',
        data: {newName: newName},
        token,
    })
}

export async function fetchLoadingMessages(url, token) {
    return fetchData({
        url,
        method: 'GET',
        token,
    });
}

async function fetchData({url, method = 'GET', data = null, token = null}) {
    try {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (data) {
            config.body = JSON.stringify(data)
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            console.error(`Ошибка запроса: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка в fetchData:', error)
        return null
    }
}