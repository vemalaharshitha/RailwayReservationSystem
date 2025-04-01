document.addEventListener("DOMContentLoaded", () => {
                    const coaches = document.querySelectorAll(".coach");
                    const seatLayout = document.querySelector(".seat-layout");
                    const selectedSeat = document.getElementById("selected-seat");
                    const seatPrice = document.getElementById("seat-price");
                    const continueBtn = document.getElementById("continue");
                
                    // Dynamic Pricing
                    const seatPrices = {
                        "AC1": 2000,
                        "AC2": 1500,
                        "S1": 1000,
                        "S2": 1000,
                        "CC": 800
                    };
                
                    // Generate Seats
                    function generateSeats(coachType) {
                        seatLayout.innerHTML = "";
                        for (let i = 1; i <= 10; i++) {
                            let seat = document.createElement("div");
                            seat.classList.add("seat");
                            seat.textContent = `${i}`;
                            seat.dataset.price = seatPrices[coachType] || "-";
                            seat.addEventListener("click", () => selectSeat(seat));
                            seatLayout.appendChild(seat);
                        }
                    }
                
                    // Handle Coach Selection
                    coaches.forEach(coach => {
                        coach.addEventListener("click", () => {
                            coaches.forEach(c => c.style.backgroundColor = "#333");
                            coach.style.backgroundColor = "#666";
                            generateSeats(coach.dataset.coach);
                        });
                    });
                
                    // Handle Seat Selection
                    function selectSeat(seat) {
                        document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
                        seat.classList.add("selected");
                        selectedSeat.textContent = seat.textContent;
                        seatPrice.textContent = seat.dataset.price;
                    }
                
                    // Redirect to Meal Page
                    continueBtn.addEventListener("click", () => {
                        if (selectedSeat.textContent !== "None") {
                            let confirmMeal = confirm("Do you want to select a meal?");
                            if (confirmMeal) {
                                window.location.href = "meal.html";
                            }
                        } else {
                            alert("Please select a seat before proceeding.");
                        }
                    });
                });
                document.addEventListener('DOMContentLoaded', function() {
                    // Initialize all components
                    initJourneyInfo();
                    initCoachTabs();
                    initSeatSelection();
                    initPassengerForms();
                    initMealSelection();
                    initProceedButton();
                
                    // Set initial UI state
                    updateUI();
                });
                
                // Global variables
                let selectedSeats = [];
                let selectedMeals = [];
                let totalPrice = 0;
                const proceedBtn = document.getElementById('proceedBtn');
                
                // 1. Initialize Journey Information
                function initJourneyInfo() {
                    const from = sessionStorage.getItem('from') || 'Delhi';
                    const to = sessionStorage.getItem('to') || 'Mumbai';
                    const date = sessionStorage.getItem('date') || new Date().toLocaleDateString();
                    const trainName = sessionStorage.getItem('trainName') || 'Rajdhani Express';
                    const trainNumber = sessionStorage.getItem('trainNumber') || '12309';
                
                    document.getElementById('travelInfo').textContent = `${from} → ${to} | ${date}`;
                    document.getElementById('trainInfo').textContent = `${trainName} (${trainNumber})`;
                }
                
                // 2. Fixed Coach Tab Switching
                function initCoachTabs() {
                    const coachTabs = document.querySelectorAll('.coach-tab');
                    const coachSections = document.querySelectorAll('.coach-section');
                
                    coachTabs.forEach(tab => {
                        tab.addEventListener('click', function() {
                            // Update active tab
                            coachTabs.forEach(t => t.classList.remove('active'));
                            this.classList.add('active');
                
                            // Show corresponding coach section
                            const coachType = this.dataset.coach;
                            coachSections.forEach(section => {
                                section.classList.add('hidden');
                                if (section.id === `${coachType}-coach`) {
                                    section.classList.remove('hidden');
                                }
                            });
                        });
                    });
                }
                
                // 3. Enhanced Seat Selection
                function initSeatSelection() {
                    document.addEventListener('click', function(e) {
                        const seat = e.target.closest('.seat.available');
                        if (!seat) return;
                
                        // Toggle selection
                        seat.classList.toggle('selected');
                        
                        // Update selected seats array
                        const seatId = seat.textContent.trim();
                        const seatIndex = selectedSeats.findIndex(s => s.number === seatId);
                        
                        if (seatIndex === -1) {
                            // Add to selection
                            selectedSeats.push({
                                element: seat,
                                type: seat.dataset.type,
                                number: seatId,
                                price: parseInt(seat.dataset.price),
                                berth: seat.dataset.berth || 'N/A'
                            });
                        } else {
                            // Remove from selection
                            selectedSeats.splice(seatIndex, 1);
                        }
                        
                        updateSelectedSeatsDisplay();
                        updateUI();
                    });
                }
                
                // 4. Passenger Form Management
                function initPassengerForms() {
                    const passengerCount = parseInt(sessionStorage.getItem('passengerCount')) || 1;
                    generatePassengerForms(passengerCount);
                }
                
                function generatePassengerForms(count) {
                    const container = document.getElementById('passengerFormsContainer');
                    container.innerHTML = '';
                    
                    for (let i = 1; i <= count; i++) {
                        const form = document.createElement('div');
                        form.className = 'passenger-details mb-4';
                        form.innerHTML = `
                            <div class="passenger-header">
                                <h4 class="font-medium flex items-center">
                                    <span class="passenger-number mr-2">${i}</span> 
                                    Passenger ${i} Details
                                    ${i === 1 ? '<span class="text-xs text-purple-400 ml-2">(Primary)</span>' : ''}
                                </h4>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm text-slate-400 mb-1">Full Name*</label>
                                    <input type="text" class="passenger-name w-full" required>
                                </div>
                                <div>
                                    <label class="block text-sm text-slate-400 mb-1">Age*</label>
                                    <input type="number" class="passenger-age w-full" min="1" max="100" required>
                                </div>
                                <div>
                                    <label class="block text-sm text-slate-400 mb-1">Gender*</label>
                                    <select class="passenger-gender w-full" required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                ${i === 1 ? `
                                <div>
                                    <label class="block text-sm text-slate-400 mb-1">Mobile*</label>
                                    <input type="tel" class="mobile-number w-full" pattern="[0-9]{10}" required>
                                </div>
                                ` : ''}
                            </div>
                        `;
                        container.appendChild(form);
                    }
                }
                
                // 5. Meal Selection
                function initMealSelection() {
                    document.querySelectorAll('.meal').forEach(meal => {
                        meal.addEventListener('change', function() {
                            const mealItem = {
                                name: this.dataset.name,
                                price: parseInt(this.value)
                            };
                            
                            if (this.checked) {
                                selectedMeals.push(mealItem);
                            } else {
                                selectedMeals = selectedMeals.filter(m => m.name !== mealItem.name);
                            }
                            
                            updateMealsDisplay();
                            updateUI();
                        });
                    });
                }
                
                // 6. Proceed Button Logic
                function initProceedButton() {
                    proceedBtn.addEventListener('click', function() {
                        if (!validatePassengerForms()) {
                            alert('Please fill all required passenger details');
                            return;
                        }
                        
                        if (selectedSeats.length !== getPassengerCount()) {
                            alert(`Please select exactly ${getPassengerCount()} seat(s) for your passengers`);
                            return;
                        }
                        
                        saveBookingData();
                        window.location.href = 'payment.html';
                    });
                }
                
                // Helper Functions
                function updateSelectedSeatsDisplay() {
                    const container = document.getElementById('selectedSeatsList');
                    
                    if (selectedSeats.length === 0) {
                        container.innerHTML = '<p class="text-slate-400">No seats selected yet</p>';
                        return;
                    }
                    
                    let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-3">';
                    selectedSeats.forEach(seat => {
                        html += `
                            <div class="bg-slate-800 p-3 rounded flex justify-between items-center">
                                <div>
                                    <span class="font-medium">${seat.type} - ${seat.number}</span>
                                    <span class="block text-xs text-slate-400">${seat.berth} berth</span>
                                </div>
                                <span class="text-purple-300 font-medium">₹${seat.price}</span>
                            </div>
                        `;
                    });
                    html += '</div>';
                    container.innerHTML = html;
                }
                
                function updateMealsDisplay() {
                    const container = document.getElementById('selectedMealsInfo');
                    if (selectedMeals.length === 0) {
                        container.textContent = 'None';
                        return;
                    }
                    
                    container.textContent = selectedMeals.map(m => `${m.name} (₹${m.price})`).join(', ');
                }
                
                function updateUI() {
                    // Calculate total price
                    totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0) +
                                 selectedMeals.reduce((sum, meal) => sum + meal.price, 0);
                    
                    // Update display
                    document.getElementById('totalPrice').textContent = totalPrice;
                    
                    // Update proceed button state
                    proceedBtn.disabled = !(validatePassengerForms() && 
                                          selectedSeats.length === getPassengerCount() && 
                                          selectedSeats.length > 0);
                    
                    proceedBtn.classList.toggle('opacity-70', proceedBtn.disabled);
                    proceedBtn.classList.toggle('cursor-not-allowed', proceedBtn.disabled);
                }
                
                function validatePassengerForms() {
                    let isValid = true;
                    
                    document.querySelectorAll('.passenger-details').forEach(form => {
                        const name = form.querySelector('.passenger-name').value.trim();
                        const age = form.querySelector('.passenger-age').value;
                        const gender = form.querySelector('.passenger-gender').value;
                        const mobile = form.querySelector('.mobile-number')?.value.trim();
                        
                        if (!name || !age || !gender || (mobile && mobile.length !== 10)) {
                            isValid = false;
                        }
                    });
                    
                    return isValid;
                }
                
                function getPassengerCount() {
                    return document.querySelectorAll('.passenger-details').length;
                }
                
                function saveBookingData() {
                    const bookingData = {
                        seats: selectedSeats,
                        meals: selectedMeals,
                        passengers: getPassengerData(),
                        totalPrice: totalPrice,
                        journey: {
                            from: sessionStorage.getItem('from'),
                            to: sessionStorage.getItem('to'),
                            date: sessionStorage.getItem('date'),
                            trainName: sessionStorage.getItem('trainName'),
                            trainNumber: sessionStorage.getItem('trainNumber')
                        }
                    };
                    
                    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
                }
                
                function getPassengerData() {
                    return Array.from(document.querySelectorAll('.passenger-details')).map((form, index) => ({
                        name: form.querySelector('.passenger-name').value.trim(),
                        age: form.querySelector('.passenger-age').value,
                        gender: form.querySelector('.passenger-gender').value,
                        isPrimary: index === 0,
                        ...(index === 0 && { mobile: form.querySelector('.mobile-number').value.trim() })
                    }));
                }
                
                // Real-time validation
                document.addEventListener('input', function() {
                    updateUI();
                });                