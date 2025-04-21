
document.addEventListener("DOMContentLoaded", function () {
    // Automatically load feedbacks when the page loads
    loadFeedbacks();

    document.getElementById("feedbackForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let formData = new FormData();
        formData.append("username", document.getElementById("username").value);
        formData.append("message", document.getElementById("message").value);

        fetch("/submit_feedback", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);  // Logs the response
            let messageDiv = document.getElementById("responseMessage");
            messageDiv.textContent = data.message;
            messageDiv.style.color = data.status === "success" ? "green" : "red";

            if (data.status === "success") {
                document.getElementById("feedbackForm").reset();
                loadFeedbacks(); // Reload feedbacks after successful submission
            }
        })
        .catch(error => console.error("Fetch Error:", error));  // Logs fetch errors
    });
});

function loadFeedbacks() {
    fetch("/get_feedbacks")
    .then(response => response.json())
    .then(data => {
        let feedbackListDiv = document.getElementById("feedbackList");

        if (data.status === "success" && data.feedbacks.length > 0) {
            let feedbackHTML = ''; // Initialize an empty string for feedback HTML
            data.feedbacks.forEach(fb => {
                feedbackHTML += `
                <div class="test-card">
                    <div id="left-quote-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 506.4 400.4" style="enable-background:new 0 0 506.4 400.4" xml:space="preserve">
                            <path d="M362.1 374.4c-31.4-.1-56.6-11.5-75.7-34.1-19-22.6-28.5-52.1-28.3-88.7.2-47.6 14.4-91.9 42.6-133 28.2-41.1 63.1-71.7 104.8-92l7.6 15.3c-17.9 13.5-33.7 30.9-47.3 52s-23.5 47.5-29.6 78.9l26.7 6.5c29.7 6.9 52.8 19.5 69.3 37.8 16.5 18.3 24.7 40.2 24.6 65.7-.1 27.2-9.3 49.2-27.6 66.1-18.4 17.2-40.7 25.6-67.1 25.5zm-209-.8c-31.4-.1-56.6-11.5-75.7-34.1-19-22.6-28.5-52.1-28.3-88.7.2-47.6 14.4-91.9 42.6-133s63.1-71.7 104.8-92l7.6 15.3c-17.9 13.5-33.7 30.9-47.3 52s-23.5 47.5-29.6 78.9l26.7 6.5c29.7 6.9 52.8 19.5 69.3 37.8 16.5 18.3 24.7 40.2 24.6 65.7-.1 27.2-9.3 49.2-27.6 66.1-18.4 17.2-40.7 25.6-67.1 25.5z" />
                        </svg>
                    </div>
                    <p>${fb.message}</p>
                    <h3>${fb.username}</h3>
                </div>
                `;
            });

            feedbackListDiv.innerHTML = feedbackHTML; // Set the inner HTML of feedbackListDiv
        } else {
            feedbackListDiv.innerHTML = `<p style="color: red;">No feedback available.</p>`;
        }
    })
    .catch(error => console.error("Error fetching feedbacks:", error));
}


    // Testimonial Slider
    const testTrack = document.querySelector(".test-card-row");
    const testSlides = document.querySelectorAll(".test-card");
    const testNextBtn = document.querySelector(".t-btn_right");
    const testPrevBtn = document.querySelector(".t-btn_left");
    
    let currentIndex = 0; // Start from first slide
    const slideWidth = testSlides[0].offsetWidth;
    
    // Function to move slides
    const testSlideMove = (index) => {
        testTrack.style.transition = "transform 0.5s ease-in-out";
        testTrack.style.transform = `translateX(-${slideWidth * index}px)`;
    };
    
    // Auto-slide function
    const autoSlide = () => {
        currentIndex++;
        if (currentIndex >= testSlides.length) {
            currentIndex = 0; // Loop back to first slide
        }
        testSlideMove(currentIndex);
    };
    
    // Auto-slide every 3 seconds
    let slideInterval = setInterval(autoSlide, 2000);
    
    // Next button click
    testNextBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        autoSlide();
        slideInterval = setInterval(autoSlide, 3000);
    });
    
    // Previous button click
    testPrevBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = testSlides.length - 1; // Loop to last slide
        }
        testSlideMove(currentIndex);
        slideInterval = setInterval(autoSlide, 3000);
    });






