class Camera {
    constructor(x, y, width, height, canvasWidth, canvasHeight, player) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offset = {
            x: player.position.x - ((canvasWidth / 2) / 2)
        }
    }

    moveScreen() {
        if(camera.offset.x + camera.width > canvasWidth) {
            if(keys.d.pressed) {
                player.velocity.x = 0;
                collisionBlocks.forEach(collisionBlock => {
                    collisionBlock.position.x -= 5;
                })
                backgroundImage.position.x -= 5;
            }
        }
    }

    draw() {
        this.offset.x = player.position.x - ((canvasWidth / 2) / 2);
        drawingSurface.strokeRect(this.offset.x, this.y, this.width, this.height)
    }
}