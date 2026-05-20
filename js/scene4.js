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

    // hint reveal with bounce
    gsap.fromTo('#cake-hint', 
        { opacity: 0, y: 0 },
        {
            opacity: 1,
            y: -10,
            duration: 1.5,
            delay: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );
}

document.getElementById('space-cake').addEventListener('click', function cakeSlice() {
    // remove listener so it only fires once
    this.removeEventListener('click', cakeSlice);
    
    // kill idle floating animation
    gsap.killTweensOf('.cake-container');
    gsap.killTweensOf('#cake-hint');
    
    // hide hint
    const hint = document.getElementById('cake-hint');
    if (hint) hint.classList.add('hidden');
    
    const cakeContainer = this;
    const originalSvg = cakeContainer.querySelector('svg');
    
    if (!originalSvg) return;
    
    // Stop the draw animation on all paths - lock them in their current (fully drawn) state
    const allPaths = originalSvg.querySelectorAll('path, circle, rect, line, polyline, polygon');
    allPaths.forEach(p => {
        p.style.animation = 'none';
        p.style.strokeDashoffset = '0';
        p.style.fill = '#fff';
        p.style.strokeOpacity = '1';
    });
    
    // Clip left half
    originalSvg.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
    
    // Clone for right half
    const rightSvg = originalSvg.cloneNode(true);
    rightSvg.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
    cakeContainer.appendChild(rightSvg);
    
    const leftPaths = originalSvg.querySelectorAll('path, circle, rect, line, polyline, polygon');
    const rightPaths = rightSvg.querySelectorAll('path, circle, rect, line, polyline, polygon');
    
    const tl = gsap.timeline();
    
    // 1. Split the two halves apart
    tl.to(originalSvg, {
        x: -120,
        rotation: -12,
        duration: 1.2,
        ease: "power3.out"
    }, 0);
    
    tl.to(rightSvg, {
        x: 120,
        rotation: 12,
        duration: 1.2,
        ease: "power3.out"
    }, 0);
    
    // 2. Erase both halves by reversing the stroke (un-drawing)
    leftPaths.forEach(p => {
        const len = p.style.getPropertyValue('--path-length') || 1000;
        tl.to(p, {
            strokeDashoffset: len,
            fill: 'transparent',
            duration: 1.5,
            ease: "power2.in"
        }, 1.0);
    });
    
    rightPaths.forEach(p => {
        const len = p.style.getPropertyValue('--path-length') || 1000;
        tl.to(p, {
            strokeDashoffset: len,
            fill: 'transparent',
            duration: 1.5,
            ease: "power2.in"
        }, 1.0);
    });
    
    // 3. Reveal polaroid emerging from center as cake splits
    const finalPolaroid = document.getElementById('final-polaroid');
    finalPolaroid.classList.remove('hidden');
    
    tl.fromTo(finalPolaroid, 
        { scale: 0, opacity: 1, rotation: 20 },
        { scale: 1, opacity: 1, rotation: -3, duration: 2.5, ease: "back.out(1.2)" },
        0.3
    );
    
    // 4. Fade out main text
    tl.to('#happy-birthday-text', {
        opacity: 0,
        filter: 'blur(5px)',
        duration: 1.5
    }, 1);
    
    // 5. Show final message
    const finalMsg = document.getElementById('final-message');
    finalMsg.classList.remove('hidden');
    
    tl.fromTo(finalMsg, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2 },
        3
    );
});
