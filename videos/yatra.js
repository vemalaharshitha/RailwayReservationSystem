function changeVideo(videoSrc, selectedCard) {
                    let video = document.getElementById("bg-video");
                
                    // Set new video source
                    video.src = "images/" + videoSrc;
                    
                    video.load();  // Reload the video
                    video.play();  // Play the video after loading
                
                    // Remove scattered effect from all cards
                    let yatraCards = document.querySelectorAll(".yatra-card");
                    yatraCards.forEach(card => card.classList.remove("scattered"));
                
                    // Add scattered effect to the clicked card
                    selectedCard.classList.add("scattered");
                }
                