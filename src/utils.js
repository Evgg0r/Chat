export const currentTime = function () {
    let nowTime = new Date();
    return `${nowTime.getHours()}:${nowTime.getMinutes().toString().padStart(2, '0')}`
}