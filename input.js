export const codes = {};
export const keys = {};

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
