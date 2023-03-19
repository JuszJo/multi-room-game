class Camera {
    constructor(x, y, width, height, canvasWidth, canvasHeight, player) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offset = {
            x: player.position.x - (this.width / 2) + (player.hitbox.width / 2)
        }
        this.turnedOn = false;
    }
    
    turnOn() {
        this.turnedOn = true;
    }

    turnOff() {
        this.turnedOn = false;
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
        else if(camera.offset.x < 0 && backgroundImage.position.x < 0) {
            if(keys.a.pressed) {
                player.velocity.x = 0;
                collisionBlocks.forEach(collisionBlock => {
                    collisionBlock.position.x += 5;
                })
                backgroundImage.position.x += 5;
            }
        }
    }

    update() {
        this.offset.x = player.position.x - (this.width / 2) + (player.hitbox.width / 2);
    }

    draw() {
        if(this.turnedOn) {
            drawingSurface.strokeRect(this.offset.x, this.y, this.width, this.height)
        }
    }
}