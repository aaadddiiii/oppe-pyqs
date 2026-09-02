const video = document.getElementById("video");
const screen = document.getElementById("screen");
const start = document.getElementById("start");

async function fullscreen() {
    if (document.fullscreenElement) return;
    try {
        await screen.requestFullscreen();
    } catch (e) {}
}

async function play() {
    try {
        await video.play();
        start.hidden = true;
        await fullscreen();
    } catch (e) {
        start.hidden = false;
    }
}

start.addEventListener("click", async () => {
    start.hidden = true;
    await fullscreen();
    try {
        await video.play();
    } catch (e) {
        start.hidden = false;
    }
});

window.addEventListener("load", play);