const canvas = document.querySelector('canvas');
const canvasWidth = 1024;
const canvasHeight = 576;

//define drawing surface
const drawingSurface = canvas.getContext('2d')

//make a 2D array of collision blocks
const parsedCollisions = parse2D(collisions);
const collisionBlocks = createObjectsFrom2D(parsedCollisions)

//create a new instance of sprite class
const backgroundImage = new Sprite({
    position: {x: 0, y: 0},
    imageSrc: "./images/wall.png"
});

//create a new instance of the player class
const player = new Player(100, 250, 20, 20, {collisionBlocks,
    frameAmountX: 4,
    frameAmountY: 1
})

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

    backgroundImage.draw();

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    //reset velocity x to 0
    player.velocity.x = 0;

    //check keys pressed
    if(keys.a.pressed) player.velocity.x = -5;
    else if(keys.d.pressed) player.velocity.x = 5;

    //call draw and update function
    player.draw()
    player.update();
}

animate()