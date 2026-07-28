//document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if (e.keyCode == 123) { return false; }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { return false; }
    if (e.ctrlKey && e.keyCode == 83) { return false; }
    if (e.ctrlKey && e.keyCode == 85) { return false; }
};

document.onselectstart = function() { return false; };
document.ondragstart = function() { return false; };

var typed = new Typed('#element', {
    strings: ['Web developer', 'Video Editor', 'Robotics', 'System Analyst'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});

function createParticles() {
    var particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        
        var randomLeft = Math.random() * 100;
        var randomDelay = Math.random() * 10;
        var randomDuration = Math.random() * 5 + 8;
        var randomSize = Math.random() * 6 + 4;
        var randomColor = Math.random();
        
        particle.style.left = randomLeft + '%';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
        
        if (randomColor < 0.25) {
            particle.style.background = 'rgba(170, 107, 228, 0.6)';
        } else if (randomColor < 0.5) {
            particle.style.background = 'rgba(255, 215, 0, 0.6)';
        } else if (randomColor < 0.75) {
            particle.style.background = 'rgba(0, 255, 0, 0.6)';
        } else {
            particle.style.background = 'rgba(255, 0, 255, 0.6)';
        }
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

var audio1 = document.getElementById('myAudio1');
var audio2 = document.getElementById('myAudio2');

function playAudio1() {
    audio1.play();
    audio2.pause();
    audio2.currentTime = 0;
}

function playAudio2() {
    audio2.play();
    audio1.pause();
    audio1.currentTime = 0;
}

function stopAudio() {
    audio1.pause();
    audio2.pause();
    audio1.currentTime = 0;
    audio2.currentTime = 0;
}

function celebrate() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff4500', '#00ff00', '#ff00ff', '#00bfff']
    });
}

const cards = document.querySelectorAll('.gallery-card');

cards.forEach(card => {

    card.addEventListener('mouseenter', () => {
        card.style.transition = "0.4s";
    });

});


document.querySelectorAll('nav a').forEach(item => {

    item.addEventListener('click', () => {

        item.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0.85)' },
            { transform: 'scale(1.12)' },
            { transform: 'scale(1)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(.34,1.56,.64,1)'
        });

    });

});


document.getElementById('pdfUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type === "application/pdf") {
            alert(`Success! "${file.name}" select ho gaya`);
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } else {
            alert("Bhai sirf PDF file upload karo");
        }
    }
    this.value = '';
});


document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('pdfUpload');
    const myUploadedBtn = document.getElementById('myUploadedBtn');
    const successIcon = document.getElementById('successIcon');
    let lastUploadedURL = null;

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "application/pdf") {
                lastUploadedURL = URL.createObjectURL(file);
                successIcon.innerHTML = '✅';
                setTimeout(() => {
                    successIcon.innerHTML = '';
                }, 3000);
            } else {
                alert("Bhai sirf PDF file upload karo");
                successIcon.innerHTML = '❌';
                setTimeout(() => {
                    successIcon.innerHTML = '';
                }, 3000);
            }
        }
        this.value = '';
    });

    myUploadedBtn.addEventListener('click', function() {
        if (lastUploadedURL) {
            window.open(lastUploadedURL, '_blank');
        } else {
            alert("Abhi koi file upload nahi hui hai");
        }
    });
});

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

menuBtn.onclick = function(){

    navMenu.classList.toggle("active");

}



document.addEventListener("click", function(e){

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector("nav ul");

    if(!menuBtn.contains(e.target) && !navMenu.contains(e.target)){
        navMenu.classList.remove("active");
    }

});