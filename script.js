const translations = {
    id: {
        madeBy: "Dibuat dengan penuh cinta, oleh Abdo",
        happyBday: "Selamat Ulang Tahun",
        unitDays: "Hari",
        unitHours: "Jam",
        unitMins: "Menit",
        unitSecs: "Detik",
        btnWait: "Menunggu Momen...",
        btnEnter: "Masuk Sekarang",
        timelineTitle: "Perjalanan Kita",
        timelineSub: "Ketuk untuk membuka memori",
        mem1Title: "Foto Pertama",
        mem1Desc: '"Saat ini, aku sadar duniaku akan berubah."',
        mem2Title: "Pesan Suara Pertama",
        tapReveal: "Ketuk untuk melihat",
        tapHear: "Dengarkan suaranya",
        btnContinue: "Lanjutkan",
        matterTitle: "Mengapa Kamu Berarti?",
        matter1Title: "Kehadiran yang Menenangkan",
        matter1Desc: "Maychella, kamu memiliki cara luar biasa untuk membuat segalanya terasa lebih baik. Bukan hanya kecantikanmu, tapi ketulusan hatimu yang membuatku sangat menghargaimu.",
        matter2Title: "Inspirasi Tak Terhingga",
        matter2Desc: "Mengenalmu mendorongku untuk menjadi versi terbaik dari diriku. Caramu menghadapi hidup menginspirasiku untuk terus maju dengan penuh semangat.",
        btnFinal: "Satu Kejutan Lagi",
        surpriseTitle: "Kejutan Terakhir",
        surpriseDesc: "Klik tombol di bawah untuk mendengarkan pesan-pesan spesial yang telah kusiapkan.",
        btnOpenGift: "Buka Hadiah Suara",
        forever: "Selamanya Milikmu.",
        sounds: ["Melodi Pertama...", "Bisikan Hati...", "Janji Selamanya..."],
        loveMsg: "Aku mencintaimu, Maychella! ❤️"
    },
    en: {
        madeBy: "Made with love, by your man Abdo",
        happyBday: "Happy Birthday",
        unitDays: "Days",
        unitHours: "Hours",
        unitMins: "Minutes",
        unitSecs: "Seconds",
        btnWait: "Waiting for Moment...",
        btnEnter: "Enter Now",
        timelineTitle: "Our Journey",
        timelineSub: "Tap to reveal a memory",
        mem1Title: "First Photo",
        mem1Desc: '"In this moment, I knew my world would change."',
        mem2Title: "First Voice Message",
        tapReveal: "Tap to reveal",
        tapHear: "Tap to hear",
        btnContinue: "Continue",
        matterTitle: "Why You Matter?",
        matter1Title: "A Radiant Presence",
        matter1Desc: "Maychella, you have this incredible way of making the ordinary feel extraordinary. It is not just your beauty, but the integrity of your heart that I admire.",
        matter2Title: "Endless Inspiration",
        matter2Desc: "Knowing you pushes me to be the best version of myself. The way you navigate life inspires me to move forward with passion.",
        btnFinal: "One Last Surprise",
        surpriseTitle: "A Final Surprise",
        surpriseDesc: "Click the button below to listen to the special messages I have prepared for you.",
        btnOpenGift: "Open Voice Gift",
        forever: "Forever Yours.",
        sounds: ["First Harmony...", "Heart's Rhythm...", "Eternal Promise..."],
        loveMsg: "I love you, Maychella! ❤️"
    }
};

let currentLang = 'id';
const targetDate = new Date("2026-05-24T00:00:00+07:00").getTime();
let notePlayed = false;

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.getElementById('langBtn').innerText = currentLang === 'id' ? '🌐 EN' : '🌐 ID';
    applyLanguage();
}

function applyLanguage() {
    const langData = translations[currentLang];
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (key === 'btnWait' && !document.getElementById('enterBtn').disabled) {
            el.innerText = langData.btnEnter;
        } else {
            el.innerText = langData[key];
        }
    });
}

function createHearts() {
    const container = document.getElementById('heartContainer');
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '105vh';
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    heart.style.transition = `all ${Math.random() * 5 + 5}s linear`;
    container.appendChild(heart);
    setTimeout(() => {
        heart.style.top = '-10vh';
        heart.style.transform = `translateX(${Math.random() * 50 - 25}px) rotate(${Math.random() * 360}deg)`;
    }, 100);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHearts, 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const dist = targetDate - now;
    const d = Math.max(0, Math.floor(dist / (1000 * 60 * 60 * 24)));
    const h = Math.max(0, Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const m = Math.max(0, Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)));
    const s = Math.max(0, Math.floor((dist % (1000 * 60)) / 1000));

    document.getElementById("days").innerText = String(d).padStart(2, '0');
    document.getElementById("hours").innerText = String(h).padStart(2, '0');
    document.getElementById("minutes").innerText = String(m).padStart(2, '0');
    document.getElementById("seconds").innerText = String(s).padStart(2, '0');

    if (dist <= 0 && !notePlayed) {
        notePlayed = true;
        const btn = document.getElementById("enterBtn");
        btn.disabled = false;
        btn.innerText = translations[currentLang].btnEnter;
        new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3').play().catch(() => {});
    }
}

function navigateTo(n) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen' + n).classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

async function playFinalSequence() {
    const status = document.getElementById('audioStatus');
    const btn = document.getElementById('surpriseBtn');
    btn.disabled = true;
    const sounds = translations[currentLang].sounds;
    for (let s of sounds) {
        status.innerText = s;
        await new Promise(r => setTimeout(r, 2500));
    }
    status.innerText = translations[currentLang].loveMsg;
    btn.disabled = false;
    for(let i=0; i<30; i++) setTimeout(createHearts, i*100);
}

setInterval(updateCountdown, 1000);
updateCountdown();
applyLanguage();
