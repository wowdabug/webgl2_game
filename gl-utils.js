export function resizeCanvasToDisplaySize(canvas) {
	const displayWidth = canvas.clientWidth;
	const displayHeight = canvas.clientHeight;

	const needsResize =
		canvas.width != displayWidth ||
		canvas.height != displayHeight;

	if (needsResize) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}

	return needsResize;
}

export function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!success) {
		const infoLog = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		throw new Error(infoLog);
	}

	return shader;
}

export function createProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!success) {
		const infoLog = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error(infoLog);
	}

	return program;
}

export async function fetchShaderFromPath(relativePath) {
	const rootPath = "shaders/";

	try {
		const response = await fetch(rootPath + relativePath);
		if (!response.ok) {
			throw new Error();
		}

		return await response.text();
	} catch {
		throw new Error();
	}
}

export async function createShaderFromPath(gl, type, path) {
	const source = await fetchShaderFromPath(path);
	return createShader(gl, type, source);
}

export async function createProgramFromPaths(gl, vertexShaderPath, fragmentShaderPath) {
	const vertexShader = await createShaderFromPath(gl, gl.VERTEX_SHADER, vertexShaderPath);
	const fragmentShader = await createShaderFromPath(gl, gl.FRAGMENT_SHADER, fragmentShaderPath);

	return createProgram(
		gl,
		vertexShader,
		fragmentShader
	);
}
