//define sprite class 
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true
        }
    }

    draw() {
        if(!this.loaded) return;
        drawingSurface.drawImage(this.image, this.position.x, this.position.y);
    }
}