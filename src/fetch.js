// export async function fetchUser(url, email, code) {
//     try {
//         let bodyData = code === undefined ? {email: email} : {verificationCode: code, email: email};
//
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(bodyData)
//         });
//
//         if (!response.ok) {
//             console.error(`Ошибка запроса: ${response.status}`);
//             return null
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Ошибка в fetchUser:', error);
//     }
// }
//
// export async function fetchUpdateNameUser(url, token, newName) {
//     try {
//         const response = await fetch(url, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({newName: newName})
//         });
//
//         if (!response.ok) {
//             console.error(`Ошибка запроса: ${response.status}`);
//             return null
//         }
//
//         return await response.json();
//     } catch (error) {
//         console.error('Ошибка в fetchUpdateNameUser:', error);
//     }
// }
//
// export async function fetchLoadingMessages(url, token) {
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             // body: JSON.stringify({newName: newName})
//         });
//
//         if (!response.ok) {
//             console.error(`Ошибка запроса: ${response.status}`);
//             return null
//         }
//
//         return await response.json();
//     } catch (error) {
//         console.error('Ошибка в fetchUpdateNameUser:', error);
//     }
// }

export async function fetchUser (url, email, code) {
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
        const headers = {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': `Bearer ${token}`}),
        };

        const config = {
            method,
            headers,
            ...(data && {body: JSON.stringify(data)}),
        };

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