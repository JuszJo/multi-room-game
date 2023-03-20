//define sprite class 
class Sprite {
    constructor({position, imageSrc, frameAmountX = 1, frameAmountY = 1, animations}) {
        this.position = position;
        this.image = new Image();
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameAmountX;
            this.height = this.image.height / this.frameAmountY;
        }
        this.image.src = imageSrc;
        this.frameAmountX = frameAmountX;
        this.frameAmountY = frameAmountY
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = 6;
        this.animations = animations;
        this.front = true;

        if(this.animations) {
            for (let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }

    }

    updateFrames() {
        ++this.elapsedFrames;

        if(this.elapsedFrames % this.frameBuffer == 0) {
            if(this.front) {
                if(this.currentFrame < this.frameAmountX - 1) ++this.currentFrame;
                else this.currentFrame = 0;
            }
            else {
                if(this.currentFrame > 0) --this.currentFrame;
                else this.currentFrame = this.animations.runLeft.animationStart;
            }
        }
    }

    draw() {
        if(!this.loaded) return;
        const cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0
            },
            width: this.width,
            height: this.height
        }
        
        drawingSurface.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        this.updateFrames();

        //future reference
        // drawingSurface.drawImage(this.image, this.position.x, this.position.y);
    }
}