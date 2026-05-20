// scene 3 letter

const letterText = `> INITIALIZING...
> MEMORY LOADED
> DECRYPTING MESSAGE...

Happy Birthday! 
You're amazing.
Never stop reaching
for the stars.

> END OF FILE`;

function initScene3() {
    gsap.from('.macintosh-wrapper', { scale: 0.8, opacity: 0, duration: 2, ease: "power2.out" });
}

document.getElementById('mac-power-btn').addEventListener('click', () => {
    
    // notch expands
    const notchBtn = document.getElementById('mac-power-btn');
    notchBtn.classList.add('activating');
    
    setTimeout(() => {
        // hide power button
        notchBtn.style.display = 'none';
        
        // scale up
        gsap.to('.macintosh-wrapper', {
            scale: 1.6,
            duration: 2,
            ease: "power2.inOut"
        });

        // boot sequence
        const osContent = document.getElementById('mac-os');
        osContent.style.display = 'flex';
        
        // crt flicker
        gsap.fromTo('.mac-screen-overlay', 
            { opacity: 0.5 },
            { opacity: 1, duration: 0.1, repeat: 5, yoyo: true }
        );
        
        // typewriter
        const textEl = document.getElementById('letter-text');
        textEl.innerHTML = '';
        
        // scroll container
        const screenScroll = document.getElementById('mac-screen-scroll');
        
        let i = 0;
        function typeWriter() {
            if (i < letterText.length) {
                textEl.innerHTML += letterText.charAt(i);
                i++;
                
                // auto-scroll
                if (screenScroll) {
                    screenScroll.scrollTop = screenScroll.scrollHeight;
                }

                setTimeout(typeWriter, 50); // typing speed
            } else {
                // show button
                const btn = document.getElementById('open-surprise-btn');
                btn.classList.remove('hidden');
                gsap.from(btn, { opacity: 0, y: 20, duration: 1 });
                
                // final scroll
                setTimeout(() => {
                   if (screenScroll) screenScroll.scrollTop = screenScroll.scrollHeight;
                }, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }, 500); // wait for notch transition
});

document.getElementById('open-surprise-btn').addEventListener('click', () => {
    const tl = gsap.timeline();
    
    // mac dissolve
    tl.to('.macintosh-wrapper', {
        scale: 2.5,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 2,
        ease: "power2.inOut"
    });
    
    tl.call(() => {
        switchScene(3); // scene 4
    }, null, 2);
});
