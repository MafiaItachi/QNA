document.addEventListener("DOMContentLoaded", function() {
    // Initial folder index
    var folderIndex = 1;

    // Fetch image from the initial folder
    fetchImage(folderIndex);

    // Generate squares with labels Que1, Que2, ..., Que100
    var boxesContainer = document.getElementById("boxesContainer");
    for (var i = 1; i <= 100; i++) {
        var box = document.createElement("div");
        box.classList.add("square");
        box.textContent = "Que " + i;
        box.dataset.folderIndex = i; // Storing folder index in dataset
        boxesContainer.appendChild(box);

        // Add event listener to each box
        box.addEventListener("click", function() {
            folderIndex = parseInt(this.dataset.folderIndex);
            fetchImage(folderIndex);
        });
    }

    // Add event listener to the Previous button
    var previousButton = document.getElementById("previousButton");
    previousButton.addEventListener("click", function() {
        folderIndex--;
        fetchImage(folderIndex);
    });

    // Add event listener to the Next button
    var nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", function() {
        folderIndex++;
        fetchImage(folderIndex);
    });

    // Highlight the initial box
    highlightBox(folderIndex);

        // Add event listener for keyboard arrow keys
        document.addEventListener("keydown", function(event) {
            if (event.key === "ArrowLeft") {
                // Go to previous folder when left arrow key is pressed
                folderIndex--;
                fetchImage(folderIndex);
            } else if (event.key === "ArrowRight") {
                // Go to next folder when right arrow key is pressed
                folderIndex++;
                fetchImage(folderIndex);
            }
        });
    // Timer variables
    var timer;
    var startTime;

    // Function to start the timer
    function startTimer() {
        startTime = Date.now();
        timer = setInterval(updateTimer, 1000);
    }

    // Function to stop the timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Function to update the timer display
    function updateTimer() {
        var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        var minutes = Math.floor(elapsedTime / 60);
        var seconds = elapsedTime % 60;
        var timerDisplay = document.getElementById("timerDisplay");
        timerDisplay.textContent = "Timer: " + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    }

    // Fetch image function
    function fetchImage(folderIndex) {
        // Ensure folderIndex stays within bounds
        folderIndex = Math.max(1, Math.min(folderIndex, 100));

        var queNumber = document.getElementById("queNumber");
        queNumber.textContent = "Dibyendu Biotechnology Question " + folderIndex;

        var folderPath = "QNA/Que" + folderIndex + "/"; // Change folder path here
        var imageElement = document.getElementById("imagePlaceholder");

        // Fetching the image
        fetch(folderPath)
            .then(response => response.text())
            .then(html => {
                // Extracting image filenames from directory listing
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var links = Array.from(doc.querySelectorAll("a"));
                var imageLinks = links.filter(link => link.href.match(/\.(jpg|jpeg|png|gif)$/i));

                if (imageLinks.length > 0) {
                    // Use the first image found
                    var imageUrl = imageLinks[0].href;
                    imageElement.src = imageUrl;
                    // Start the timer when a new Que comes
                    stopTimer();
                    startTimer();
                } else {
                    console.error("No images found in the directory.");
                }
            })
            .catch(error => console.error("Error fetching images:", error));

        // Highlight the box corresponding to the current Que
        highlightBox(folderIndex);
    }
});

function highlightBox(folderIndex) {
    // Remove highlight from all boxes
    var squares = document.querySelectorAll(".square");
    squares.forEach(function(square) {
        square.classList.remove("highlighted");
    });

    // Highlight the box corresponding to the current Que
    var box = document.querySelector(".square[data-folder-index='" + folderIndex + "']");
    if (box) {
        box.classList.add("highlighted");
    }
}
