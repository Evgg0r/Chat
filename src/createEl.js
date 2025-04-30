import {MESSAGE_TEMPLATE} from "./constants.js";

export function createMessageElement(text, author, isOutgoing, time) {
    const templateContent = MESSAGE_TEMPLATE.content.cloneNode(true);
    const templateLi = templateContent.querySelector('.message');
    const templateLiText = templateLi.querySelector('.message__text');
    const templateLiAuthor = templateLi.querySelector('.message__author');
    const templateLiTime = templateLi.querySelector('.message__time');

    templateLi.classList.add(isOutgoing ? "message--outgoing" : "message--incoming");
    templateLiAuthor.textContent = author;
    templateLiText.textContent = text;
    templateLiTime.textContent = time;

    return templateContent;
}