// dashboard.js
document.addEventListener("DOMContentLoaded", function () {
                    const username = localStorage.getItem("username") || "Passenger";
                    document.getElementById("userWelcome").innerText = username;
                
                    // Sidebar Toggle Logic
                    const sidebar = document.querySelector(".sidebar");
                    document.querySelector(".toggle-btn").addEventListener("click", function () {
                        sidebar.classList.toggle("active");
                    });
                });
                function toggleSidebar() {
                    document.querySelector(".sidebar").classList.toggle("active");
                }
                
                document.addEventListener("DOMContentLoaded", function () {
                    let video = document.getElementById("train-video");
                
                    if (video) {
                        console.log("✅ Train video loaded.");
                    } else {
                        console.error("❌ Video not found! Check the path.");
                    }
                });