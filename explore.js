document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded!");

    // Train Search
    function searchTrains() {
        let departure = document.getElementById("departure").value;
        let destination = document.getElementById("destination").value;
        let travelDate = document.getElementById("travelDate").value;
        console.log("Train search initiated!");

        if (departure && destination && travelDate) {
            alert(`🚆 Searching trains from ${departure} to ${destination} on ${travelDate}...`);
        } else {
            alert("⚠️ Please fill all fields before searching.");
        }
    }

    // Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (!menuToggle || !menu) {
        console.error("❌ Error: Menu elements not found!");
    } else {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent closing when clicking the button
            menu.classList.toggle("hidden");
            console.log("✅ Menu toggled!");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && event.target !== menuToggle) {
                menu.classList.add("hidden");
                console.log("🔴 Menu closed!");
            }
        });
    }

    // Booking Form Toggle
    const toggleButton = document.getElementById('toggleButton');
    const bookingForm = document.getElementById('bookingForm');

    if (toggleButton && bookingForm) {
        toggleButton.addEventListener('click', function () {
            bookingForm.style.display = (bookingForm.style.display === "none" || bookingForm.style.display === "") ? "block" : "none";
            console.log("🎟 Booking Form Toggled!");
        });
    } else {
        console.error("❌ Error: Booking elements not found!");
    }

    // Page Navigation
    function redirectTo(page) {
        window.location.href = page;
        console.log(`➡️ Redirecting to ${page}`);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Explore.js Loaded!");

    // Toggle Menu
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });

    // Flatpickr for Date Picker
    flatpickr("#date", {
        dateFormat: "d-m-Y",
        minDate: "today",
        disableMobile: true
    });

    updateContent(); // Initial update for stats & quotes
});

// Live Stats & Quote Update Every 15 Seconds
const quotes = [
    "🚆 'Travel far enough to meet yourself.'",
    "✨ 'Collect moments, not things.'",
    "🌍 'Adventure awaits beyond the station.'",
    "🛤️ 'Not all those who wander are lost.'"
];
document.addEventListener('DOMContentLoaded', function() {
    // Get all data from sessionStorage
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData')) || {};
    const journey = bookingData.journey || {};
    
    // Set journey info with fallback values
    const from = journey.from || sessionStorage.getItem('from') || 'Delhi';
    const to = journey.to || sessionStorage.getItem('to') || 'Mumbai';
    const date = journey.date || sessionStorage.getItem('date') || new Date().toISOString().split('T')[0];
    const trainName = journey.trainName || sessionStorage.getItem('trainName') || 'Rajdhani Express';
    const trainNumber = journey.trainNumber || sessionStorage.getItem('trainNumber') || '12301';
    const passengerCount = bookingData.passengers ? bookingData.passengers.length : 
                         parseInt(sessionStorage.getItem('passengerCount')) || 1;
    
    // Update the UI
    document.getElementById('travelInfo').textContent = `${from} ➝ ${to} | ${date}`;
    document.getElementById('trainInfo').textContent = `${trainName} (${trainNumber})`;
    document.getElementById('passengerCount').textContent = passengerCount;
    
    // Store the passenger count in sessionStorage if not already set
    if (!sessionStorage.getItem('passengerCount')) {
        sessionStorage.setItem('passengerCount', passengerCount.toString());
    }
    
    // Generate passenger forms
    generatePassengerForms(passengerCount);
    
    // Rest of your initialization code...
    initSeatSelection();
    initCoachTabs();
    initMealSelection();
    initProceedButton();
});