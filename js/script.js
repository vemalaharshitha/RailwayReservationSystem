document.addEventListener("DOMContentLoaded", function() {
    let sidebar = document.querySelector(".sidebar");
    let toggleButton = document.createElement("div");
    toggleButton.className = "sidebar-toggle";
    toggleButton.innerHTML = "☰";
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function() {
        if (sidebar.style.left === "0px") {
            sidebar.style.left = "-250px";
        } else {
            sidebar.style.left = "0px";
        }
    });
});
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}
// Live Stats Update
function updateStats() {
    document.getElementById("departed").textContent = Math.floor(Math.random() * 50) + 1;
    document.getElementById("arriving").textContent = Math.floor(Math.random() * 20) + 1;
    document.getElementById("passengers").textContent = Math.floor(Math.random() * 200) + 50;
}

// Update Every 3 Seconds
setInterval(updateStats, 3000);

// Initial Call
updateStats();
// Auto Update Stats Every 3 Seconds (Simulated)
setInterval(() => {
    document.getElementById("totalBookings").innerText = (12340 + Math.floor(Math.random() * 10));
    document.getElementById("availableSeats").innerText = (520 - Math.floor(Math.random() * 5));
    document.getElementById("activeUsers").innerText = (134 + Math.floor(Math.random() * 5));
}, 3000);
function redirectToDashboard() {
    window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
    let quoteElement = document.getElementById("quote");
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
});
// Select container
const sceneContainer = document.getElementById('threejs-container');

// Responsive Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
<script src="js/script.js"></script>;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
document.documentElement.style.scrollBehavior = "smooth";
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("h1");
    header.style.transform = "rotateX(20deg)";
    header.style.transition = "transform 1s ease-in-out";

    window.addEventListener("scroll", function () {
        header.style.transform = "translateY(" + window.scrollY / 5 + "px)";
    });
});
// Set up the scene
let scene = new THREE.Scene();

// Set up the camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up the renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append the 3D canvas to the body

// Create a cube
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Render loop to animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}
<script src="js/script.js"></script>
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("trainCanvas") });
    renderer.setSize(window.innerWidth * 0.5, 400);
    document.body.appendChild(renderer.domElement);

    // Add Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Load 3D Train Model (Placeholder - Replace with actual model)
    const geometry = new THREE.BoxGeometry(2, 1, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
    const train = new THREE.Mesh(geometry, material);
    scene.add(train);

    camera.position.z = 10;

    function animate() {
        requestAnimationFrame(animate);
        train.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Button Animation with GSAP
    const bookBtn = document.querySelector(".book-btn");
    bookBtn.addEventListener("mouseover", () => {
        gsap.to(bookBtn, { scale: 1.1, duration: 0.2, boxShadow: "0px 0px 15px #ffcc00" });
    });
    bookBtn.addEventListener("mouseleave", () => {
        gsap.to(bookBtn, { scale: 1, duration: 0.2, boxShadow: "none" });
    });

    // Responsive Resizing
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth * 0.5, 400);
        camera.aspect = (window.innerWidth * 0.5) / 400;
        camera.updateProjectionMatrix();
    });
});
/* script.js - Dynamic Interactions */

document.addEventListener("DOMContentLoaded", function() {
    // Random live stats update
    function updateStats() {
        document.getElementById("peopleBooking").innerText = Math.floor(Math.random() * 500) + 50;
        document.getElementById("seatsAvailable").innerText = Math.floor(Math.random() * 200) + 50;
    }
    
    updateStats();
    setInterval(updateStats, 5000);
});
const stats = {
    stat1: document.getElementById("stat1"),
    stat2: document.getElementById("stat2"),
    stat3: document.getElementById("stat3"),
};

const quotes = [
    "Travel is the only thing you buy that makes you richer.",
    "Not all those who wander are lost.",
    "Adventure is worthwhile in itself.",
    "To travel is to live.",
    "Wherever you go becomes a part of you somehow."
];

const updateStatsAndQuotes = () => {
    stats.stat1.textContent = `Passengers: ${Math.floor(Math.random() * 5000) + 1000}`;
    stats.stat2.textContent = `Trains Departed: ${Math.floor(Math.random() * 100) + 10}`;
    stats.stat3.textContent = `Seats Available: ${Math.floor(Math.random() * 900) + 100}`;
    
    // Change quote randomly
    document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
};

// Change stats and quotes every 5 seconds
setInterval(updateStatsAndQuotes, 5000);