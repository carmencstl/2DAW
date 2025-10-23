"use strict"
        let musicPlaying = false;
        const music = document.getElementById('backgroundMusic');
        
        function toggleMusic() {
            if (musicPlaying) {
                music.pause();
                document.getElementById('musicStatus').textContent = 'play';
                musicPlaying = false;
            } else {
                music.play();
                document.getElementById('musicStatus').textContent = 'pause';
                musicPlaying = true;
            }
        }