import {
    MESSAGE_TEXT_INPUT,
    MESSAGE_FORM,
    MESSAGE_LIST,
    MESSAGE_TEMPLATE,
    BUTTON_SETTING,
} from "./constants.js";

import {
    currentTime
} from "./utils.js";


BUTTON_SETTING.addEventListener('click', showPopup)

function showPopup() {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.chat').classList.add('blur');
}

document.querySelector('.popup-header__button').addEventListener('click', function () {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.chat').classList.remove('blur');
});

const renderMessage = (text, isInComing = true) => {
    const templateContent = MESSAGE_TEMPLATE.content.cloneNode(true);
    const templateLi = templateContent.querySelector('.message');
    const templateLiText = templateLi.querySelector('.message__text');
    const templateLiAuthor = templateLi.querySelector('.message__author')
    const templateLiTime = templateLi.querySelector('.message__time')


    templateLi.classList.add(isInComing ? "message--outgoing" : "message--incoming" );
    templateLiAuthor.textContent = isInComing === true ? "Я:" : "Собеседник:";
    templateLiText.textContent = text;
    templateLiTime.textContent = currentTime();

    MESSAGE_LIST.appendChild(templateContent)
}


MESSAGE_FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    const messageValue = MESSAGE_TEXT_INPUT.value.trim();

    if (!messageValue) {
        alert("Введите техт собщения.");
        return;
    }

    renderMessage(messageValue);
    e.target.reset();
});

