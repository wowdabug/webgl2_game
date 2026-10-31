import { resizeCanvasToDisplaySize, createProgramFromPaths } from "./utils.js";

const canvas = document.getElementById("c");
if (!canvas) {
	throw new Error();
}

const gl = canvas.getContext("webgl2");
if (!gl) {
	throw new Error();
}

const program = await createProgramFromPaths(gl, "basic.vert", "basic.frag");

let prevTime;
let accumulator = 0;
const ticksPerSecond = 1;
const threshold = (1 / ticksPerSecond) * 1000;
console.log(threshold)

function init() {
	prevTime = performance.now();
}

function update() {
	const currentTime = performance.now();
	const deltaTime = currentTime - prevTime;
	prevTime = currentTime;

	accumulator += deltaTime;
	if (accumulator > threshold) {
		accumulator = 0;
		tick();
	}
}

function render() {
	resizeCanvasToDisplaySize(canvas);
}

function tick() {
	console.log("tick");
}

function loop() {
	update();
	render();
	requestAnimationFrame(loop);
}

function main() {
	init();
	loop();
}

main();
