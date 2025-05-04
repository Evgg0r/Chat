import Cookies from "js-cookie";
import {INPUT_CODE_FORM, INPUT_EMAIL_FORM, MESSAGE_LIST, SCREEN_CHAT, SCREEN_CODE_CONFIRMATION} from "./const/selectors.js";
import {state} from "./state.js"
import {fetchLoadingMessages, fetchUser} from "./fetch.js";
import {loadTokenUser, renderAllMessages, socketStart, toggleElementsVisibility} from "./utils.js";
import {URL ,NUMBER_OF_MESSAGES, URL_LOADING_MESSAGES, URL_VERIFICATION} from "./const/constants.js";


export function handleSendCodeClick(e) {
    e.preventDefault()

    const emailValue = INPUT_EMAIL_FORM.value.trim();

    if (!emailValue) {
        alert("Введите email.");
        return;
    }

    if (!emailValue.includes('@')) {
        alert("Введите корректный email.");
        return;
    }

    fetchUser(URL, emailValue)
        .then(response => {
            alert(response.message);
            state.currentEmailUser = emailValue;
        })
        .catch(error => {
            alert(`Ошибка: ${error}`);
        });
}


export function handleEnterClick(e) {
    e.preventDefault()

    let valueCode = INPUT_CODE_FORM.value.trim();

    if (!valueCode) {
        alert("Введите код.");
        return;
    }

    fetchUser(URL_VERIFICATION, state.currentEmailUser, valueCode)
        .then(response => {
            Cookies.set('tokenUser', response.token)

            if (response.token) {
                alert('Вход выполнен!');
            } else {
                alert(response.message || 'Ошибка входа'); }

            toggleElementsVisibility([SCREEN_CODE_CONFIRMATION, SCREEN_CHAT]);
            return fetchLoadingMessages(URL_LOADING_MESSAGES, loadTokenUser())
                .then(response => {
                    state.messages = response;
                    socketStart()
                    const renderMessages = state.messages.splice(state.messages.length - NUMBER_OF_MESSAGES, state.messages.length);
                    renderAllMessages(renderMessages)
                    MESSAGE_LIST.scrollTop = MESSAGE_LIST.scrollHeight;
                })
                .catch(error => {
                    console.error("Ошибка при загрузке сообщений!", error);
                })
        })
        .catch(() => {
            alert(`Неверный код, попробуйте еще!`);
        });
}