export const codes = new Map();
export const keys = new Map();

export function init() {
	document.addEventListener("keydown", (event) => {
		codes[event.code] = true;
		keys[event.key] = true;
	});

	document.addEventListener("keyup", (event) => {
		codes[event.code] = false;
		keys[event.key] = false;
	});
}
