// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupPasswordScreen();
});

function initializeWebsite() {
    createConfetti();
    setupEventListeners();
}

// Password Protection System
function setupPasswordScreen() {
    const passwordInput = document.getElementById('passwordInput');
    const glitchEffect1 = document.getElementById('glitchEffect1');
    
    // Play glitch effect 1 when password screen loads
    glitchEffect1.play().catch(() => {
        // If autoplay fails, play on first user interaction
        document.body.addEventListener('click', () => {
            glitchEffect1.play();
        }, { once: true });
    });
    
    // Allow Enter key to verify password
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });
}

function verifyPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    const correctPassword = 'Veryeasy';
    const errorMessage = document.getElementById('errorMessage');
    const passwordScreen = document.getElementById('passwordScreen');
    const passwordContainer = document.querySelector('.password-container');
    const glitchEffect1 = document.getElementById('glitchEffect1');
    const bgMusic = document.getElementById('bgMusic');
    
    if (password === correctPassword) {
        // Correct password - Grant access with smooth animation
        errorMessage.textContent = 'ACCESS GRANTED';
        errorMessage.style.color = '#0f0';
        passwordContainer.classList.add('access-granted');
        
        // Stop glitch effect 1 and start background music
        glitchEffect1.pause();
        glitchEffect1.currentTime = 0;
        accessGranted = true;
        bgMusic.play().catch(() => {});
        
        setTimeout(() => {
            passwordScreen.classList.remove('active');
            document.getElementById('landing').classList.add('active');
        }, 2000);
    } else {
        // Wrong password - Intense hack glitch effect
        errorMessage.textContent = 'ACCESS DENIED - SYSTEM BREACH DETECTED';
        triggerHackGlitch();
    }
}

function triggerHackGlitch() {
    const passwordScreen = document.getElementById('passwordScreen');
    const passwordContainer = document.querySelector('.password-container');
    const glitchEffect2 = document.getElementById('glitchEffect2');
    
    // Play glitch effect 2 for wrong password
    glitchEffect2.currentTime = 0;
    glitchEffect2.play().catch(() => {});
    
    // Create hack overlay
    const hackOverlay = document.createElement('div');
    hackOverlay.className = 'hack-overlay';
    document.body.appendChild(hackOverlay);
    
    // Add hack glitch class
    passwordContainer.classList.add('hack-glitch');
    
    // Create random glitch text
    const glitchText = document.querySelector('.glitch-text');
    const originalText = glitchText.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    let glitchInterval = setInterval(() => {
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.5) {
                scrambled += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                scrambled += originalText[i];
            }
        }
        glitchText.textContent = scrambled;
    }, 50);
    
    // Screen color flash
    let colorFlash = setInterval(() => {
        passwordScreen.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }, 100);
    
    // Stop after 3 seconds
    setTimeout(() => {
        clearInterval(glitchInterval);
        clearInterval(colorFlash);
        passwordContainer.classList.remove('hack-glitch');
        hackOverlay.remove();
        glitchText.textContent = originalText;
        passwordScreen.style.background = '#000';
        document.getElementById('passwordInput').value = '';
    }, 3000);
}

// Confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#ffa07a', '#98fb98', '#87ceeb', '#dda0dd', '#f0e68c'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);

// Section Navigation
function enterSite() {
    hideSection('landing');
    showSection('memories');
    startSlideshow();
}

function nextSection(sectionId) {
    const currentSection = document.querySelector('.section.active');
    hideSection(currentSection.id);
    showSection(sectionId);
    
    // Trigger specific animations/functions for each section
    if (sectionId === 'quiz') {
        initMemoryGame();
    } else if (sectionId === 'reasons') {
        startReasonCounter();
    } else if (sectionId === 'countdown') {
        startTimer();
        createSparkles();
    } else if (sectionId === 'finale') {
        startFireworks();
        startTypingEffect();
    }
}

function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.remove('active');
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.add('active');
}

// Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function startSlideshow() {
    setInterval(() => {
        changeSlide(1);
    }, 3000);
}

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
}

// Secret Note
function showSecretNote() {
    document.getElementById('secretPopup').classList.add('show');
}

function closeSecretNote() {
    document.getElementById('secretPopup').classList.remove('show');
}

// Cake Cutting
function cutCake() {
    const cake = document.getElementById('cakeImage');
    cake.style.transition = 'all 0.5s';
    cake.style.transform = 'scale(0.8)';
    cake.style.opacity = '0.5';
    
    setTimeout(() => {
        cake.style.display = 'none';
        document.getElementById('cutCakeBtn').style.display = 'none';
        createBalloons();
        document.getElementById('continueAfterCake').style.display = 'inline-block';
    }, 500);
}

function createBalloons() {
    const container = document.getElementById('balloons');
    const colors = ['#ff6b9d', '#87ceeb', '#98fb98', '#ffa07a', '#dda0dd'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = Math.random() * 90 + '%';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 4000);
        }, i * 200);
    }
}

// Game
function wrongChoice() {
    // Add shake animation to wrong choice
    const gameArea = document.querySelector('.game-area');
    gameArea.style.animation = 'shake 0.5s';
    setTimeout(() => {
        gameArea.style.animation = '';
    }, 500);
}

function foundSquirrel() {
    document.getElementById('gamePopup').classList.add('show');
    document.getElementById('continueAfterGame').style.display = 'inline-block';
}

function closeGamePopup() {
    document.getElementById('gamePopup').classList.remove('show');
}

// Voice Note
let bgMusic;
let voiceNote;
let isPlaying = false;
let accessGranted = false;

function setupEventListeners() {
    bgMusic = document.getElementById('bgMusic');
    voiceNote = document.getElementById('voiceNote');
    
    // Auto-start background music only after password is correct
    document.body.addEventListener('click', () => {
        if (accessGranted && bgMusic && bgMusic.paused) {
            bgMusic.play().catch(() => {});
        }
    }, { once: true });
}

function playVoiceNote() {
    const btn = document.getElementById('playVoiceBtn');
    const icon = document.getElementById('voiceIcon');
    const text = document.getElementById('voiceText');
    
    if (!isPlaying) {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
        }
        bgMusic.volume = 0.3;
        
        voiceNote.play().catch(() => {
            alert('thank you sun ne ke liye -.+');
        });
        
        icon.textContent = '⏸️';
        text.textContent = 'Pause';
        isPlaying = true;
        
        voiceNote.onended = () => {
            bgMusic.volume = 1.0;
            icon.textContent = '🎧';
            text.textContent = 'Play Message';
            isPlaying = false;
        };
    } else {
        voiceNote.pause();
        bgMusic.volume = 1.0;
        icon.textContent = '🎧';
        text.textContent = 'Play Message';
        isPlaying = false;
    }
}

// Fireworks
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }
    
    const particles = [];
    const colors = ['#ff6b9d', '#ffa07a', '#98fb98', '#87ceeb', '#dda0dd', '#ffd700'];
    
    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    setInterval(createFirework, 800);
}

// Memory Game
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameStartTime = null;
let gameTimerInterval = null;

function initMemoryGame() {
    memoryCards = document.querySelectorAll('.memory-card');
    
    // Shuffle cards
    const gameContainer = document.getElementById('memoryGame');
    const cardsArray = Array.from(memoryCards);
    cardsArray.sort(() => Math.random() - 0.5);
    cardsArray.forEach(card => gameContainer.appendChild(card));
    
    // Add click event to each card
    memoryCards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCards.length >= 2) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    
    // Start timer on first move
    if (moves === 0) {
        startGameTimer();
    }
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moveCount').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.card === card2.dataset.card;
    
    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        
        // Check if game is complete
        if (matchedPairs === 6) {
            setTimeout(gameComplete, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startGameTimer() {
    gameStartTime = Date.now();
    gameTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('gameTimer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function gameComplete() {
    clearInterval(gameTimerInterval);
    const timeText = document.getElementById('gameTimer').textContent;
    
    document.getElementById('gameWinMessage').style.display = 'block';
    document.getElementById('winStats').textContent = 
        `Moves: ${moves} | Time: ${timeText}`;
    document.getElementById('quizContinue').style.display = 'inline-block';
    
    // Create celebration hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
}

// Reasons Counter with animated hearts and reasons
const reasons = [
    { title: "Apke Baat Karne Ka Tarika", text: "Mujhe Bahot Pyara Lagta Please never change that ✨" },
    { title: "Nakhre -.+ ", text: "Nakhre Bade Pyare Hote apke kasam se  💕" },
    { title: "Apki vo Pyari Avaj hehe", text: "Please mere sath hona aap to baby vali voice use kiya karo Hehe 💕 " },
    { title: "Apki Drawings >.< ", text: "Apki Drawings Sachmee Bahotttt Pyariiii Hotiiiii 🎨" },
    { title: "Aapke bare kya bolu aur 😭", text: "Aap Bahot Khubsurat Hooo Kasam se 😭" },
    { title: "Aur Chai ke bare kya bolu 🥲", text: "Aap Aaj Kal Bahot Akele Chai Pite Ye Galat Baat Haii 😭" },
    { title: "Aurr Kya Batau Mai ", text: "Likhte Likhte Thak Jaunga lekin Baatein Khatam nahi hongi apke bare me 😭" },
];

function startReasonCounter() {
    const countElement = document.getElementById('reasonCount');
    const reasonsList = document.getElementById('reasonsList');
    let count = 0;
    
    // Animate counter
    const counterInterval = setInterval(() => {
        count++;
        countElement.textContent = count;
        
        if (count % 2 === 0) {
            createFloatingHeart();
        }
        
        if (count > reasons.length) {
            clearInterval(counterInterval);
            countElement.textContent = '∞';
        }
    }, 300);
    
    // Show reasons one by one
    reasons.forEach((reason, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <h4>${reason.title}</h4>
                <p>${reason.text}</p>
            `;
            reasonsList.appendChild(card);
        }, (index + 1) * 800);
    });
}

function createFloatingHeart() {
    const heartContainer = document.getElementById('heartContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💖', '💕', '💗', '💝', '💓'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    heartContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 4000);
}

// Timer for countdown section
let timerStartTime = null;
let timerInterval = null;

function startTimer() {
    if (!timerStartTime) {
        timerStartTime = Date.now();
    }
    
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timerStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

function createSparkles() {
    const sparkleContainer = document.getElementById('sparkles');
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    }, 300);
}

// Quiz 2 Functions
function answerQuiz2(isCorrect) {
    const questionDiv = document.getElementById('quiz2Question');
    const resultDiv = document.getElementById('quiz2Result');
    const continueBtn = document.getElementById('continueAfterGame');
    
    if (isCorrect) {
        questionDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        continueBtn.style.display = 'inline-block';
        
        // Create celebration effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createFloatingHeart(), i * 100);
        }
    } else {
        // Shake effect for wrong answer
        questionDiv.style.animation = 'shake 0.5s';
        setTimeout(() => {
            questionDiv.style.animation = '';
        }, 500);
    }
}

// Typing Effect
function startTypingEffect() {
    const text = "Wishing you the happiest birthday ever! ✨";
    const element = document.getElementById('typingText');
    element.textContent = text;
}
