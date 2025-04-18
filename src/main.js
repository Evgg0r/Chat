
document.querySelector('.user-panel__setting').addEventListener('click', showPopup)

function showPopup() {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.chat').classList.add('blur');
}

document.querySelector('.popup-header__button').addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.chat').classList.remove('blur');
});