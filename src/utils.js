import {createMessageElement} from "./createEl.js";
import {MESSAGE_LIST} from "./constants.js";
import {currentNameUser} from "./main.js";

function currentTime () {
    let nowTime = new Date();
    return convectorDate(nowTime);
    // return `${nowTime.getHours()}:${nowTime.getMinutes().toString().padStart(2, '0')}`
}

function convectorDate(value) {
    const date = new Date(value);
    const newData = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    const newTime = `${date.getHours()}:${date.getMinutes()}`

    return `${newData} ${newTime}`
}

export function renderMessageUser(text, isInComing = true) {
    const author = isInComing === true ? currentNameUser : "Собеседник:";
    const time = currentTime();
    const messageElement = createMessageElement(text, author, !isInComing, time);

    MESSAGE_LIST.appendChild(messageElement)
    MESSAGE_LIST.scrollTop = MESSAGE_LIST.scrollHeight;
}

export function renderAllMessages(messages) {
    MESSAGE_LIST.innerHTML = ''
    messages.forEach(msg => {
        const isOutgoing = msg.senderEmail !== undefined;
        const author = isOutgoing ? `Собеседник: ${msg.senderEmail}`: currentNameUser;
        const time = convectorDate(msg.createdAt);
        const messageElement = createMessageElement(msg.text, author, isOutgoing, time);

        MESSAGE_LIST.appendChild(messageElement);
    })
    MESSAGE_LIST.scrollTop = MESSAGE_LIST.scrollHeight;
}

export function loadTokenUser() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tokenCookie = cookies.find(cookie => cookie.startsWith('tokenUser='));
    if (tokenCookie) {
        return decodeURIComponent(tokenCookie.split('=')[1]);
    }
    return null
}

export function toggleHiddenElements(...elements) {
    elements.forEach(el => {
        if (el) {
            el.classList.toggle('hidden');
        }
    })
}