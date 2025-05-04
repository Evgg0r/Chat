import {handleBackToAuth, handleExitAuth, handleLogoutChat, handleSwitchToCodeInput, toggleSettingsPopup} from "./uiHandlers.js";
import {BTN_CLOSED_AUTHORIZATION, BTN_CLOSED_CODE_CHAT, BTN_CLOSED_CODE_CONFIRMATION, BTN_ENTER, BTN_NEW_NAME, BTN_SEND_CODE, BTN_VERIFY_CODE, BUTTON_SETTING, MESSAGE_FORM, MESSAGE_LIST, POPUP_BUTTON_CLOSE} from "./const/selectors.js";
import {handleEnterClick, handleSendCodeClick} from "./authHandlers.js";
import {handleMessageSubmit, handleScrollLoad, handleUpdateNameClick} from "./chatHandlers.js";


MESSAGE_FORM.addEventListener('submit', handleMessageSubmit);
MESSAGE_LIST.addEventListener('scroll', handleScrollLoad);
BTN_NEW_NAME.addEventListener('click', handleUpdateNameClick);

BTN_SEND_CODE.addEventListener('click', handleSendCodeClick);
BTN_ENTER.addEventListener('click', handleEnterClick);

BUTTON_SETTING.addEventListener('click', toggleSettingsPopup);
POPUP_BUTTON_CLOSE.addEventListener('click', toggleSettingsPopup);
BTN_VERIFY_CODE.addEventListener('click', handleSwitchToCodeInput);
BTN_CLOSED_CODE_CONFIRMATION.addEventListener('click', handleBackToAuth);
BTN_CLOSED_CODE_CHAT.addEventListener('click', handleLogoutChat);
BTN_CLOSED_AUTHORIZATION.addEventListener('click', handleExitAuth);