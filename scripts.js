function insertInputs() {
	const container = document.getElementById('container');


	const types = [
		"button",
		"checkbox",
		"color",
		"date",
		"datetime-local",
		"email",
		"file",
		"hidden",
		"image",
		"month",
		"number",
		"password",
		"radio",
		"range",
		"reset",
		"search",
		"submit",
		"tel",
		"text",
		"time",
		"url",
		"week"
	]

	// Clear the container first (optional, to avoid duplicates)
	container.innerHTML = '';

	// Loop to insert the desired number of input elements
	for (let i = 0; i < types.length; i++) {
		// Create a new input element
		//
		const div = document.createElement('div');
		const input = document.createElement('input');
		const label = document.createElement('label');
		label.textContent = types[i]
		// Set attributes for the input (optional)
		input.type = types[i];
		if (types[i] === "button") {
			input.value = "button";
		}

		if (types[i] === "color") {
			input.value = "button";
		}

		input.addEventListener("change", (e) => {
			console.log("change", input.value)

		})
		// input.placeholder = `Input ${i + 1}`;
		// input.name = `input-${i + 1}`;
		// input.id = `input-${i + 1}`;

		// Add the input element to the container div
		div.appendChild(label);
		div.appendChild(input);
		container.appendChild(div);
		// Add a line break for spacing (optional)
		// container.appendChild(document.createElement('br'));
	}
}
