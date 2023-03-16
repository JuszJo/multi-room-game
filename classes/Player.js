//define a player class
class Player {
    constructor(x, y, width, height) {
        this.position = {
            x: x,
            y: y
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = width;
        this.height = height;

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.gravity = 1;

    }

    //draw rectangle function
    draw() {
        drawingSurface.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    
    //update the player
    update() {
        //apply gravity
        this.position.y += this.velocity.y;

        //apply movement
        this.position.x += this.velocity.x;

        //update bottom
        this.sides.bottom = this.position.y + this.height;

        //collision block
        if(this.sides.bottom + this.velocity.y < canvasHeight) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0
            this.position.y = canvasHeight - this.height;
        }
    }
}