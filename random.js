let state = 0;

export function seed(seed) {
	state = seed;
}

export function seedRandom() {
	state = Math.floor(Math.random() * 4_294_967_296);
}

function getRandom() {
	state ^= state << 13;
	state ^= state >>> 17;
	state ^= state << 5;
	return state >>> 0;
}

export function getRandomInt(range) {
	return getRandom() % range;
}
