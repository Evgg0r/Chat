import {
    MESSAGE_TEXT_INPUT,
    MESSAGE_FORM,
    MESSAGE_LIST,
    MESSAGE_TEMPLATE,
    BUTTON_SETTING,
    INPUT_EMAIL_FORM,
    BTN_SEND_CODE,
    SCREEN_AUTHORIZATION,
    SCREEN_CODE_CONFIRMATION,
    BTN_ENTER,
    INPUT_CODE_FORM,
    SCREEN_CHAT,
    URL,
    URL_VERIFICATION,
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


    templateLi.classList.add(isInComing ? "message--outgoing" : "message--incoming");
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


let emailCurrent = ''

BTN_SEND_CODE.addEventListener('click', (e) => {
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

        fetchSer(URL, emailValue)
            .then(response => {
                emailCurrent = emailValue
                SCREEN_AUTHORIZATION.style.display = "none";
                SCREEN_CODE_CONFIRMATION.style.display = "flex"
            })
            .catch(error => {
                console.error('Ошибка:', error);
                throw error;
            });
    }
)

BTN_ENTER.addEventListener('click',  (e) => {
        e.preventDefault()

        const valueCode = INPUT_CODE_FORM.value.trim();


        if (!valueCode) {
            alert("Введите код.");
            return;
        }

        fetchSer(URL_VERIFICATION, emailCurrent, valueCode)
            .then(response => {
                SCREEN_CODE_CONFIRMATION.style.display = "none"
                SCREEN_CHAT.style.display = "flex"
            })
            .catch(error => {
                console.error('Ошибка:', error);
                throw error;
            });
    }
);


async function fetchSer(url, email, code) {
    try {
        const bodyData = code === undefined ? {email: email} : {verificationCode: code, email: email};

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) throw new Error(`${response.status}`);
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}





























