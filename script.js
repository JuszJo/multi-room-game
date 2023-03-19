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
    imageSrc: "./images/multi-room.png"
});

//create a new instance of the player class
const player = new Player(100, 250, 20, 20, {collisionBlocks,
    frameAmountX: 4,
    frameAmountY: 1,
    animations: {
        idle: {
            frameAmountX: 4,
            frameAmountY: 1,
            loop: true,
            imageSrc: "./images/player/Punk_idle.png"
        },
        runRight: {
            frameAmountX: 6,
            frameAmountY: 1,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./images/player/Punk_run.png"
        },
        runLeft: {
            frameAmountX: 6,
            frameAmountY: 1,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./images/player/Punk_run.png"
            // imageSrc: "./images/player/Punk_runLeft.png"
        }
    }
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

    //draw collision block
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()
    // })

    //reset velocity x to 0
    player.velocity.x = 0;

    //check keys pressed
    if(keys.a.pressed) {
        player.switchSprite("runLeft");
        player.velocity.x = -5;
    }
    else if(keys.d.pressed) {
        player.switchSprite("runRight");
        player.velocity.x = 5
    }
    else {
        player.switchSprite("idle")
    }

    //call draw and update function
    player.draw()
    player.update();
}

animate()