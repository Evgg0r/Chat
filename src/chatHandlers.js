import {URL_UPDATE_NAME} from "./const/constants.js";
import {loadMessageOnScroll, loadTokenUser, sendASocketMessage, toggleElementsVisibility} from "./utils.js";
import {fetchUpdateNameUser} from "./fetch.js";
import {state} from "./state.js";
import {INPUT_NAME_FORM, MESSAGE_TEXT_INPUT, SCREEN_SETTING} from "./const/selectors.js";


export function handleMessageSubmit(e) {
    e.preventDefault()
    const messageValue = MESSAGE_TEXT_INPUT.value.trim();

    if (!messageValue) {
        alert("Введите техт сообщения.");
        return;
    }

    sendASocketMessage(messageValue)
    e.target.reset();
}


export function handleUpdateNameClick(e) {
    e.preventDefault();

    let nameUpdate = INPUT_NAME_FORM.value.trim()

    if (!nameUpdate) {
        alert("Введите новое имя.");
        return;
    }

    fetchUpdateNameUser(URL_UPDATE_NAME, loadTokenUser(), nameUpdate)
        .then(() => {
            alert(`Имя изменено на ${nameUpdate}`);
            state.currentNameUser = nameUpdate;
        })
        .catch(() => {
            alert(`Имя пользователя на ${nameUpdate} не изменен`);
        });

    toggleElementsVisibility(SCREEN_SETTING, true)
    INPUT_NAME_FORM.value = ''
}


export function handleScrollLoad() {
    loadMessageOnScroll()
}