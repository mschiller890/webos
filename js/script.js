function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("time").textContent = time;
}

updateTime();
setInterval(updateTime, 1000);

const wallpapers = {
    // from https://wall.alphacoders.com/big.php?i=1315811
    miku: "assets/wallpapers/miku.jpg",
    // from https://wall.alphacoders.com/big.php?i=1197047
    meiko: "assets/wallpapers/meiko.png",
    kaito: "assets/wallpapers/kaito.jpg",
    kagaminetwins: "assets/wallpapers/kagaminetwins.jpg",
    gumi: "assets/wallpapers/gumi.jpg"
};

function setBackgroundImage(name = "miku") {
    document.body.style.backgroundImage = `url(${wallpapers[name]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}

const savedWallpaper = localStorage.getItem("wallpaper") || "miku";
setBackgroundImage(savedWallpaper);

document.getElementById("wallpaper-select").value = savedWallpaper;

let highestZ = 1000;

function focusWindow(win) {
    highestZ++;
    win.style.zIndex = highestZ;
}

function makeWindowDraggable(windowId, buttonId, closeId, openOnLoad = false) {
    const windowEl = document.getElementById(windowId);
    const titleBar = windowEl.querySelector(".window-titlebar");
    const openButton = buttonId ? document.getElementById(buttonId) : null;
    const closeButton = document.getElementById(closeId);

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    if (openButton) {
        openButton.addEventListener("click", () => {
            windowEl.classList.remove("closing");
            windowEl.classList.add("open");
            focusWindow(windowEl);
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            if (windowEl.classList.contains("closing")) return;
            
            windowEl.classList.add("closing");

            setTimeout(() => {
                windowEl.classList.remove("closing");
                windowEl.classList.remove("open");
            }, 220);
        });
    }

    windowEl.addEventListener("mousedown", () => {
        focusWindow(windowEl);
    });

    titleBar.addEventListener("mousedown", (e) => {
        if (e.target.closest(".window-controls")) return;

        dragging = true;
        focusWindow(windowEl);

        const rect = windowEl.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        console.log("move");

        const rect = windowEl.getBoundingClientRect();

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        windowEl.style.left = `${newX}px`;
        windowEl.style.top = `${newY}px`;
    });

    document.addEventListener("mouseup", () => {
        dragging = false;

        console.log("up");
        console.log(windowEl);
        console.log(titleBar);
    });

    if (openOnLoad) {
        windowEl.classList.add("open");
        focusWindow(windowEl);
    }
}

const wallpaperSelect = document.getElementById("wallpaper-select");
wallpaperSelect.addEventListener("change", () => {
    const wallpaper = wallpaperSelect.value;

    setBackgroundImage(wallpaper);
    localStorage.setItem("wallpaper", wallpaper);
});

const browserGo = document.getElementById("browser-go");
const browserUrl = document.getElementById("browser-url");
const browserFrame = document.getElementById("browser-iframe");
// console.log(browserFrame);
const backButton = document.getElementById("browser-back");
const forwardButton = document.getElementById("browser-forward");
const refreshButton = document.getElementById("browser-refresh");

browserGo.addEventListener("click", () => {
    let url = browserUrl.value.trim();
    if (!url) return;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
    }

    browserFrame.src = url;
});

browserUrl.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        browserGo.click();
    }
});

backButton.addEventListener("click", () => {
    browserFrame.contentWindow.history.back();
});

forwardButton.addEventListener("click", ()=> {
    browserFrame.contentWindow.history.forward();
});

refreshButton.addEventListener("click", () => {
    browserFrame.contentWindow.location.reload();
});

makeWindowDraggable("settings-window", "settings-button", "settings-close");
makeWindowDraggable("welcome-window", null, "welcome-close", true);
makeWindowDraggable("about-window", "about-button", "about-close");
makeWindowDraggable("browser-window", "browser-button", "browser-close");