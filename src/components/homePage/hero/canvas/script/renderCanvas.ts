import { getBreakingPoint, BreakingPointes, BreakingPointsWidth } from "@/utils/helpers/breakingPoints";
import { rand } from "@utils/helpers/random";

type CanvasShapeType = readonly[BambooInstance[], FireflyInstance[]];

type CanvasVariablesType = [CanvasRenderingContext2D, number, number, number];

type RenderCanvasType = (canvas: HTMLCanvasElement) => void;

type GetCanvasVariablesType = (canvas: HTMLCanvasElement) => CanvasVariablesType;

type CreateShapesType = (ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, totalFireflyNum: number) => CanvasShapeType

type InitCanvasType = (canvas:  HTMLCanvasElement) => readonly[renderAll: ()=> void, resize: () => void]

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
        this.radius = (this.screenWidth > BreakingPointsWidth.md && Math.random() > 0.95) ? rand(50, 120) : rand(2, 15);
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

const getCanvasVariables: GetCanvasVariablesType = (canvas) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    const ctx: CanvasRenderingContext2D =  canvas.getContext('2d') as CanvasRenderingContext2D;
    let totalFireflyNum: number = 0;
    const { minWidth } = getBreakingPoint(screenWidth)
    
    switch (minWidth) {
        case(BreakingPointes.xxl):
            totalFireflyNum = 650;
            break;
        case(BreakingPointes.xl):
            totalFireflyNum = 500;
            break;  
        case(BreakingPointes.lg):
            totalFireflyNum = 400;
            break;
        case(BreakingPointes.md):
            totalFireflyNum = 250;
            break;
        case(BreakingPointes.sm):
            totalFireflyNum = 200;
            break;
        case(BreakingPointes.xs):
            totalFireflyNum = 100;
            break;
        default:
            totalFireflyNum = 80;
    }

    return [ctx, screenWidth, screenHeight, totalFireflyNum];
}

const createShapes: CreateShapesType = (ctx, screenWidth, screenHeight, totalFireflyNum) => {

    // creating bamboos
    const bamboos: BambooInstance[] = [];
    for (let x = 0; x < screenWidth;) {
        let distance: number = rand(15, 25); 
        let width: number = rand(15, 50);
        let height: number = rand(100, 300);

        if(screenWidth <= BreakingPointsWidth.lg && screenWidth > BreakingPointsWidth.md) {
            distance = rand(15, 25); 
            width = rand(15, 40);
            height = rand(100, 200);
        }
        else if(screenWidth <= BreakingPointsWidth.md && screenWidth > BreakingPointsWidth.sm) {
            distance = rand(15, 20); 
            width = rand(15, 20);
            height = rand(80, 100);
        }
        else if(screenWidth <= BreakingPointsWidth.sm) {
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

const initCanvas: InitCanvasType = (canvas) => {
    let canvasVariables = getCanvasVariables(canvas);
    let [bamboos, fireflies] = createShapes(...canvasVariables);
    const renderAll = (): void => {
        const [ ctx, screenWidth, screenHeight] = canvasVariables;
        ctx.clearRect(0, 0 , screenWidth, screenHeight)
        bamboos.forEach((item: BambooInstance) => item.render());
        fireflies.forEach((item: FireflyInstance) => item.render());
        requestAnimationFrame(renderAll);
    }; 
    const resize = () => {
        canvasVariables = getCanvasVariables(canvas);
        [bamboos, fireflies] = createShapes(...canvasVariables);
    };
    
    return [renderAll, resize] as const;
};

const renderCanvas: RenderCanvasType = (canvas) => {
    const [renderAll, resize] = initCanvas(canvas)
    renderAll();
    window.addEventListener('resize', resize)
}

export default renderCanvas