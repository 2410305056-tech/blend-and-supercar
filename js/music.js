// ===================================================
// BLEND & SUPERCAR - Music Player (YouTube IFrame API)
// Optimized for Chrome browser
// ===================================================

const MusicPlayer = {
    player: null,
    isReady: false,
    isPlaying: false,
    currentTrack: 0,
    volume: 70,
    progressTimer: null,

    // User's YouTube Music tracks
    tracks: [
        { id: 'enidMo5izlE', title: 'Chill Vibes Mix', artist: 'Blend & Supercar Radio' },
        { id: 'lGO21pNVLK8', title: 'Midnight Jazz', artist: 'Blend & Supercar Radio' },
        { id: 'aaYtQCmn_HQ', title: 'Luxury Lounge', artist: 'Blend & Supercar Radio' },
        { id: 'rq5zSN_JwQE', title: 'Golden Hour', artist: 'Blend & Supercar Radio' }
    ],

    init() {
        try {
            this.currentTrack = parseInt(localStorage.getItem('bs-music-track') || '0');
            this.volume = parseInt(localStorage.getItem('bs-music-volume') || '70');
            if (this.currentTrack >= this.tracks.length) this.currentTrack = 0;
        } catch (e) { }

        this.updateUI();

        // Create a hidden container for the YT player
        let container = document.getElementById('yt-music-box');
        if (!container) {
            container = document.createElement('div');
            container.id = 'yt-music-box';
            container.style.cssText = 'position:fixed;width:1px;height:1px;bottom:-100px;left:-100px;overflow:hidden;opacity:0;pointer-events:none';
            document.body.appendChild(container);
        }
        // Inner div for YT player to target
        container.innerHTML = '<div id="yt-music-player"></div>';

        // Load the YouTube IFrame API
        if (window.YT && window.YT.Player) {
            // API already loaded from a previous page
            this._buildPlayer();
        } else {
            // Set the global callback
            window.onYouTubeIframeAPIReady = () => {
                console.log('[Music] YouTube IFrame API loaded ✓');
                this._buildPlayer();
            };
            // Load the script
            if (!document.getElementById('yt-api-script')) {
                const s = document.createElement('script');
                s.id = 'yt-api-script';
                s.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(s);
                console.log('[Music] Loading YouTube API script...');
            }
        }
    },

    _buildPlayer() {
        try {
            const videoId = this.tracks[this.currentTrack].id;
            console.log('[Music] Creating player with video:', videoId);

            this.player = new YT.Player('yt-music-player', {
                width: '1',
                height: '1',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0
                },
                events: {
                    onReady: (event) => {
                        console.log('[Music] Player ready ✓');
                        this.isReady = true;
                        event.target.setVolume(this.volume);
                        this.updateUI();
                        this.updateVolumeUI();
                    },
                    onStateChange: (event) => {
                        const state = event.data;
                        console.log('[Music] State changed:', state);
                        if (state === 1) {
                            // PLAYING
                            this.isPlaying = true;
                            this._startProgress();
                            this.updateUI();
                        } else if (state === 2) {
                            // PAUSED
                            this.isPlaying = false;
                            this._stopProgress();
                            this.updateUI();
                        } else if (state === 0) {
                            // ENDED - go to next
                            this.isPlaying = false;
                            this._stopProgress();
                            this.updateUI();
                            this.next();
                        }
                    },
                    onError: (event) => {
                        console.warn('[Music] Error code:', event.data);
                        // Skip to next track on error
                        setTimeout(() => this.next(), 2000);
                    }
                }
            });
        } catch (err) {
            console.error('[Music] Failed to create player:', err);
        }
    },

    togglePlay() {
        if (!this.isReady || !this.player) {
            console.log('[Music] Player not ready yet, waiting...');
            return;
        }
        try {
            if (this.isPlaying) {
                this.player.pauseVideo();
                console.log('[Music] Pausing');
            } else {
                this.player.playVideo();
                console.log('[Music] Playing');
            }
        } catch (err) {
            console.warn('[Music] Toggle error:', err);
        }
    },

    next() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        console.log('[Music] Next track:', this.tracks[this.currentTrack].title);
        this._switchTrack();
    },

    prev() {
        // If more than 3s in, restart current track
        if (this.isReady && this.player) {
            try {
                if (this.player.getCurrentTime() > 3) {
                    this.player.seekTo(0, true);
                    return;
                }
            } catch (e) { }
        }
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        console.log('[Music] Prev track:', this.tracks[this.currentTrack].title);
        this._switchTrack();
    },

    _switchTrack() {
        try { localStorage.setItem('bs-music-track', this.currentTrack); } catch (e) { }
        this.updateUI();

        if (this.isReady && this.player) {
            try {
                const track = this.tracks[this.currentTrack];
                this.player.loadVideoById({
                    videoId: track.id,
                    startSeconds: 0
                });
                console.log('[Music] Loaded:', track.title);
            } catch (err) {
                console.warn('[Music] Load error:', err);
            }
        }
    },

    setVolume(v) {
        this.volume = Math.max(0, Math.min(100, Math.round(v)));
        if (this.isReady && this.player) {
            try {
                this.player.setVolume(this.volume);
                this.player.unMute();
            } catch (e) { }
        }
        try { localStorage.setItem('bs-music-volume', this.volume); } catch (e) { }
        this.updateVolumeUI();
    },

    toggleMute() {
        if (!this.isReady || !this.player) return;
        try {
            if (this.player.isMuted()) { this.player.unMute(); }
            else { this.player.mute(); }
        } catch (e) { }
        this.updateVolumeUI();
    },

    _startProgress() {
        this._stopProgress();
        this.progressTimer = setInterval(() => {
            if (!this.isReady || !this.player) return;
            try {
                const cur = this.player.getCurrentTime() || 0;
                const dur = this.player.getDuration() || 1;
                const pct = (cur / dur) * 100;
                const fill = document.querySelector('.progress-fill');
                const timeEl = document.getElementById('currentTime');
                const durationEl = document.getElementById('totalTime');
                if (fill) fill.style.width = pct + '%';
                if (timeEl) timeEl.textContent = this._fmt(cur);
                if (durationEl) durationEl.textContent = this._fmt(dur);
            } catch (e) { }
        }, 500);
    },

    _stopProgress() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    },

    updateUI() {
        const t = this.tracks[this.currentTrack];
        const titleEl = document.querySelector('.song-title');
        const artistEl = document.querySelector('.song-artist');
        const playBtn = document.querySelector('.play-btn');
        if (titleEl && t) titleEl.textContent = t.title;
        if (artistEl && t) artistEl.textContent = t.artist;
        if (playBtn) playBtn.textContent = this.isPlaying ? '⏸' : '▶';
    },

    updateVolumeUI() {
        const fill = document.querySelector('.volume-fill');
        const muteBtn = document.getElementById('muteBtn');
        if (fill) fill.style.width = this.volume + '%';
        if (muteBtn) {
            let muted = false;
            try { if (this.isReady && this.player) muted = this.player.isMuted(); } catch (e) { }
            muteBtn.textContent = muted ? '🔇' : (this.volume > 50 ? '🔊' : '🔉');
        }
    },

    _fmt(sec) {
        if (!sec || isNaN(sec)) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return m + ':' + String(s).padStart(2, '0');
    },

    bindControls() {
        // Clone-replace to prevent duplicate listeners
        const bind = (id, fn) => {
            const el = document.getElementById(id);
            if (!el) return;
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);
            clone.addEventListener('click', fn);
        };

        bind('playBtn', () => this.togglePlay());
        bind('prevBtn', () => this.prev());
        bind('nextBtn', () => this.next());
        bind('muteBtn', () => this.toggleMute());

        // Progress bar seek
        const prog = document.querySelector('.progress-bar');
        if (prog) {
            const np = prog.cloneNode(true);
            prog.parentNode.replaceChild(np, prog);
            np.addEventListener('click', (e) => {
                if (!this.isReady || !this.player) return;
                try {
                    const rect = np.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    const dur = this.player.getDuration();
                    if (dur) this.player.seekTo(pct * dur, true);
                } catch (e) { }
            });
        }

        // Volume slider
        const vol = document.querySelector('.volume-slider');
        if (vol) {
            const nv = vol.cloneNode(true);
            vol.parentNode.replaceChild(nv, vol);
            nv.addEventListener('click', (e) => {
                const rect = nv.getBoundingClientRect();
                this.setVolume(((e.clientX - rect.left) / rect.width) * 100);
            });
        }

        this.updateUI();
        this.updateVolumeUI();
    }
};
