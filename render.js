import { resizeCanvasToDisplaySize, createProgramFromPaths } from "./gl-utils.js";
import { snake, headX, headY, foodX, foodY } from "./update.js";

let canvas;
let gl;

let snakeProgram;
let foodProgram;
let snakeResolutionUniformLocation;
let foodResolutionUniformLocation;

function resolutionUniform() {
	gl.useProgram(snakeProgram);
	gl.uniform2f(snakeResolutionUniformLocation, canvas.width, canvas.height);
	gl.useProgram(foodProgram);
	gl.uniform2f(foodResolutionUniformLocation, canvas.width, canvas.height);
}

export async function init() {
	canvas = document.getElementById("c");
	if (!canvas) {
		throw new Error("No canvas element with ID \"c\"");
	}

	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw new Error("WebGL2 not supported");
	}

	snakeProgram = await createProgramFromPaths(gl, "snake.vert", "snake.frag");
	foodProgram = await createProgramFromPaths(gl, "food.vert", "food.frag");

	snakeResolutionUniformLocation = gl.getUniformLocation(snakeProgram, "u_resolution");
	foodResolutionUniformLocation = gl.getUniformLocation(foodProgram, "u_resolution");

	const positionAttribLocation = 0;
	const colorAttribLocation = 1;

	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	const positions = [
		100, 100,
		100, 200,
		300, 200
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);
	gl.enableVertexAttribArray(positionAttribLocation);
	gl.vertexAttribPointer(
		positionAttribLocation,
		2,        // size
		gl.FLOAT, // type
		false,    // normalized
		0,        // stride
		0         // offset
	);

	resolutionUniform();
	gl.clearColor(1, 1, 1, 1);
}

export function renderSnake() {
	gl.useProgram(snakeProgram);
}

export function renderFood() {
	gl.useProgram(foodProgram);
}

export function render() {
	if (resizeCanvasToDisplaySize(canvas)) {
		resolutionUniform();
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT);

	renderSnake();
	renderFood();
}
