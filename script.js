const canvas = document.querySelector('canvas');
const canvasWidth = 1024;
const canvasHeight = 576;

//define drawing surface
const drawingSurface = canvas.getContext('2d')
drawingSurface.fillStyle = "red";

//create a new instance of the player class
const square = new Player(100, 100, 100, 100)

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    
    // clear background
    drawingSurface.clearRect(0, 0, canvasWidth, canvasHeight);

    //call draw and update function
    square.draw()
    square.update();
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if(square.velocity.y === 0) {
                square.velocity.y = -20;
            }
            break;
        case 'a':
            square.velocity.x = -4;
            
            break;
        case 's':
            
            break;
        case 'd':
            square.velocity.x = 4;
            
            break;
    
        default:
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            square.velocity.x = 0;
            
            break;
        case 'd':
            square.velocity.x = 0;
            
            break;
    
        default:
            break;
    }
})