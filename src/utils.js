import Cookies from 'js-cookie';
import {createMessageElement} from "./createEl.js";
import {NUMBER_OF_MESSAGES} from "./const/constants.js";
import {state} from "./state.js";
import {SOCKET} from "./const/socket.js"
import {MESSAGE_LIST, SCREEN_CHAT} from "./const/selectors.js";


function formatDateTime(value) {
    const date = new Date(value);
    const newData = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    const newTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

    return `${newData} ${newTime}`
}


export function renderMessage(newMassage) {
    const isOutgoing = newMassage.email !== state.currentEmailUser;
    const author = isOutgoing ? `Собеседник: ${newMassage.email}` : state.currentNameUser;
    const time = formatDateTime(newMassage.createdAt);
    const messageElement = createMessageElement(newMassage.text, author, isOutgoing, time);

    MESSAGE_LIST.appendChild(messageElement)
    MESSAGE_LIST.scrollTop = MESSAGE_LIST.scrollHeight;
}


export function renderAllMessages(messages) {
    messages.reverse().forEach(msg => {
        const isOutgoing = msg.senderEmail !== state.currentEmailUser;
        const author = isOutgoing ? `Собеседник: ${msg.senderEmail}` : state.currentNameUser;
        const time = formatDateTime(msg.createdAt);
        const messageElement = createMessageElement(msg.text, author, isOutgoing, time);

        MESSAGE_LIST.prepend(messageElement);
    })
}


export function loadTokenUser() {
    const tokenCookie = Cookies.get('tokenUser')
    return tokenCookie ?? null;
}


export function toggleHiddenElements(...elements) {
    elements.forEach(el => {
        if (el) {
            el.classList.toggle('hidden');
        }
    })
}


export function sendASocketMessage(text) {
    if (!SOCKET.connected) {
        return console.error('Отсутствует связь с сервером для отправки сообщения.');
    }

    SOCKET.emit('sendMessage', {
        token: loadTokenUser(),
        text: text,
    });
}


export function socketStart() {
    SOCKET.on('connect', () => {
        console.log('Connected with ID:', SOCKET.id);
    });

    SOCKET.on('message', (payload) => {
        renderMessage(payload)
    });

    SOCKET.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });

    SOCKET.on('disconnect', (reason) => {
        console.log('Disconnected:', reason);
    });
}


export function loadMessageOnScroll() {
    const scrollPosition = MESSAGE_LIST.scrollTop;

    if (scrollPosition === 0) {
        if (state.messages.length === 0) {
            alert("Вся история загружена")
            return;
        }

        if (state.messages.length < NUMBER_OF_MESSAGES) {
            const renderMessages = state.messages.splice(0, state.messages.length);
            renderAllMessages(renderMessages);
            return;
        }

        const renderMessages = state.messages.splice(state.messages.length - NUMBER_OF_MESSAGES, state.messages.length);
        renderAllMessages(renderMessages)
    }
}


export function toggleBlurScreenChat() {
    SCREEN_CHAT.classList.toggle('blur');
}


export function toggleElementsVisibility(screens, blur = false) {
    const elements = Array.isArray(screens) ? screens : [screens];
    toggleHiddenElements(...elements);
    if (blur) {
        toggleBlurScreenChat()
    }
}