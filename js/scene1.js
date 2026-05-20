// scene 1 intro

document.getElementById('start-journey-btn').addEventListener('click', () => {
    
    // flowers fade
    gsap.to('.flower', {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.in"
    });
    
    // rocket ignition
    const tl = gsap.timeline();
    
    // camera shake
    tl.to('#app', {
        x: () => Math.random() * 10 - 5,
        y: () => Math.random() * 10 - 5,
        duration: 0.05,
        repeat: 20,
        yoyo: true
    }, 0);
    
    // rocket launch
    // move button down
    tl.to('#start-journey-btn', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.in"
    }, 0);
    
    // launch rocket wrapper
    tl.to('.rocket-svg-wrapper', {
        x: window.innerWidth,
        y: -window.innerHeight - 300,
        rotation: 45,
        scale: 2.5, // grow on launch
        duration: 2.5, // longer for growth
        ease: "power2.in"
    }, 0.5);

    // speed up particles
    if(window.particleSystem) window.particleSystem.speedUp();

    // polaroid fades
    tl.to('.polaroid-frame', {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.in"
    }, 0.5);
    
    // background darkens
    tl.to('body', {
        backgroundColor: '#020308',
        duration: 2
    }, 0);
    
    // go to scene 2
    tl.call(() => {
        switchScene(1); // scene 2
    }, null, 2.5);
    
});
