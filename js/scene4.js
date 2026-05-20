// scene 4 finale

function initScene4() {
    // reset particles
    if (window.particleSystem) window.particleSystem.init(300);
    
    const tl = gsap.timeline();
    
    // text reveal
    tl.to('#happy-birthday-text', {
        opacity: 1,
        scale: 1,
        y: 20,
        duration: 3,
        ease: "power3.out"
    });
    
    // cake reveal
    tl.from('.cake-container', {
        y: 200,
        opacity: 0,
        rotation: 10,
        duration: 2,
        ease: "back.out(1.5)"
    }, "-=1.5");
    
    // idle motion
    gsap.to('.cake-container', {
        y: "-=20",
        rotation: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

document.getElementById('space-cake').addEventListener('click', function cakeSlice() {
    // remove listener
    this.removeEventListener('click', cakeSlice);
    
    const tl = gsap.timeline();
    
    // slice effect
    tl.to('.cake-container', {
        scale: 1.2,
        duration: 0.5,
        yoyo: true,
        repeat: 1
    });
    
    tl.to('.cake-container', {
        opacity: 0,
        scale: 2,
        duration: 1.5,
        filter: 'blur(10px)',
        ease: "power2.in"
    });
    
    // reveal polaroid
    const finalPolaroid = document.getElementById('final-polaroid');
    finalPolaroid.classList.remove('hidden');
    
    tl.fromTo(finalPolaroid, 
        { y: 100, scale: 0.5, opacity: 0, rotation: 10 },
        { y: -50, scale: 1, opacity: 1, rotation: -2, duration: 2, ease: "power2.out" },
        "-=0.5"
    );
    
    // show message
    const finalMsg = document.getElementById('final-message');
    finalMsg.classList.remove('hidden');
    
    tl.to(finalMsg, {
        opacity: 1,
        y: -20,
        duration: 2,
        delay: 2
    });
    
    // calm ending
    tl.to('#happy-birthday-text', {
        opacity: 0,
        duration: 2
    }, "-=2");
});
