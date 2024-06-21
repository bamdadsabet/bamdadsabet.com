import renderCanvas from "./renderCanvas";

// initializing canvas
const canvas: HTMLCanvasElement | null =
document.querySelector("canvas#canvas");
canvas && renderCanvas(canvas);