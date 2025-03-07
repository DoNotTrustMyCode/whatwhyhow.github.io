const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

// Settings for the coordinate system
const canvasSize = 400;
const range = 5; // Range for the coordinate system (-5 to 5)
const step = canvasSize / (2 * range); // Pixels per unit

// Draw coordinate axes on a canvas
function drawAxes(ctx) {
	ctx.clearRect(0, 0, canvasSize, canvasSize);
	ctx.strokeStyle = '#aaa';

	// Draw horizontal axis
	ctx.beginPath();
	ctx.moveTo(0, canvasSize / 2);
	ctx.lineTo(canvasSize, canvasSize / 2);
	ctx.stroke();

	// Draw vertical axis
	ctx.beginPath();
	ctx.moveTo(canvasSize / 2, 0);
	ctx.lineTo(canvasSize / 2, canvasSize);
	ctx.stroke();
}

// Convert from mathematical coordinates to canvas pixels
function toCanvasCoords(x, y) {
	return {
		x: canvasSize / 2 + x * step,
		y: canvasSize / 2 - y * step // Canvas Y is inverted
	};
}

// Convert from canvas pixels to mathematical coordinates
function toMathCoords(x, y) {
	return {
		x: (x - canvasSize / 2) / step,
		y: -(y - canvasSize / 2) / step // Invert Y axis
	};
}

// function xyToComplex(x, y) {
// 	return math.complex(x, y);
// }
// Draw a point on a canvas
function drawPoint(ctx, x, y, color = 'red') {
	const coords = toCanvasCoords(x, y);
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI);
	ctx.fill();
}

// Map function: apply f(z) = z^2 (example function)

const c_sum = (z1, z2) => {
	return { x: z1.x + z2.x, y: z1.y + z2.y }
}

const c_mult = (z1, z2) => {
	const x = z1.x * z2.x - z1.y * z2.y
	const y = z1.x * z2.y + z1.y * z2.x
	return { x, y }
}
function f(z) {
	// return math.multiply(z, z);
	return { x: z.y, y: z.x }
	return c_mult(z, z)
	return c_sum(z, z)
	return { x: z.x, y: z.y };
	return {
		x: z.x ** 2 - z.y ** 2, // Real part
		y: 2 * z.x * z.y         // Imaginary part
	};
}
let isMouseDown = false
// Mouse event handlers
canvas1.addEventListener('mousedown', (e) => {
	isMouseDown = true;
	renderPoint(e);
});

canvas1.addEventListener('mouseup', () => {
	isMouseDown = false;
});

canvas1.addEventListener('mousemove', (e) => {
	if (isMouseDown) {
		renderPoint(e);
	}
});

// Render a point while the mouse is down
function renderPoint(e) {
	const rect = canvas1.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	// Get the mathematical coordinates
	const z = toMathCoords(x, y);

	// Draw on canvas1
	drawPoint(ctx1, z.x, z.y);

	// Calculate f(z) and draw on canvas2
	const fz = f(z);
	drawPoint(ctx2, fz.x, fz.y);
}// Initialize canvases
drawAxes(ctx1);
drawAxes(ctx2);

