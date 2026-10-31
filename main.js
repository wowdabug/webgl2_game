import { init as updateInit, update } from "./update.js";
import { init as renderInit, render } from "./render.js";

let prevTime;
let accumulator = 0;
const ticksPerSecond = 1;
const threshold = (1 / ticksPerSecond) * 1000;

async function init() {
	updateInit();
	await renderInit();
}

function loop() {
	const currentTime = performance.now();
	const deltaTime = currentTime - prevTime;
	prevTime = currentTime;

	update(deltaTime);

	accumulator += deltaTime;
	if (accumulator > threshold) {
		accumulator = 0;
		tick();
	}

	render();
	requestAnimationFrame(loop);
}

async function main() {
	await init();

	prevTime = performance.now();
	loop();
}

main();
