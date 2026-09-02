const verify = document.getElementById("verify");
const check = document.getElementById("check");
const label = document.getElementById("label");
const status = document.getElementById("status");
const verification = document.getElementById("verification");
const screen = document.getElementById("screen");
const video = document.getElementById("video");
const ray = document.getElementById("ray");

ray.textContent = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
).join("");

function selectVideo() {
    const width = window.innerWidth;

    if (width <= 600) {
        return "assets/mobile.mp4";
    }

    if (width <= 1024) {
        return "assets/tablet.mp4";
    }

    return "assets/rick.mp4";
}

video.src = selectVideo();
video.loop = true;

verify.addEventListener("click", async () => {
    verify.disabled = true;
    check.classList.add("loading");
    label.textContent = "Verifying...";

    await new Promise(resolve => setTimeout(resolve, 1200));

    check.classList.remove("loading");
    check.classList.add("success");
    label.textContent = "Verification successful";
    status.style.display = "flex";

    verification.style.display = "none";
    screen.style.display = "block";

    video.currentTime = 0;

    try {
        await video.play();
    } catch (error) {
        console.error("Video playback failed:", error);

        video.muted = true;

        try {
            await video.play();
        } catch (error) {
            console.error("Muted video playback failed:", error);
        }
    }

    try {
        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
    } catch (error) {
        console.error("Fullscreen failed:", error);
    }
});

window.addEventListener("resize", () => {
    if (!video.paused) {
        return;
    }

    const newSource = selectVideo();

    if (video.src !== new URL(newSource, window.location.href).href) {
        video.src = newSource;
    }
});