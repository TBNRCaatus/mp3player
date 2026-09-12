const audioPlayer = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");
const fileInput = document.getElementById("fileInput");
const songList = document.getElementById("songList");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

let songs = [];
let currentSong = 0;


// Add music files
fileInput.addEventListener("change", function () {

    songs = Array.from(fileInput.files);

    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const songElement = document.createElement("div");

        songElement.className = "song";
        songElement.textContent = song.name;

        songElement.addEventListener("click", function () {
            loadSong(index);
        });

        songList.appendChild(songElement);

    });

    if (songs.length > 0) {
        loadSong(0);
    }

});


// Load a song
function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audioPlayer.src = URL.createObjectURL(song);

    songTitle.textContent = song.name;

    audioPlayer.play();

}


// Play / pause
playButton.addEventListener("click", function () {

    if (audioPlayer.paused) {

        audioPlayer.play();

    } else {

        audioPlayer.pause();

    }

});


// Previous song
previousButton.addEventListener("click", function () {

    if (songs.length === 0) return;

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

});


// Next song
nextButton.addEventListener("click", function () {

    if (songs.length === 0) return;

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

});


// Automatically play next song
audioPlayer.addEventListener("ended", function () {

    if (songs.length === 0) return;

    // Generate a random delay between 20 and 60 seconds
    const delay = Math.floor(Math.random() * (60 - 20 + 1)) + 20;

    console.log(`Next song will play in ${delay} seconds.`);

    setTimeout(function () {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        loadSong(currentSong);

    }, delay * 1000);

});

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./service-worker.js")
            .then(function () {
                console.log("Service worker registered.");
            })
            .catch(function (error) {
                console.error("Service worker registration failed:", error);
            });

    });

}