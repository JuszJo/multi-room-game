//define a player class
class Player extends Sprite {
    constructor(x, y, width, height, {collisionBlocks, frameAmountX, frameAmountY, animations}) {
        super({imageSrc: animations.idle.imageSrc, frameAmountX, frameAmountY, animations})
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        //future reference
        // this.width = width;
        // this.height = height;
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
        this.hitbox = {}
        this.boxes = false;
    }

    turnOffBoxes() {
        this.boxes = false;
    }

    turnOnBoxes() {
        this.boxes = true;
    }

    drawBoundingbox() {
        if(this.boxes) {
            //draw bounding box
            drawingSurface.fillStyle = "rgb(0, 0, 255, 0.5)";
            drawingSurface.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    drawHitbox() {
        if(this.boxes) {
            drawingSurface.fillStyle = "rgb(255, 0, 0, 0.5)";
            drawingSurface.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y + 10,
            },
            width: this.width - 20,
            height: this.height - 10
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    showCollisionArea(block) {
        if(this.boxes) {
            drawingSurface.fillStyle = "blue";
            drawingSurface.fillRect(block.position.x, block.position.y, block.width, block.height)
        }
    }
    
    checkCollisionsX() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];

            //collision
            if(this.hitbox.position.y + this.hitbox.height >= block.position.y
                && this.hitbox.position.y <= block.position.y + block.height
                && this.hitbox.position.x <= block.position.x + block.width
                && this.hitbox.position.x + this.hitbox.width >= block.position.x) {
                if(this.velocity.x < 0) {
                    this.showCollisionArea(block);
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = block.position.x + block.width - offset + 0.1;
                    // this.position.x = block.position.x + block.width + 0.1;
                    break;
                }
                if(this.velocity.x > 0) {
                    this.showCollisionArea(block);
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = block.position.x - offset - 0.1;
                    // this.position.x = block.position.x - this.width - 0.1;
                    break;
                }
            }
        }
    }

    checkCollisionsY() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];
            
            //collision
            if(this.hitbox.position.y + this.hitbox.height >= block.position.y
                && this.hitbox.position.y <= block.position.y + block.height
                && this.hitbox.position.x <= block.position.x + block.width
                && this.hitbox.position.x + this.hitbox.width >= block.position.x) {
                    if(this.velocity.y < 0) {
                        this.velocity.y = 0;
                        this.showCollisionArea(block);
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = block.position.y + block.height - offset + 0.1;
                        // this.position.y = block.position.y + block.height + 0.1;
                        break;
                    }
                    if(this.velocity.y > 0) {
                        this.velocity.y = 0;
                        this.showCollisionArea(block);
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                        this.position.y = block.position.y - offset - 0.1;
                        // this.position.y = block.position.y - this.height - 0.1;
                    break;
                }
            }
        }
    }

    switchSprite(name) {
        if(this.image == this.animations[name].image) return
        this.currentFrame = this.animations[name].animationStart;
        this.image = this.animations[name].image;
        this.frameAmountX = this.animations[name].frameAmountX;
        this.frameBuffer = this.animations[name].frameBuffer;
    }

    //draw rectangle function
    // draw() {
    //     drawingSurface.fillStyle = "red";
    //     drawingSurface.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
    
    //update the player
    update() {
        // this.drawBoundingbox()

        //apply movement
        this.position.x += this.velocity.x;
        
        this.updateHitbox()
        this.drawHitbox();
        
        this.checkCollisionsX();
        
        this.applyGravity();

        this.updateHitbox();
        
        this.checkCollisionsY(); 
    }
}