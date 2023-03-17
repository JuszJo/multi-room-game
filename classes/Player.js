//define a player class
class Player extends Sprite {
    constructor(x, y, width, height, {collisionBlocks, frameAmountX, frameAmountY}) {
        super({imageSrc: "../images/Punk_idle.png", frameAmountX, frameAmountY})
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
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }
    
    checkCollisionsX() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];

            //collision
            if(this.position.y + this.height >= block.position.y
                && this.position.y <= block.position.y + block.height
                && this.position.x <= block.position.x + block.width
                && this.position.x + this.width >= block.position.x) {
                if(this.velocity.x < 0) {
                    drawingSurface.fillStyle = "blue";
                    drawingSurface.fillRect(block.position.x, block.position.y, block.width, block.height)
                    this.position.x = block.position.x + block.width + 0.1;
                    break;
                }
                if(this.velocity.x > 0) {
                    drawingSurface.fillStyle = "blue";
                    drawingSurface.fillRect(block.position.x, block.position.y, block.width, block.height)
                    this.position.x = block.position.x - this.width - 0.1;
                    break;
                }
            }
        }
    }

    checkCollisionsY() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];
            
            //collision
            if(this.position.y + this.height >= block.position.y
                && this.position.y <= block.position.y + block.height
                && this.position.x <= block.position.x + block.width
                && this.position.x + this.width >= block.position.x) {
                    if(this.velocity.y < 0) {
                        this.velocity.y = 0;
                        drawingSurface.fillStyle = "blue";
                        drawingSurface.fillRect(block.position.x, block.position.y, block.width, block.height)
                        this.position.y = block.position.y + block.height + 0.1;
                        break;
                    }
                    if(this.velocity.y > 0) {
                        this.velocity.y = 0;
                        drawingSurface.fillStyle = "blue";
                        drawingSurface.fillRect(block.position.x, block.position.y, block.width, block.height)
                        this.position.y = block.position.y - this.height - 0.1;
                    break;
                }
            }
        }
    }

    //draw rectangle function
    // draw() {
    //     drawingSurface.fillStyle = "red";
    //     drawingSurface.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
    
    //update the player
    update() {
        //draw bounding box
        drawingSurface.fillStyle = "rgb(0, 0, 255, 0.5";
        drawingSurface.fillRect(this.position.x, this.position.y, this.width, this.height);

        //apply movement
        this.position.x += this.velocity.x;
        
        this.checkCollisionsX();
        
        this.applyGravity();
        
        this.checkCollisionsY();
    }
}