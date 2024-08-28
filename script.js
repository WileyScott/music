let currentAudio = null;

document.querySelectorAll('.audio-player').forEach(player => {
    const audio = new Audio(player.getAttribute('data-audio'));
    const playBtn = player.querySelector('.play-btn');
    const progressBar = player.querySelector('.progress-bar');
    const trackProgress = player.querySelector('.track-progress');
    const time = player.querySelector('.time');

    playBtn.addEventListener('click', () => {
        // If there's an audio currently playing and it's not the one that was clicked
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            document.querySelector('.playing').classList.remove('playing');
        }

        // Play or pause the clicked audio
        if (audio.paused) {
            audio.play();
            playBtn.classList.add('playing');
            currentAudio = audio; // Set this as the current audio
        } else {
            audio.pause();
            playBtn.classList.remove('playing');
            currentAudio = null; // No audio is currently playing
        }
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';
        time.textContent = formatTime(audio.currentTime);
    });

    trackProgress.addEventListener('click', (e) => {
        const width = trackProgress.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    audio.addEventListener('ended', () => {
        playBtn.classList.remove('playing');
        progressBar.style.width = '0%';
        time.textContent = '0:00';
        currentAudio = null; // Reset currentAudio when the track ends
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
