document.querySelectorAll('video').forEach(video => {
  video.addEventListener('click', () => {
    video.classList.add('video-tap-active');

    const wasPaused = video.paused;
    requestAnimationFrame(() => {
      // Some browsers natively toggle playback on video click; only act
      // when the state has not already changed.
      if (video.paused === wasPaused) {
        if (wasPaused) video.play();
        else video.pause();
      }
      video.classList.remove('video-tap-active');
    });
  });
});
