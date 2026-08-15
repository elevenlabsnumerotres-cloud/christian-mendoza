const canvas = document.getElementById('scroll-sequence');
const context = canvas.getContext('2d');

// Ajustado a tus 224 imágenes
const frameCount = 224; 

// Ajustado al nombre exacto de tus archivos (frame_0001.jpg, etc.)
const currentFrame = index => (
    `frames/frame_${index.toString().padStart(4, '0')}.jpg` 
);

// Pre-cargar las imágenes
const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image();
img.src = currentFrame(1);

// Resolución del canvas
canvas.width = 1920; 
canvas.height = 1080; 

img.onload = function(){
    context.drawImage(img, 0, 0);
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
