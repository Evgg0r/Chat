import {toggleElementsVisibility} from "./utils.js";
import {state} from "./state.js";
import {SCREEN_AUTHORIZATION, SCREEN_CHAT, SCREEN_CODE_CONFIRMATION, SCREEN_SETTING} from "./const/selectors.js";


export function toggleSettingsPopup() {
    toggleElementsVisibility(SCREEN_SETTING, true)
}


export function handleSwitchToCodeInput(e) {
    e.preventDefault()

    if (state.currentEmailUser === '') {
        alert("Код не был направлен на почту!");
        return
    }

    toggleElementsVisibility([SCREEN_AUTHORIZATION, SCREEN_CODE_CONFIRMATION])
}


export function handleBackToAuth() {
    toggleElementsVisibility([SCREEN_CODE_CONFIRMATION, SCREEN_AUTHORIZATION])
}


export function handleLogoutChat() {
    toggleElementsVisibility([SCREEN_CHAT, SCREEN_AUTHORIZATION])
}


export function handleExitAuth() {
    const userConfirmed = confirm('Решил уйти за хлебом?');

    if (userConfirmed) {
        window.location.href = 'https://google.com'
    }
}