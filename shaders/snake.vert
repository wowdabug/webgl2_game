#version 300 es

uniform vec2 u_resolution;

layout(location = 0) in vec2 a_position;

void main() {
	vec2 clipSpace = ((a_position / u_resolution) * 2.0) - 1.0;
	gl_Position = vec4(clipSpace, 0.0, 1.0);
}
