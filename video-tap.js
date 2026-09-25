document.querySelectorAll('video').forEach(video => {
  video.addEventListener('click', (e) => {
    // Clicks on the native control bar are retargeted to the <video> element;
    // ignore the bottom strip so mute/volume/fullscreen don't toggle playback.
    const rect = video.getBoundingClientRect();
    if (e.clientY > rect.bottom - 40) return;

    video.classList.add('video-tap-active');

    const wasPaused = video.paused;
    requestAnimationFrame(() => {
      // Some browsers natively toggle playback on video click; only act
      // when the state has not already changed.
      if (video.paused === wasPaused) {
        if (wasPaused) video.play().catch(() => {});
        else video.pause();
      }
      video.classList.remove('video-tap-active');
    });
  });
});
