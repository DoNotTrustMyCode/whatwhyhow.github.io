const canvas = document.getElementById('sweCanvas');
const ctx = canvas.getContext('2d');
// Parameters
const nx = 1000;  // Number of spatial points
const dx = 1;  // Space step
const dt = 0.001; // Time step
const g = 9.8;   // Gravitational constant
const h0 = 1.0;  // Initial water height
const damHeight = 2.0; // Height behind the dam

const z = new Array(nx); // elevation

// Arrays for h (height) and hu (momentum)
let h = new Array(nx).fill(h0);
let hu = new Array(nx).fill(0);

// Initialize a dam break
const damPosition = Math.floor(nx / 2);
for (let i = 0; i < damPosition; i++) {
	h[i] = damHeight;
}

// Simulation loop
function update() {
	const newH = [...h];
	const newHU = [...hu];

	// Compute fluxes
	for (let i = 1; i < nx - 1; i++) {
		const hl = h[i - 1];
		const hr = h[i + 1];
		const ul = hl > 0 ? hu[i - 1] / hl : 0;
		const ur = hr > 0 ? hu[i + 1] / hr : 0;

		const fhl = hu[i - 1];
		const fhr = hu[i + 1];
		const fhlu = hl * ul ** 2 + 0.5 * g * hl ** 2;
		const fhrhu = hr * ur ** 2 + 0.5 * g * hr ** 2;

		const fluxH = 0.5 * (fhl + fhr) - 0.5 * (hr - hl) / dt;
		const fluxHU = 0.5 * (fhlu + fhrhu) - 0.5 * (ur - ul) / dt;

		newH[i] -= dt / dx * fluxH;
		newHU[i] -= dt / dx * fluxHU;
	}

	// Update values
	h = newH;
	hu = newHU;

	draw();
}

// Draw the water height on the canvas
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const scaleX = canvas.width / nx;
	const scaleY = canvas.height / Math.max(...h);

	ctx.fillStyle = 'blue';
	for (let i = 0; i < nx; i++) {
		ctx.fillRect(i * scaleX, canvas.height - h[i] * scaleY, scaleX, h[i] * scaleY);
	}
}

// Start simulation
function start() {
	setInterval(update, 100);
}
draw()
canvas.addEventListener('click', () => {
	update();
});

// start();

