// scene 2 camera

let clickCount = 0;
const MAX_CLICKS = 4;
const photosContainer = document.getElementById('photos-container');

const memories = [
    { img: '[MEMORY_IMAGE_1]', desc: '[MEMORY_DESCRIPTION_1]' },
    { img: '[MEMORY_IMAGE_2]', desc: '[MEMORY_DESCRIPTION_2]' },
    { img: '[MEMORY_IMAGE_3]', desc: '[MEMORY_DESCRIPTION_3]' },
    { img: '[MEMORY_IMAGE_4]', desc: '[MEMORY_DESCRIPTION_4]' }
];

function initScene2() {
    gsap.from('.vintage-camera', { scale: 0, rotation: 360, opacity: 0, duration: 1.5, ease: "back.out(1.7)" });
    
    // idle animation
    gsap.to('.vintage-camera', {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

document.querySelector('.vintage-camera').addEventListener('click', () => {
    if (clickCount >= 5) return;
    
    clickCount++;
    
    // hide hint
    if (clickCount === 1) {
        gsap.to('#camera-hint', { opacity: 0, duration: 0.5 });
    }
    
    // flash
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0'; flash.style.left = '0';
    flash.style.width = '100%'; flash.style.height = '100%';
    flash.style.backgroundColor = '#fff';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    
    gsap.to(flash, { opacity: 0, duration: 0.5, onComplete: () => flash.remove() });
    
    // camera shake
    gsap.fromTo('.vintage-camera', 
        { x: -10 }, 
        { x: 10, duration: 0.05, repeat: 5, yoyo: true, clearProps: "x" }
    );
    
    if (clickCount <= MAX_CLICKS) {
        // eject photo
        spawnPhoto(clickCount - 1);
    } else {
        // 5th click transition
        transitionToScene3();
    }
});

function spawnPhoto(index) {
    const photoData = memories[index];
    
    const photoEl = document.createElement('div');
    photoEl.className = 'polaroid-inner scattered-photo';
    photoEl.innerHTML = `
        <div class="photo-placeholder" style="background:#555; filter: blur(10px); transition: filter 2s;">${photoData.img}</div>
        <div class="caption">${photoData.desc}</div>
    `;
    
    photosContainer.appendChild(photoEl);
    
    // animate to corners
    let endLeft, endTop, rot;
    
    // safe coords
    // order: top right, bottom left, bottom right, top left
    
    // vw/vh bounds for width
    if (index === 0) { 
        endLeft = "80vw"; endTop = "25vh"; rot = 12; // top right
    } else if (index === 1) { 
        endLeft = "20vw"; endTop = "75vh"; rot = -8; // bottom left
    } else if (index === 2) { 
        endLeft = "80vw"; endTop = "75vh"; rot = -10; // bottom right
    } else if (index === 3) { 
        endLeft = "20vw"; endTop = "25vh"; rot = -15; // top left
    }
    
    // animate left/top in vw/vh
    // no xPercent/yPercent
    gsap.fromTo(photoEl, 
        { left: "50vw", top: "50vh", scale: 0.1, rotation: 0, opacity: 0 },
        { 
            left: endLeft, 
            top: endTop, 
            scale: 1, 
            rotation: rot, 
            opacity: 1, 
            duration: 1.5, 
            ease: "power3.out" 
        }
    );
    
    // develop film
    setTimeout(() => {
        photoEl.querySelector('.photo-placeholder').style.filter = 'blur(0px)';
    }, 1000);
}

function transitionToScene3() {
    const tl = gsap.timeline();
    
    // photos float up
    tl.to('.scattered-photo', {
        y: -1000,
        opacity: 0,
        rotation: Math.random() * 90,
        duration: 2,
        stagger: 0.2,
        ease: "power2.in"
    });
    
    // camera break apart
    tl.to('.vintage-camera', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1.5,
        ease: "power3.in"
    }, 0.5);

    if (window.particleSystem) window.particleSystem.scramble();

    tl.call(() => {
        switchScene(2); // scene 3
    }, null, 2.5);
}
