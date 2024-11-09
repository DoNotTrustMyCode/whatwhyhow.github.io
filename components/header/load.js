// /components/header/load.js
function loadHeader() {
	console.log("Loading header...");
	fetch('/components/header/index.html')
		// fetch('index.html')
		.then(response => response.text())
		.then(data => {
			document.getElementById('header-container').innerHTML = data;
		})
		.catch(error => console.error('Error loading header:', error));
}

// Call the function to load the header
loadHeader();
