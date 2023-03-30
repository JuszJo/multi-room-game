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
            frameBuffer: 10,
            loop: true,
            imageSrc: "./images/player/Punk_idle.png",
            animationStart: 0,
        },
        runRight: {
            frameAmountX: 6,
            frameAmountY: 1,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./images/player/Punk_run.png",
            animationStart: 0,
        },
        runLeft: {
            frameAmountX: 6,
            frameAmountY: 1,
            frameBuffer: 6,
            loop: true,
            imageSrc: "./images/player/Punk_runLeftIMP.png",
            animationStart: 5
        }
    }
})

const camera = new Camera(
    player.position.x, 0,
    canvasWidth / 1.5, canvasHeight,  
    player
    );

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

function drawCollisionBlock() {
    collisionBlocks.forEach(collisionBlock => collisionBlock.draw());
}

function animate() {
    window.requestAnimationFrame(animate)
    
    // clear background
    drawingSurface.clearRect(0, 0, canvasWidth, canvasHeight);

    backgroundImage.draw();

    // drawCollisionBlock();

    //reset velocity x to 0
    player.velocity.x = 0;

    //check keys pressed
    if(keys.a.pressed) {
        player.switchSprite("runLeft");
        player.front = false;
        player.velocity.x = -5;
        // console.log(player.front)
    }
    else if(keys.d.pressed) {
        player.switchSprite("runRight");
        player.front = true;
        player.velocity.x = 5;
        // console.log(player.front)
    }
    else {
        player.front = true;
        player.switchSprite("idle");
    }

    //call camera class
    camera.update()
    camera.draw()

    //call draw and update function
    player.draw()
    player.update();
}

animate()