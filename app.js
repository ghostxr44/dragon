/* ==========================================================================
   DRAGON SERVICE - Interactive Application & Audio Engine Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Ember & Particle Canvas Animation
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = -Math.random() * 0.8 - 0.2;
            this.alpha = Math.random() * 0.7 + 0.2;
            this.color = Math.random() > 0.4 ? '#ef4444' : '#fca5a5';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) {
                this.y = canvas.height + 5;
                this.x = Math.random() * canvas.width;
            }
            if (this.x < 0 || this.x > canvas.width) {
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 6;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const particleCount = Math.min(window.innerWidth / 18, 65);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 2. Audio Visualizer Waves Simulator
    const waveBars = document.querySelectorAll('.wave-bar');
    let isPlaying = false;
    let visualizerInterval = null;

    function updateVisualizer(active) {
        if (active) {
            visualizerInterval = setInterval(() => {
                waveBars.forEach((bar) => {
                    const heightPercent = Math.floor(Math.random() * 85) + 15;
                    bar.style.height = `${heightPercent}%`;
                });
            }, 90);
        } else {
            clearInterval(visualizerInterval);
            waveBars.forEach(bar => bar.style.height = '20%');
        }
    }

    // 3. Web Audio Synth Demo Engine (Plays sound when button is clicked)
    let audioCtx = null;
    let oscillator = null;
    let gainNode = null;
    let isSynthRunning = false;

    const demoPlayBtn = document.getElementById('demoPlayBtn');
    const trackNameDisplay = document.getElementById('trackNameDisplay');
    const progressBar = document.getElementById('progressBar');
    const currentTimeLabel = document.getElementById('currentTimeLabel');

    demoPlayBtn.addEventListener('click', () => {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isPlaying = !isPlaying;
        updateVisualizer(isPlaying);

        if (isPlaying) {
            demoPlayBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Parçayı Duraklat`;
            demoPlayBtn.style.background = 'linear-gradient(135deg, #22c55e, #15803d)';
            trackNameDisplay.textContent = `▶ Çalıyor: dragon.mp3`;
            trackNameDisplay.style.color = '#ef4444';

            // Start simulated progress
            startProgress();
        } else {
            demoPlayBtn.innerHTML = `<i class="fa-solid fa-folder-open"></i> Demo Parçayı Başlat`;
            demoPlayBtn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
            trackNameDisplay.textContent = `dragon.mp3`;
            trackNameDisplay.style.color = '#9ca3af';
            stopProgress();
        }
    });

    let progressTimer = null;
    let currentSeconds = 84; // 1:24
    const totalSeconds = 222; // 3:42

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function startProgress() {
        stopProgress();
        progressTimer = setInterval(() => {
            currentSeconds++;
            if (currentSeconds > totalSeconds) currentSeconds = 0;
            const pct = (currentSeconds / totalSeconds) * 100;
            progressBar.value = pct;
            currentTimeLabel.textContent = formatTime(currentSeconds);
        }, 1000);
    }

    function stopProgress() {
        if (progressTimer) clearInterval(progressTimer);
    }

    progressBar.addEventListener('input', (e) => {
        const val = e.target.value;
        currentSeconds = Math.floor((val / 100) * totalSeconds);
        currentTimeLabel.textContent = formatTime(currentSeconds);
    });

    // 4. Preset Buttons Interaction
    // Volume Presets
    const volButtons = document.querySelectorAll('[data-vol]');
    const volVal = document.getElementById('volVal');
    volButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            volButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const vol = btn.getAttribute('data-vol');
            volVal.textContent = `%${vol}`;
        });
    });

    // Pitch Presets
    const pitchButtons = document.querySelectorAll('[data-pitch]');
    const pitchSlider = document.getElementById('pitchSlider');
    const pitchVal = document.getElementById('pitchVal');

    pitchButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pitchButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const pitch = parseInt(btn.getAttribute('data-pitch'));
            pitchSlider.value = pitch;
            updatePitchText(pitch);
        });
    });

    pitchSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        pitchButtons.forEach(b => {
            if (parseInt(b.getAttribute('data-pitch')) === val) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        updatePitchText(val);
    });

    function updatePitchText(val) {
        if (val === 0) pitchVal.textContent = 'NORMAL (0)';
        else if (val === 6) pitchVal.textContent = '+6 (Nightcore)';
        else if (val > 0) pitchVal.textContent = `+${val} (İnce)`;
        else pitchVal.textContent = `${val} (Kalın)`;
    }

    // Bass Presets
    const bassButtons = document.querySelectorAll('[data-bass]');
    const bassVal = document.getElementById('bassVal');
    bassButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            bassButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const bass = btn.getAttribute('data-bass');
            bassVal.textContent = bass === '0' ? '0 dB' : `+${bass} dB`;
        });
    });

    // 8D & EQ Switch Toggles
    const btn8d = document.getElementById('btn8d');
    btn8d.addEventListener('click', () => {
        btn8d.classList.toggle('active');
        btn8d.textContent = btn8d.classList.contains('active') ? '8D AÇIK' : '8D KAPALI';
    });

    const btnEq = document.getElementById('btnEq');
    btnEq.addEventListener('click', () => {
        btnEq.classList.toggle('active');
        btnEq.textContent = btnEq.classList.contains('active') ? 'EQ AÇIK' : 'EQ KAPALI';
    });

    // 5. Add Token Simulation
    const addTokenBtn = document.getElementById('addTokenBtn');
    const tokenInput = document.getElementById('tokenInput');
    addTokenBtn.addEventListener('click', () => {
        const val = tokenInput.value.trim();
        if (val) {
            addTokenBtn.innerHTML = `<i class="fa-solid fa-check"></i> Eklendi!`;
            setTimeout(() => {
                addTokenBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add`;
            }, 1500);
        }
    });

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Start with default visualizer idle motion
    updateVisualizer(true);
});
