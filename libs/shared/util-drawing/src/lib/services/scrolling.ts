export class Scrolling {
    shiftX=0;
    shiftY=0;
    speedX=0;
    speedY=0;

    x=0;
    y=0;
    width: number;
    height: number;
    img: HTMLImageElement;

    private c: CanvasRenderingContext2D;

    constructor(c: CanvasRenderingContext2D, img: HTMLImageElement) {
        this.c = c;
        this.width = c.canvas.width;
        this.height = c.canvas.height;
        this.img = img;
    }

    public setSpeed(dx: number, dy: number): void {
        this.speedX = dx;
        this.speedY = dy;
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public draw(): void {
        const img = this.img;
        const imgWidth = img.width;
        const imgHeight = img.height;
        const nbX = 1 + Math.ceil(this.width / imgWidth);
        const nbY = 1 + Math.ceil(this.height / imgHeight);
        
        this.shiftX += this.speedX;
        this.shiftY += this.speedY;
        
        if (this.shiftX > imgWidth || this.shiftX < 0) {
            this.shiftX = this.shiftX % imgWidth;
        }
        if (this.shiftY > imgHeight || this.shiftY < 0) {
            this.shiftY = this.shiftY % imgHeight;
        }
        for (let x = -1; x <= nbX; x++) {
            for (let y = -1; y <= nbY; y++) {
                this.c.drawImage(img, this.shiftX + x * imgWidth, this.shiftY + y * imgHeight);
            }
        }
    }
}

