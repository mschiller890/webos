function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('time').textContent = time;
}

const wallpapers = {
    // from https://wall.alphacoders.com/big.php?i=1315811
    miku: 'assets/wallpapers/miku.jpg',
    meiko: 'assets/wallpapers/meiko.jpg',
    kaito: 'assets/wallpapers/kaito.jpg',
    kagaminetwins: 'assets/wallpapers/kagaminetwins.jpg',
    gumi: 'assets/wallpapers/gumi.jpg'
};

function setBackgroundImage(name = 'miku') {
    document.body.style.backgroundImage = `url(${wallpapers[name]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
}

updateTime();
setInterval(updateTime, 1000);
setBackgroundImage();