import renderCanvas from "./renderCanvas";

const canvas: HTMLCanvasElement | null =
document.querySelector("canvas#canvas");
canvas && renderCanvas(canvas);