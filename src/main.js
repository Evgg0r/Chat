import {
    MESSAGE_TEXT_INPUT,
    MESSAGE_FORM,
    BUTTON_SETTING,
    INPUT_EMAIL_FORM,
    BTN_SEND_CODE,
    SCREEN_AUTHORIZATION,
    SCREEN_CODE_CONFIRMATION,
    SCREEN_SETTING,
    BTN_ENTER,
    INPUT_CODE_FORM,
    SCREEN_CHAT,
    URL,
    URL_VERIFICATION,
    URL_UPDATE_NAME,
    ULR_LOADING_MESSAGES,
    INPUT_NAME_FORM,
    BTN_NEW_NAME,
} from "./constants.js";

import {
    renderMessageUser,
    renderAllMessages,
    loadTokenUser,
    toggleHiddenElements,
} from "./utils.js";

import {
    fetchUser,
    fetchUpdateNameUser,
    fetchLoadingMessages
} from "./fetch.js";


export let currentNameUser = "Я:";
let emailCurrent = '';


BUTTON_SETTING.addEventListener('click', showPopup)

function showPopup() {
    toggleHiddenElements(SCREEN_SETTING)
    document.querySelector('.chat').classList.add('blur');
}

document.querySelector('.popup-header__button').addEventListener('click', function () {
    toggleHiddenElements(SCREEN_SETTING)
    document.querySelector('.chat').classList.remove('blur');
});


MESSAGE_FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    const messageValue = MESSAGE_TEXT_INPUT.value.trim();

    if (!messageValue) {
        alert("Введите техт собщения.");
        return;
    }

    renderMessageUser(messageValue);
    e.target.reset();
});

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

        fetchUser(URL, emailValue)
            .then(response => {
                emailCurrent = emailValue
                alert(response.message);
                toggleHiddenElements(SCREEN_AUTHORIZATION, SCREEN_CODE_CONFIRMATION)
            })
            .catch(error => {
                alert(`Ошибка: ${error}`);
            });
    }
)

BTN_ENTER.addEventListener('click', (e) => {
        e.preventDefault()

        let valueCode = INPUT_CODE_FORM.value.trim();

        if (!valueCode) {
            alert("Введите код.");
            return;
        }

        fetchUser(URL_VERIFICATION, emailCurrent, valueCode)
            .then(response => {
                document.cookie = `tokenUser=${encodeURIComponent(response.token)}; path/`
                alert(!response.message ? 'Вход выполнен' : null);
                toggleHiddenElements(SCREEN_CODE_CONFIRMATION, SCREEN_CHAT)
            })
            .catch(() => {
                alert(`Сообщения с сервера не загружены`);
            });

        fetchLoadingMessages(ULR_LOADING_MESSAGES, loadTokenUser())
            .then(response => {
                renderAllMessages(response)
            })
            .catch(error => {
                console.error("Ошибка в цепочке Promise:", error);
            })
    }
);

BTN_NEW_NAME.addEventListener('click', (e) => {
    e.preventDefault();

    let nameUpdate = INPUT_NAME_FORM.value.trim()

    if (!nameUpdate) {
        alert("Введите новое имя.");
        return;
    }

    fetchUpdateNameUser(URL_UPDATE_NAME, loadTokenUser(), nameUpdate)
        .then(() => {
            alert(`Имя изменено ${nameUpdate}`);
            currentNameUser = nameUpdate;
        })
        .catch(() => {
            alert(`Имя пользователя на ${nameUpdate} не изменен`);
        });
})

