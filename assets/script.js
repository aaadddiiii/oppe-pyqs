const video = document.getElementById("video");
const screen = document.getElementById("screen");

async function fullscreen() {
    if (document.fullscreenElement) return;

    try {
        await screen.requestFullscreen();
    } catch (e) {}
}

async function play() {
    try {
        await video.play();
    } catch (e) {}

    await fullscreen();
}

window.addEventListener("load", play);