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

    //reset velocity x to 0
    square.velocity.x = 0;

    //check keys pressed
    if(keys.a.pressed) square.velocity.x = -5;
    else if(keys.d.pressed) square.velocity.x = 5;

    //call draw and update function
    square.draw()
    square.update();
}

animate()