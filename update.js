import { getRandomInt } from "./random.js";
import { Snake } from "./snake.js";

const emptyBit = 0;
const snakeBit = 1;

const gridSizeX = 16;
const gridSizeY = 16;
const gridSize = gridSizeX * gridSizeY;
const grid = new Uint8Array(gridSize);

export const snake = new Snake(gridSize * 2); // each snake location is a vec2
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
	headX += directionX;
	headY += directionY;

	if (
		(headX < 0 || headX >= gridSizeX) ||
		(headY < 0 || headY >= gridSizeY) ||
		(grid[index(headX, headY)] === snakeBit)
	) {
		throw new Error("todo");
	}

	grid[index(headX, headY)] = snakeBit;

	snake.push(
		headX,
		headY
	);
}

function shiftSnake() {
	if (
		(headX === foodX) &&
		(headY === foodY)
	) {
		let randomPosition;

		do {
			randomPosition = getRandomInt(gridSize);
		} while (grid[randomPosition] !== emptyBit);

		foodX = randomPosition % gridSizeX;
		foodY = Math.floor(randomPosition / gridSizeX);
	} else {
		const [tailX, tailY] = snake.shift();

		grid[index(tailX, tailY)] = emptyBit;
	}
}

export function tick() {
	console.log(snake.getSize());

	if (
		(directionX !== 0 && directionY !== 0) ||
		(directionX < -1 || directionX > 1) ||
		(directionY < -1 || directionY > 1)
	) {
		throw new Error("Invalid direction");
	}

	pushSnake();
	shiftSnake();
}
