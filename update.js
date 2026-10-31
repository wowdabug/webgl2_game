import { getRandomInt } from "./random.js";
import { Snake } from "./snake.js";

const emptyBit = 0;
const snakeBit = 1;

const gridSizeX = 16;
const gridSizeY = 16;
const gridSize = gridSizeX * gridSizeY;
const grid = new Uint8Array(gridSize);

export const snake = new Snake(gridSize * 2); // synced ring buffer for rendering
export let headX = 0;
export let headY = 0;
export let foodX = 4;
export let foodY = 0;

let directionX = 1;
let directionY = 0;

export function init() {
	snake.push(headX, headY);
}

export function update(deltaTime) { }

function index(x, y) {
	return (y * gridSizeX) + x;
}

function pushSnake() {
	if ( // validate snake bounds
		(headX < 0 || headX >= gridSizeX) ||
		(headY < 0 || headY >= gridSizeY) ||
		(grid[index(headX, headY)] === snakeBit)
	) {
		throw new Error("todo: game over");
	}

	snake.push(headX, headY);             // update ring buffer
	grid[index(headX, headY)] = snakeBit; // update grid buffer
}

function randomizeFood() {
	let randomPosition;

	do { // try to find empty position in grid
		randomPosition = getRandomInt(gridSize);
	} while (grid[randomPosition] !== emptyBit);

	foodX = randomPosition % gridSizeX;
	foodY = Math.floor(randomPosition / gridSizeX);
}

function shiftSnake() {
	if ( // if snake doesn't consume food remove tail
		(headX === foodX) &&
		(headY === foodY)
	) {
		randomizeFood();
	} else {
		const [tailX, tailY] = snake.shift(); // update ring buffer
		grid[index(tailX, tailY)] = emptyBit; // update grid buffer
	}
}

export function tick() {
	console.log(snake.getSize());

	if ( // validate direction (optional)
		(directionX !== 0 && directionY !== 0) ||
		(directionX < -1 || directionX > 1) ||
		(directionY < -1 || directionY > 1)
	) {
		throw new Error("Invalid direction");
	}

	headX += directionX;
	headY += directionY;

	shiftSnake();
	pushSnake();
}
