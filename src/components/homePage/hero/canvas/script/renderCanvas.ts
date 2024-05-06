type CanvasShapeType = readonly[BambooInstance[], FireflyInstance[]];

type CanvasVariablesType = [CanvasRenderingContext2D, number, number, number];


class BambooInstance {
    private spaceBetweenChunks: number = rand(3, 6) ;
    private rad: number = rand(-6, 6) * Math.random() * Math.PI / 180;
    private random: number = Math.random() *2;
    constructor(
        private ctx: any,
        private positionX: number,
        private positionY: number,
        private width: number,
        private height: number,
        private bambooChunkMaxNum: number,
    ){};
    public render(): void {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.globalAlpha = this.random;
        ctx.translate(this.positionX, this.positionY);
        ctx.rotate(0.6 * Math.sin(this.rad));
        ctx.translate(-this.positionX, -this.positionY);
        
        // creating bamboo chunks
        for (let i = 0; i < this.bambooChunkMaxNum; i++) {
            ctx.beginPath();
            ctx.moveTo(
                this.positionX - this.width / 2,
                this.positionY - this.height * i - this.spaceBetweenChunks * i
            );
            ctx.quadraticCurveTo(
                this.positionX - this.width / 5,
                this.positionY - this.height * i - this.spaceBetweenChunks * i - this.height  / 2, this.positionX - this.width / 2,
                this.positionY - this.height * i - this.spaceBetweenChunks * i - this.height
            );
            ctx.lineTo(
                this.positionX + this.width / 2,
                this.positionY - this.height * i - this.spaceBetweenChunks * i- this.height
            );
            ctx.quadraticCurveTo(
                this.positionX + this.width / 5,
                this.positionY - this.height * i - this.spaceBetweenChunks * i - this.height / 2,
                this.positionX + this.width / 2,
                this.positionY - this.height * i - this.spaceBetweenChunks * i
            );
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    };
}

class FireflyInstance {
    private radius!: number;
    private transferVector!: { x: number; y: number; };
    private color!: { r: number; g: number; b: number; };
    private globalAlpha!: number;
    private currentBrightness!: number;
    private brightness!: number;
    private positionX!: number;
    private positionY!: number;
    constructor(
        private ctx: any,
        private screenWidth: number,
        private screenHeight: number,
    ) {
            this.init(rand(0, screenWidth), rand(0, screenHeight));
    }
        
    // initialize properties 
    private init(x: number, y:number): void {
        this.positionX = x;
        this.positionY = y;
        this.radius = (this.screenWidth > breakingPoints.md && Math.random() > 0.95) ? rand(50, 120) : rand(2, 15);
        this.transferVector = {
            x: rand(-3,3),
            y: rand(-0.5,0.5),
        };
        this.color = {
            r: rand(800, 255),
            g: rand(230, 255),
            b: rand(90, 110),
        };
        this.globalAlpha = this.radius < 50 ? Math.random()/ 5 : Math.random() / 30;
        this.currentBrightness = rand(20, 200);
        this.brightness = this.currentBrightness;
    };
    private draw(): void {
        const ctx  = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = this.globalAlpha;
        ctx.fillStyle = this.color && `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    };
    private updateParams(): void { 
        const ratio = this.currentBrightness / this.brightness;
        this.globalAlpha = this.globalAlpha * (ratio * 1.1);
        this.currentBrightness -= 1;
        if(this.currentBrightness < 0)
            this.init(rand(0, this.screenWidth), rand(0, this.screenHeight))
    };
    private updatePosition(): void {
        if(this.transferVector){
            this.positionX += this.transferVector.x;
            this.positionY += this.transferVector.y;
        }
    };
    public render(){
        this.updatePosition();
        this.updateParams();
        this.draw();
    };
}

// #FIXME global
const breakingPoints = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
}

// #FIXME global
const rand = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const renderCanvas = (canvas: HTMLCanvasElement): void => {
  const [renderAll, resize] = initCanvas(canvas)
  renderAll();
  window.addEventListener('resize', resize)
}

const getCanvasVariables = (canvas: HTMLCanvasElement): CanvasVariablesType => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    const ctx: CanvasRenderingContext2D =  canvas.getContext('2d') as CanvasRenderingContext2D;
    let totalFireflyNum: number = 0;
    if(screenWidth > breakingPoints.xxl) {
        totalFireflyNum = 650
    }
    else if(screenWidth <= breakingPoints.xxl && screenWidth > breakingPoints.xl) {
        totalFireflyNum = 500
    }
    else if(screenWidth <= breakingPoints.xl && screenWidth > breakingPoints.lg) {
        totalFireflyNum = 400        
    }
    else if(screenWidth <= breakingPoints.lg && screenWidth > breakingPoints.md) {
        totalFireflyNum = 250
    }
    else if(screenWidth <= breakingPoints.md && screenWidth > breakingPoints.sm) {
        totalFireflyNum = 200
    }
    else if(screenWidth <= breakingPoints.sm) {
        totalFireflyNum = 100
    }
    return [ctx, screenWidth, screenHeight, totalFireflyNum];
}

const createShapes = (ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, totalFireflyNum: number): CanvasShapeType => {

    // creating bamboos
    const bamboos: BambooInstance[] = [];
    for (let x = 0; x < screenWidth;) {
        let distance: number = rand(15, 25); 
        let width: number = rand(15, 50);
        let height: number = rand(100, 300);
        if(screenWidth <= breakingPoints.lg && screenWidth > breakingPoints.md) {
            distance = rand(15, 25); 
            width = rand(15, 40);
            height = rand(100, 200);
        }
        else if(screenWidth <= breakingPoints.md && screenWidth > breakingPoints.sm) {
            distance = rand(15, 20); 
            width = rand(15, 20);
            height = rand(80, 100);
        }
        else if(screenWidth <= breakingPoints.sm) {
            distance = rand(10, 15); 
            width = rand(15, 20);
            height = rand(80, 100);
        }
        const maxNum = screenHeight / height;
        x += distance + width;
        const bamboo = new BambooInstance(ctx, x, screenHeight, width, height, maxNum);
        bamboos.push(bamboo);
    }

    // creating fireflies
    const fireflies: FireflyInstance[] = [];
    for (let i = 0; i < totalFireflyNum; i++) {
        const firefly = new FireflyInstance(ctx, screenWidth, screenHeight);
        fireflies.push(firefly);
    }

    return [bamboos, fireflies] as const;
};

const initCanvas = (canvas:  HTMLCanvasElement): readonly[renderAll: ()=> void, resize: () => void] => {
    let [ctx, screenWidth, screenHeight, totalFireflyNum] = getCanvasVariables(canvas);
    let [bamboos, fireflies] = createShapes(ctx, screenWidth, screenHeight, totalFireflyNum);
    const renderAll = (): void => {
        ctx.clearRect(0, 0 , screenWidth, screenHeight)
        bamboos.forEach((item: BambooInstance) => item.render());
        fireflies.forEach((item: FireflyInstance) => item.render());
        requestAnimationFrame(renderAll);
    }; 
    const resize = () => {
        [ctx, screenWidth, screenHeight, totalFireflyNum] = getCanvasVariables(canvas);
        [bamboos, fireflies] = createShapes(ctx, screenWidth, screenHeight, totalFireflyNum);
    };
    
    return [renderAll, resize] as const;
};

export default renderCanvas

export { getCanvasVariables, createShapes, initCanvas}

export type { CanvasShapeType, CanvasVariablesType}