// main sequence

const scenes = document.querySelectorAll('.scene');
let currentScene = 0;

function switchScene(index) {
    scenes.forEach((scene, i) => {
        if (i === index) {
            scene.classList.add('active');
        } else {
            scene.classList.remove('active');
        }
    });
    currentScene = index;
    
    // scene init
    if (index === 1) initScene2();
    if (index === 2) initScene3();
    if (index === 3) initScene4();
}

async function injectSVGs() {
    const images = document.querySelectorAll('img.inject-svg');
    for (let img of images) {
        const src = img.getAttribute('src');
        if (!src.endsWith('.svg')) continue;
        
        try {
            const response = await fetch(src);
            const text = await response.text();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const svgEl = xmlDoc.getElementsByTagName('svg')[0];
            
            // copy classes
            if (img.classList) {
                svgEl.setAttribute('class', img.getAttribute('class'));
            }
            
            img.replaceWith(svgEl);
            
            // reset path lengths
            if (svgEl.classList.contains('drawable-svg')) {
                const paths = svgEl.querySelectorAll('path, circle, rect, line, polyline, polygon');
                paths.forEach(p => {
                    const length = p.getTotalLength ? p.getTotalLength() : 1000;
                    p.style.setProperty('--path-length', length);
                });
            }
            
        } catch(e) {
            console.error("SVG injection failed for", src, e);
        }
    }
}

// after load
window.addEventListener('load', () => {
    injectSVGs(); // fire and forget
    
    // intro
    gsap.fromTo('.polaroid-frame', 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 2, ease: "power2.out" }
    );
    gsap.fromTo('.rocket-container', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: "power2.out" }
    );
});
